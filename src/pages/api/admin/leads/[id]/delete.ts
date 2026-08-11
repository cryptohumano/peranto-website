import type { APIRoute } from 'astro';
import { guardAdminRequest } from '../../../../../lib/admin-auth';
import { deleteLead } from '../../../../../lib/leads';

export const prerender = false;

export const POST: APIRoute = async ({ params, request, redirect }) => {
  const denied = guardAdminRequest(request);
  if (denied) return denied;

  const { id } = params;
  if (!id) return redirect('/admin');

  try {
    await deleteLead(id);
  } catch (error) {
    console.error('Lead delete failed', error);
    return redirect(`/admin/leads/${id}?error=delete`);
  }

  return redirect('/admin?deleted=1');
};
