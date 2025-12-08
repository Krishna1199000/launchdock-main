"use client"
import { useState } from "react";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Placeholder: connect to real authentication
    await new Promise(resolve => setTimeout(resolve, 1500));

    setError("Authentication is not yet connected. Please try again later.");
    setIsSubmitting(false);
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
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to your LaunchDock account
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 animate-slide-up">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

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
                  placeholder="Enter your email"
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
