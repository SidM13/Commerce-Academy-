/** aria props linking an input to its error/hint text. */
export const describe = (id: string, error?: string, hint?: string) => ({
  id,
  name: id,
  'aria-invalid': error ? (true as const) : undefined,
  'aria-describedby': error ? `${id}-error` : hint ? `${id}-hint` : undefined,
});

