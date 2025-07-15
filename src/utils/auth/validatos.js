// 1. Email
export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// 2. Nickname — allow Korean, upper/lowercase, 4~20 chars
export const validateNickname = (nickname) =>
  /^[a-zA-Z0-9가-힣!@#]{4,20}$/.test(nickname);

// 3. Password — strong
export const validatePassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#])[A-Za-z\d!@#]{8,20}$/.test(
    password
  );
