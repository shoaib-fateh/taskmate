"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Github, Mail } from "lucide-react";
import Link from "next/link";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import { auth, googleProvider, githubProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid credentials");

      Cookies.set("token", data.token, { expires: 7 });
      router.push("/d");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      if (!idToken) throw new Error("Google ID Token not found");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google-login`, // اطمینان از اینکه این لاگین است نه ساین‌آپ
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        }
      );

      const data = await response.json();
      console.log("Backend Response:", data);

      if (data.token) {
        Cookies.set("token", data.token, { expires: 7 });
        router.push("/dashboard"); // مسیر موردنظر بعد از ورود
      } else {
        throw new Error(data.message || "Google login failed");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      if (!accessToken) throw new Error("GitHub access token not found");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/github-login`, // این باید لاگین هندل کنه
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken }),
        }
      );

      const data = await response.json();
      console.log("Backend Response:", data);

      if (data.token) {
        Cookies.set("token", data.token, { expires: 7 });
        router.push("/dashboard");
      } else {
        throw new Error(data.message || "GitHub login failed");
      }
    } catch (error) {
      console.error("GitHub Login Error:", error);
    }
  };

  return (
    <div className="py-5 px-4">
      <section className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
        <div className="container relative hidden h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <Link
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 absolute right-4 top-4 md:right-8 md:top-8"
            href="/signup"
          >
            Signup
          </Link>
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div className="absolute inset-0 bg-zinc-900"></div>
            <div className="relative z-20 flex items-center text-lg font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path>
              </svg>
              Acme Inc
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  “This library has saved me countless hours of work and helped
                  me deliver stunning designs to my clients faster than ever
                  before.”
                </p>
                <footer className="text-sm">Sofia Davis</footer>
              </blockquote>
            </div>
          </div>
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Access Your Account
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email below to access your account
                </p>
              </div>
              <div className="grid gap-6">
                {errorMessage && (
                  <Alert variant="destructive">
                    <div className="flex justify-between w-full">
                      <div>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{errorMessage}</AlertDescription>
                      </div>
                      <button
                        onClick={() => setErrorMessage(null)}
                        className="text-white"
                      >
                        ❌
                      </button>
                    </div>
                  </Alert>
                )}
                <form onSubmit={handleLogin}>
                  <div className="grid gap-2">
                    <div className="grid gap-1">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        id="email"
                        placeholder="Your email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        id="password"
                        placeholder="Your password"
                        autoCapitalize="none"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                      disabled={loading}
                    >
                      {loading ? (
                        "Loging In..."
                      ) : (
                        <>
                          <Mail className="h-4 w-4" /> Login with Email
                        </>
                      )}
                    </button>
                  </div>
                </form>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                  type="button"
                  onClick={() => handleGithubLogin("github")}
                >
                  <Github className="h-4 w-4" />
                  Login with GitHub
                </button>
                <button
                  className="-mt-[1rem] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-destructive text-destructive-foreground shadow hover:bg-destructive/90 h-9 px-4 py-2"
                  type="button"
                  onClick={() => handleGoogleLogin("google")}
                >
                  <Mail className="h-4 w-4" />
                  Login with Gmail
                </button>
              </div>
              <p className="px-8 text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  className="underline underline-offset-4 hover:text-primary"
                  href="/signup"
                >
                  Create an account
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
