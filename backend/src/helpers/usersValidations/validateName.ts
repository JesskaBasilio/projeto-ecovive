export function validateName(name: string): boolean {
  if (!name) return false;               // Obrigatório
  name = name.trim();                     // Remove espaços no início/fim
  if (name.length < 2 || name.length > 100) return false; // Tamanho mínimo/máximo

  // Regex: permite letras (maiúsculas e minúsculas), espaços, acentos e hífens
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
  if (!nameRegex.test(name)) return false;

  // Verifica se o nome é composto apenas pelo mesmo caractere repetido
  const allSameChar = /^([A-Za-zÀ-ÖØ-öø-ÿ])\1+$/.test(name.replace(/\s+/g, ''));
  if (allSameChar) return false;

  return true;
}
