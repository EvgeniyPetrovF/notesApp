export const validateEmail = (name: string) => {
  const re = /^[\w\\.+-]+@[\w\\.-]+\.\w{2,4}$/;
  if (!name.match(re)) {
    return "Email's format: your_email@email.com";
  }
};

export const validatePassword = (password: string) => {
  const re = /^([a-z0-9_]){6,15}$/i;
  if (!password.match(re)) {
    return 'Password cannot be shorter than 6 characters or longer than 15 characters';
  }
};
export const validateConfirmedPassword = (
  password: string,
  confirmedPassword: string,
) => {
  if (password !== confirmedPassword) {
    return 'Passwords should be the same';
  }
};
