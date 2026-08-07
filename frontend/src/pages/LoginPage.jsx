import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, HeartPulse } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[rgb(var(--bg))]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-brand-100" />

      {/* Center Login Form */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-md border-0 shadow-2xl">
          <CardContent className="p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-zinc-900">Welcome Back</h2>
            </div>

            <form className="space-y-5">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-700">
                  <Mail className="h-4 w-4 text-zinc-500" />
                  Email Address
                </label>

                <Input
                  type="email"
                  placeholder="doctor@clinic.com"
                  className="h-11"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-700">
                  <Lock className="h-4 w-4 text-zinc-500" />
                  Password
                </label>

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-11 pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-zinc-600">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>
              </div>

              <Button className="h-11 w-full bg-brand-600 text-white hover:bg-brand-700">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100">
        <ShieldCheck className="h-4 w-4 text-brand-600" />
      </div>

      <span className="text-base text-zinc-700">{text}</span>
    </div>
  );
}
