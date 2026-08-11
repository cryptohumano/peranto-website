import type { APIRoute } from 'astro';
import type { LeadStatus } from '../../../../../../generated/prisma/client';
import { guardAdminRequest } from '../../../../../lib/admin-auth';
import {
  LEAD_STATUSES,
  parseContactChannel,
  updateLeadStatus,
} from '../../../../../lib/leads';

export const prerender = false;

export const POST: APIRoute = async ({ params, request, redirect }) => {
  const denied = guardAdminRequest(request);
  if (denied) return denied;

  const id = params.id;
  if (!id) return redirect('/admin');

  const form = await request.formData();
  const status = String(form.get('status') ?? '') as LeadStatus;
  if (!(LEAD_STATUSES as readonly string[]).includes(status)) {
    return redirect(`/admin/leads/${id}`);
  }

  const channel = parseContactChannel(String(form.get('channel') ?? ''));
  const note = String(form.get('note') ?? '').trim() || null;

  await updateLeadStatus(id, status, { channel, note });
  return redirect(`/admin/leads/${id}`);
};
