<<<<<<< Updated upstream:src/components/login-form.tsx
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
=======
// src/features/auth/ui/login-form.tsx

import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/shared/lib/utils/utils";
import { Button } from "@/shared/ui/button/button";
import { Input } from "@/shared/ui/input/input";
import { Label } from "@/shared/ui/label/label";

import { loginApi } from "../api/authApi"; 
>>>>>>> Stashed changes:src/features/auth/ui/login-form.tsx

function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await loginApi(email, password);

      navigate("/"); // Chuyển về trang chủ hoặc dashboard

    } catch (err) {
      setError("Email hoặc mật khẩu không chính xác.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        {/* ...Tiêu đề... */}
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-3">
          {/* ...Label Password... */}
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* Hiển thị lỗi */}
        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
      </div>
    </form>
  );
}

export { LoginForm };