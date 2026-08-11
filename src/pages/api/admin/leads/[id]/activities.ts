import type { APIRoute } from 'astro';
import { guardAdminRequest } from '../../../../../lib/admin-auth';
import { addLeadActivity, parseContactChannel } from '../../../../../lib/leads';

export const prerender = false;

export const POST: APIRoute = async ({ params, request, redirect }) => {
  const denied = guardAdminRequest(request);
  if (denied) return denied;

  const id = params.id;
  if (!id) return redirect('/admin');

  const form = await request.formData();
  const channel = parseContactChannel(String(form.get('channel') ?? ''));
  const body = String(form.get('body') ?? '').trim();

  if (!channel || !body) {
    return redirect(`/admin/leads/${id}?error=activity`);
  }

  try {
    await addLeadActivity(id, channel, body);
  } catch (error) {
    console.error('Lead activity failed', error);
    return redirect(`/admin/leads/${id}?error=activity`);
  }

  return redirect(`/admin/leads/${id}`);
};
