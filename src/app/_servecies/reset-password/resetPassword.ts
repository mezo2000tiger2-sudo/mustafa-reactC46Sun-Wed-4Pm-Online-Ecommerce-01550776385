export type ResetPasswordVariables = {
  email: string;
  newPassword: string;
};

export async function resetPasswordFn({ email, newPassword }: ResetPasswordVariables) {
  const resp = await fetch(`/api/ResetPasswordFN`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      newPassword,
    }),
  });

  if (!resp.ok) {
    throw new Error(`Reset password failed (${resp.status})`);
  }

  const payload = await resp.json();
  console.log(payload);
  return payload;
}
