"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Building2,
  ChevronDown,
  Check,
  ArrowRight,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    company: "",
    projectType: "",
    budget: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validatedFields, setValidatedFields] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Simple validation for demo
    if (value.trim() && !validatedFields.has(name)) {
      setTimeout(() => {
        setValidatedFields(prev => new Set([...prev, name]));
      }, 500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Map form data to API format
      const signupData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone || undefined,
        password: formData.password,
        company: formData.company || undefined,
      };

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        setUserEmail(formData.email);
        setShowOTPForm(true);
        toast({
          title: "Account Created!",
          description: "Please check your email for the OTP code.",
          variant: "success",
        });
      } else {
        // Show detailed error message
        const errorMessage = data.details 
          ? data.details.map((d: any) => d.message).join(", ")
          : data.message || data.error || "Something went wrong. Please try again.";
        
        toast({
          title: "Signup Failed",
          description: errorMessage,
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

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifyingOTP(true);

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Email Verified!",
          description: "Your account has been verified. You can now sign in.",
          variant: "success",
        });
        // Redirect to signin after a short delay
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      } else {
        toast({
          title: "Verification Failed",
          description: data.error || "Invalid OTP. Please try again.",
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
      setIsVerifyingOTP(false);
    }
  };

  // OTP Verification Form
  if (showOTPForm) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border/30 rounded-3xl p-8 shadow-2xl shadow-foreground/5 animate-scale-in">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Verify Your Email
              </h1>
              <p className="text-muted-foreground">
                We've sent a 6-digit OTP to <br />
                <span className="font-semibold text-foreground">{userEmail}</span>
              </p>
            </div>

            <form onSubmit={handleOTPSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  required
                  maxLength={6}
                  className="
                    w-full px-6 py-4 rounded-2xl text-center text-2xl font-mono tracking-widest
                    border border-border/30 bg-background
                    text-foreground
                    focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10
                    transition-all duration-300
                  "
                  placeholder="000000"
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full group relative overflow-hidden"
                disabled={isVerifyingOTP || otp.length !== 6}
              >
                {isVerifyingOTP ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  <>
                    Verify OTP
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            <div className="text-center mt-6">
              <button
                onClick={() => setShowOTPForm(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Back to signup
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Signup Form
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Hero/Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md text-center animate-fade-in">
            <div className="w-40 h-40 mx-auto mb-8 flex items-center justify-center">
              <Image 
                src="/launchdocklogo1.png" 
                alt="LaunchDock Logo" 
                width={200} 
                height={80}
                className="object-contain"
              />
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Join hundreds of businesses who trust us to bring their digital visions to life.
            </p>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-16 h-16 rounded-2xl bg-primary/10 animate-float" />
        <div className="absolute bottom-32 right-20 w-12 h-12 rounded-xl bg-primary/20 animate-float-delayed" />
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8 animate-slide-up">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Create Account
            </h1>
            <p className="text-muted-foreground">
              Start your journey with LaunchDock
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="
                    w-full pl-12 pr-12 py-4 rounded-2xl
                    border border-border/30 bg-card
                    text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10
                    transition-all duration-300
                  "
                  placeholder="your name"
                />
                {validatedFields.has('fullName') && (
                  <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 animate-scale-in" />
                )}
              </div>
            </div>

            {/* Email & Phone Row */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
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
                      w-full pl-12 pr-12 py-4 rounded-2xl
                      border border-border/30 bg-card
                      text-foreground placeholder:text-muted-foreground
                      focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10
                      transition-all duration-300
                    "
                    placeholder="your@email.com"
                  />
                  {validatedFields.has('email') && (
                    <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 animate-scale-in" />
                  )}
                </div>
              </div>

              <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="
                      w-full pl-12 pr-12 py-4 rounded-2xl
                      border border-border/30 bg-card
                      text-foreground placeholder:text-muted-foreground
                      focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10
                      transition-all duration-300
                    "
                    placeholder="+1 (555) 000-0000"
                  />
                  {validatedFields.has('phone') && (
                    <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 animate-scale-in" />
                  )}
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
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
                    border border-border/30 bg-card
                    text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10
                    transition-all duration-300
                  "
                  placeholder="Create a strong password"
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

            {/* Company Name (Optional) */}
            <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <label className="block text-sm font-medium text-foreground mb-2">
                Company Name <span className="text-muted-foreground">(Optional)</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="
                    w-full pl-12 pr-4 py-4 rounded-2xl
                    border border-border/30 bg-card
                    text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10
                    transition-all duration-300
                  "
                  placeholder="Your Company"
                />
              </div>
            </div>

            {/* Project Type & Budget */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Type
                </label>
                <div className="relative">
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="
                      w-full px-4 py-4 pr-12 rounded-2xl
                      border border-border/30 bg-card
                      text-foreground
                      focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10
                      transition-all duration-300
                      appearance-none cursor-pointer
                    "
                  >
                    <option value="">Select type</option>
                    <option value="website">Website</option>
                    <option value="webapp">Web App</option>
                    <option value="mobile">Mobile App</option>
                    <option value="design">UI/UX Design</option>
                    <option value="branding">Branding</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div className="animate-slide-up" style={{ animationDelay: '0.7s' }}>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Budget Range
                </label>
                <div className="relative">
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="
                      w-full px-4 py-4 pr-12 rounded-2xl
                      border border-border/30 bg-card
                      text-foreground
                      focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10
                      transition-all duration-300
                      appearance-none cursor-pointer
                    "
                  >
                    <option value="">Select budget</option>
                    <option value="10k-50k">₹10,000 - ₹50,000</option>
                    <option value="5k-10k">₹50,000 - ₹1,00,000</option>
                    <option value="10k-25k">₹1,00,000 - ₹2,50,000</option>
                    <option value="25k-50k">₹2,50,000 - ₹5,00,000</option>
                    <option value="50k+">₹5,00,000+</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="animate-slide-up" style={{ animationDelay: '0.8s' }}>
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
                    Creating Account...
                  </div>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link 
                href="/signin" 
                className="text-primary font-semibold hover:underline transition-all"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
