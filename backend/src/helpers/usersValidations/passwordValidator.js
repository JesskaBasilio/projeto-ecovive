function isStrongPassword(password) {
  // Verifica se tem pelo menos 8 caracteres, incluindo:
  // - 1 letra maiúscula
  // - 1 letra minúscula
  // - 1 número
  // - 1 símbolo
  const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
}

module.exports = { isStrongPassword };
