export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validateNickname = (nickname) =>
  /^[a-z0-9!@#]{8,20}$/.test(nickname);
export const validatePassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#])[A-Za-z\d!@#]{8,20}$/.test(
    password
  );
