export const EMAIL_RE = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

export const validateEmail = (email: string): string | null => {
  if (!email) return 'El correo es requerido';
  if (!EMAIL_RE.test(email)) return 'Correo electrónico inválido';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'La contraseña es requerida';
  if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
  return null;
};

export const validateLoginForm = (email: string, password: string): string | null => {
  return validateEmail(email) || validatePassword(password);
};