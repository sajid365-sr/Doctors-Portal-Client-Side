import { useEffect, useState } from "react";

const useToken = (email) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (email) {
      fetch(
        `https://doctors-portal-server-sajid365-sr.vercel.app/jwt?email=${email}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("AccessToken", data.accessToken);
            setToken(data.accessToken);
          }
        });
    }
  }, [email]);
  return token;
};

export default useToken;
