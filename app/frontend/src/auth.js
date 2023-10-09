export const isLogado = () => {
  if (localStorage.getItem("token")) {
    return true;
  }

  return false;
};
