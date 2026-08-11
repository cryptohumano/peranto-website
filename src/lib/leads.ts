import { getPrisma } from './db';
import type {
  ContactChannel,
  LeadSource,
  LeadStatus,
  Prisma,
} from '../../generated/prisma/client';

export const LEAD_STATUSES = [
  'NEW',
  'QUALIFIED',
  'CONTACTED',
  'MEETING',
  'PROPOSAL',
  'WON',
  'LOST',
] as const satisfies readonly LeadStatus[];

export const CONTACT_CHANNELS = [
  'EMAIL',
  'WHATSAPP',
  'PHONE',
  'OTHER',
] as const satisfies readonly ContactChannel[];

export const statusLabel: Record<LeadStatus, string> = {
  NEW: 'Nuevo',
  QUALIFIED: 'Calificado',
  CONTACTED: 'Contactado',
  MEETING: 'Reunión',
  PROPOSAL: 'Propuesta',
  WON: 'Cliente',
  LOST: 'Descartado',
};

export const channelLabel: Record<ContactChannel, string> = {
  EMAIL: 'Email',
  WHATSAPP: 'WhatsApp',
  PHONE: 'Llamada',
  OTHER: 'Otro',
};

/** Pipeline order for the stepper (excludes terminal LOST as a side path). */
export const PIPELINE_STATUSES: LeadStatus[] = [
  'NEW',
  'QUALIFIED',
  'CONTACTED',
  'MEETING',
  'PROPOSAL',
  'WON',
];

export type CreateLeadInput = {
  name?: string | null;
  email: string;
  company?: string | null;
  phone?: string | null;
  interest?: string | null;
  message?: string | null;
  source: LeadSource;
  preferredChannel?: ContactChannel | null;
};

export type ListLeadsParams = {
  status?: LeadStatus;
  source?: LeadSource;
  interest?: string;
  q?: string;
  take?: number;
};

/** Keep digits; if MX local 10 digits, prefix 52 for WA links. */
export function normalizePhone(raw: string): string | null {
  let digits = raw.replace(/\D/g, '');
  if (!digits) return null;
  if (digits.startsWith('521') && digits.length === 13) {
    digits = `52${digits.slice(3)}`;
  }
  if (digits.length === 10) return `52${digits}`;
  if (digits.startsWith('52') && digits.length >= 12) return digits;
  return digits.length >= 10 ? digits : null;
}

export function whatsappHref(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const normalized = normalizePhone(phone) ?? phone.replace(/\D/g, '');
  if (!normalized) return null;
  return `https://wa.me/${normalized}`;
}

export function parseContactChannel(raw: string): ContactChannel | null {
  const value = raw.trim().toUpperCase();
  return CONTACT_CHANNELS.includes(value as ContactChannel)
    ? (value as ContactChannel)
    : null;
}

export async function createLead(input: CreateLeadInput) {
  const phone = input.phone
    ? (normalizePhone(input.phone) ?? (input.phone.trim() || null))
    : null;

  return getPrisma().lead.create({
    data: {
      name: input.name || null,
      email: input.email.toLowerCase(),
      company: input.company || null,
      phone,
      interest: input.interest || null,
      message: input.message || null,
      source: input.source,
      preferredChannel: input.preferredChannel || null,
    },
  });
}

export function buildLeadWhere(params?: ListLeadsParams): Prisma.LeadWhereInput {
  const where: Prisma.LeadWhereInput = {};

  if (params?.status) where.status = params.status;
  if (params?.source) where.source = params.source;
  if (params?.interest) where.interest = params.interest;

  const q = params?.q?.trim();
  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { email: { contains: q, mode: 'insensitive' } },
      { company: { contains: q, mode: 'insensitive' } },
      { interest: { contains: q, mode: 'insensitive' } },
      { message: { contains: q, mode: 'insensitive' } },
      { phone: { contains: q } },
    ];
  }

  return where;
}

export async function listLeads(params?: ListLeadsParams) {
  return getPrisma().lead.findMany({
    where: buildLeadWhere(params),
    orderBy: { createdAt: 'desc' },
    take: params?.take ?? 100,
    include: {
      notes: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
      _count: { select: { notes: true, activities: true } },
    },
  });
}

export async function countLeads(params?: ListLeadsParams) {
  return getPrisma().lead.count({ where: buildLeadWhere(params) });
}

export async function getLead(id: string) {
  return getPrisma().lead.findUnique({
    where: { id },
    include: {
      notes: { orderBy: { createdAt: 'desc' } },
      activities: { orderBy: { createdAt: 'desc' } },
    },
  });
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
  opts?: { channel?: ContactChannel | null; note?: string | null },
) {
  const prisma = getPrisma();
  const channel = opts?.channel ?? null;
  const note = opts?.note?.trim() || null;

  return prisma.$transaction(async (tx) => {
    const lead = await tx.lead.update({
      where: { id },
      data: {
        status,
        ...(channel
          ? {
              lastContactedAt: new Date(),
              lastContactChannel: channel,
            }
          : {}),
      },
    });

    if (channel || note) {
      await tx.leadActivity.create({
        data: {
          leadId: id,
          channel: channel ?? 'OTHER',
          body:
            note ||
            `Etapa actualizada a ${statusLabel[status]}${
              channel ? ` vía ${channelLabel[channel]}` : ''
            }`,
        },
      });
    }

    return lead;
  });
}

export async function addLeadNote(leadId: string, body: string) {
  return getPrisma().leadNote.create({
    data: { leadId, body },
  });
}

export async function addLeadActivity(
  leadId: string,
  channel: ContactChannel,
  body: string,
) {
  const prisma = getPrisma();
  const text = body.trim();
  if (!text) {
    throw new Error('Activity body required');
  }

  return prisma.$transaction(async (tx) => {
    const activity = await tx.leadActivity.create({
      data: { leadId, channel, body: text },
    });
    await tx.lead.update({
      where: { id: leadId },
      data: {
        lastContactedAt: new Date(),
        lastContactChannel: channel,
      },
    });
    return activity;
  });
}

export async function deleteLead(id: string) {
  return getPrisma().lead.delete({ where: { id } });
}

export async function getLeadStats() {
  const prisma = getPrisma();
  const [total, byStatus, recent] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.groupBy({
      by: ['status'],
      _count: { _all: true },
    }),
    prisma.lead.count({
      where: {
        createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
    }),
  ]);

  return { total, byStatus, recent };
}
