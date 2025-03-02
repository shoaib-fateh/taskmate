"use client";

import { Github, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { auth, googleProvider, githubProvider } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      localStorage.setItem("token", data.token);
      router.push("/d");
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Signup
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      if (!idToken) throw new Error("Google ID Token not found");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google-signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        }
      );

      const data = await response.json();
      console.log("Backend Response:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        router.push("/d");
      } else {
        throw new Error(data.message || "Google login failed");
      }
    } catch (error) {
      console.error("Google Signup Error:", error);
    }
  };

  // Handle GitHub Signup
  const handleGithubSignup = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken; // گرفتن accessToken

      if (!accessToken) throw new Error("GitHub access token not found");

      // ارسال accessToken به بک‌اند
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google-signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken }),
        }
      );

      const data = await response.json();
      console.log("Backend Response:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        router.push("/d");
      } else {
        throw new Error(data.message || "GitHub login failed");
      }
    } catch (error) {
      console.error("GitHub Signup Error:", error);
      setErrorMessage("GitHub Signup failed. Try again.");
    }
  };

  return (
    <div className="py-5 px-4">
      <section class="overflow-hidden rounded-[0.5rem] border bg-background shadow">
        <div class="container relative hidden h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <Link
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 absolute right-4 top-4 md:right-8 md:top-8"
            href="/login"
          >
            Login
          </Link>
          <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div class="absolute inset-0 bg-zinc-900"></div>
            <div class="relative z-20 flex items-center text-lg font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-2 h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path>
              </svg>
              Acme Inc
            </div>
            <div class="relative z-20 mt-auto">
              <blockquote class="space-y-2">
                <p class="text-lg">
                  “This library has saved me countless hours of work and helped
                  me deliver stunning designs to my clients faster than ever
                  before.”
                </p>
                <footer class="text-sm">Sofia Davis</footer>
              </blockquote>
            </div>
          </div>
          <div class="lg:p-8">
            <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div class="flex flex-col space-y-2 text-center">
                <h1 class="text-2xl font-semibold tracking-tight">
                  Create an account
                </h1>
                <p class="text-sm text-muted-foreground">
                  Enter your email below to create your account
                </p>
              </div>
              <div class="grid gap-6">
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
                <form onSubmit={handleSignup}>
                  <div class="grid gap-2">
                    <div class="grid gap-1">
                      <label
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                        for="email"
                      >
                        Email
                      </label>
                      <input
                        class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        id="email"
                        placeholder="name@example.com"
                        autocapitalize="none"
                        autocomplete="email"
                        autocorrect="off"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                        for="password"
                      >
                        Password
                      </label>
                      <input
                        class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        id="password"
                        placeholder="********"
                        autocapitalize="none"
                        autocorrect="off"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                      disabled={loading}
                    >
                      {loading ? (
                        "Signing Up..."
                      ) : (
                        <>
                          <Mail className="h-4 w-4" /> Signup with Email
                        </>
                      )}
                    </button>
                  </div>
                </form>
                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <span class="w-full border-t"></span>
                  </div>
                  <div class="relative flex justify-center text-xs uppercase">
                    <span class="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <button
                  class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                  type="button"
                  onClick={handleGithubSignup}
                >
                  <Github className="h-4 w-4" />
                  Signup with GitHub
                </button>
                <button
                  class="-mt-[1rem] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-destructive text-destructive-foreground shadow hover:bg-destructive/90 h-9 px-4 py-2"
                  onClick={handleGoogleSignup}
                >
                  <Mail className="h-4 w-4" />
                  Signup with Gmail
                </button>
              </div>
              <p class="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                  class="underline underline-offset-4 hover:text-primary"
                  href="/terms"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  class="underline underline-offset-4 hover:text-primary"
                  href="/privacy"
                >
                  Privacy Policy
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
