"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data in localStorage
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        
        toast({
          title: "Sign In Successful!",
          description: "Welcome back to LaunchDock.",
          variant: "success",
        });
        // Redirect based on role
        setTimeout(() => {
          if (data.user.role === "ADMIN") {
            router.push("/admin");
          } else {
            router.push("/dashboard/client");
          }
        }, 1500);
      } else {
        toast({
          title: "Sign In Failed",
          description: data.error || "Invalid email or password. Please try again.",
          variant: "error",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error. Please check your connection and try again.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Animated Card Container */}
        <div className="
          bg-card border border-border/30 rounded-3xl p-8 
          shadow-2xl shadow-foreground/5
          transition-all duration-700
          hover:shadow-3xl hover:shadow-foreground/10
          hover:scale-105
          animate-scale-in
        ">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Image 
                src="/launchdocklogo1.png" 
                alt="LaunchDock Logo" 
                width={80} 
                height={80}
                className="object-contain"
              />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to your LaunchDock account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="
                    w-full pl-12 pr-4 py-4 rounded-2xl
                    border border-border/30 bg-background
                    text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10
                    transition-all duration-300
                  "
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="
                    w-full pl-12 pr-12 py-4 rounded-2xl
                    border border-border/30 bg-background
                    text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10
                    transition-all duration-300
                  "
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link 
                href="/forgot-password" 
                className="text-sm text-primary hover:underline transition-all"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full group relative overflow-hidden"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Signing In...
                  </div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
                
                {/* Ripple Effect */}
                <div className="absolute inset-0 bg-white/20 transform scale-0 group-active:scale-100 transition-transform duration-300 rounded-2xl" />
              </Button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link 
                href="/signup" 
                className="text-primary font-semibold hover:underline transition-all"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignIn;
