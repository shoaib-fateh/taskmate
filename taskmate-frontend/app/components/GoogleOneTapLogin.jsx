"use client";
import { useEffect } from "react";

export default function GoogleOneTapLogin() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadGoogleScript = () => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
          window.google?.accounts.id.initialize({
            client_id: process.env.YOUR_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
          });
          window.google?.accounts.id.prompt();
        };
      };

      const handleCredentialResponse = (response) => {
        fetch("/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: response.credential }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("User logged in:", data);
            localStorage.setItem("token", data.token);
          })
          .catch((err) => console.error("Google login failed!", err));
      };

      loadGoogleScript();
    }
  }, []);

  return null;
}
