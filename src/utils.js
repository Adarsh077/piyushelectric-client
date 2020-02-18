const loginUser = remember => {
  resetStorage();
  if (remember) localStorage.setItem("isloggedin", "true");
  else sessionStorage.setItem("isloggedin", "true");
};

const resetStorage = () => {
  sessionStorage.removeItem("isloggedin");
  localStorage.removeItem("isloggedin");
};

const isLoggedIn = () =>
  !!(
    localStorage.getItem("isloggedin") || sessionStorage.getItem("isloggedin")
  );

export { loginUser, isLoggedIn, resetStorage };
