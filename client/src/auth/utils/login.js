const login = async ({ did, address, signature }) => {
  return await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ did, address, signature }),
    credentials: "include",
  });
};

export default login;
