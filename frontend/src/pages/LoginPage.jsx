import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent } from "../components/ui/Card";

import { useAuth } from "../hooks/AuthContext";
export default function LoginPage() {
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(form);

      // Navigate after successful login
      window.location.href = "/";
      // or using react-router:
      // navigate("/dashboard");
    } catch (err) {
      setError(
        err?.data?.message || err?.message || "Invalid email or password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-zinc-100">
      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-md border-0 shadow-2xl">
          <CardContent className="p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-zinc-900">Welcome Back</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-700">
                  <Mail className="h-4 w-4 text-zinc-500" />
                  Email Address
                </label>

                <Input
                  name="email"
                  type="email"
                  placeholder="doctor@clinic.com"
                  value={form.email}
                  onChange={handleChange}
                  className="h-11"
                  required
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-700">
                  <Lock className="h-4 w-4 text-zinc-500" />
                  Password
                </label>

                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className="h-11 pr-10"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
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

              <Button
                type="submit"
                disabled={loading}
                className="h-11 w-full bg-brand-600 text-white hover:bg-brand-700"
              >
                {loading ? "Signing in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
