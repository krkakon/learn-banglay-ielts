"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ShieldCheck, Lock, ArrowLeft, KeyRound, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. First try Firebase login
      let firebaseSucceeded = false;
      try {
        await login(email, password);
        firebaseSucceeded = true;
      } catch (fbErr: any) {
        console.log("Firebase login attempt:", fbErr.message);
      }

      // 2. Also authenticate with the admin session API
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.user?.role === "admin") {
        router.push("/admin");
        router.refresh();
        return;
      }

      // If Firebase succeeded and user email is admin
      if (firebaseSucceeded && email.toLowerCase().includes("admin")) {
        router.push("/admin");
        router.refresh();
        return;
      }

      if (!res.ok && !firebaseSucceeded) {
        setError(data.error || "Invalid administrator credentials. Access restricted.");
      } else {
        // Logged in as student instead of admin
        setError("Access denied. This account does not have administrator privileges.");
      }
    } catch {
      setError("An unexpected error occurred during admin authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between p-4 sm:p-6 text-slate-100 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Top Header */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between z-10 pt-4">
        <Link 
          href="/" 
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Website
        </Link>
        <span className="text-xs font-mono uppercase tracking-wider text-slate-500 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
          Admin Portal
        </span>
      </div>

      {/* Login Card */}
      <main className="max-w-md w-full mx-auto my-auto z-10 py-8">
        <Card className="bg-slate-900 border-slate-800 shadow-2xl text-slate-100">
          <CardHeader className="text-center space-y-3 pb-6">
            <div className="mx-auto w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-500 shadow-inner shadow-red-500/10">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold tracking-tight text-white">
                Admin Authentication
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm mt-1">
                Authorized staff access to platform administration
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="admin-email" className="text-xs font-medium text-slate-300">
                  Admin Email
                </Label>
                <div className="relative">
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@learnbanglayielts.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:border-red-500 focus-visible:ring-red-500/20 h-11"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="admin-password" className="text-xs font-medium text-slate-300">
                    Master Password
                  </Label>
                </div>
                <div className="relative">
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:border-red-500 focus-visible:ring-red-500/20 h-11"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-medium h-11 rounded-xl shadow-lg shadow-red-600/20 transition-all mt-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <KeyRound className="h-4 w-4 animate-spin" /> Verifying Credentials...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="h-4 w-4" /> Sign In to Admin Panel
                  </span>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="border-t border-slate-800/80 pt-4 flex flex-col gap-2 text-center">
            <p className="text-xs text-slate-500">
              Default Master Login: <span className="text-slate-400 font-mono">admin@learnbanglayielts.com</span> / <span className="text-slate-400 font-mono">admin123</span>
            </p>
          </CardFooter>
        </Card>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-600 z-10 pb-4">
        Learn Banglay IELTS • Restricted Administration System
      </footer>
    </div>
  );
}
