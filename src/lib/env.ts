/**
 * Runtime secrets must come from process.env (Railway injects them at start).
 * import.meta.env can be empty/inlined at build time and break production.
 */
export function env(name: string, fallback = ''): string {
  const fromProcess = process.env[name];
  if (fromProcess !== undefined && fromProcess !== '') return fromProcess;
  const fromMeta = (import.meta.env as Record<string, string | undefined>)[name];
  if (fromMeta !== undefined && fromMeta !== '') return fromMeta;
  return fallback;
}
