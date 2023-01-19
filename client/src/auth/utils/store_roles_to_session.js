const storeRolesToSession = async () => {
  return await fetch("/api/auth/roles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export default storeRolesToSession;
