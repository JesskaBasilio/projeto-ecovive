export function validateEmail(email: string): boolean {
  if (!email) return false;               // Campo obrigatório
  email = email.trim().toLowerCase();     // Remove espaços e padroniza

  // Regex para validar formato geral de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) return false;

  // Verifica se não termina com ponto (ex: "user@email.")
  if (email.endsWith('.')) return false;

  return true;
}

