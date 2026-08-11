import type { APIRoute } from 'astro';
import { guardAdminRequest } from '../../../../../lib/admin-auth';
import { addLeadNote } from '../../../../../lib/leads';

export const prerender = false;

export const POST: APIRoute = async ({ params, request, redirect }) => {
  const denied = guardAdminRequest(request);
  if (denied) return denied;

  const id = params.id;
  if (!id) return redirect('/admin');

  const form = await request.formData();
  const body = String(form.get('body') ?? '').trim();
  if (body) {
    await addLeadNote(id, body);
  }

  return redirect(`/admin/leads/${id}`);
};
