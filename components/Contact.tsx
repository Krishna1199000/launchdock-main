"use client"
import { useState } from "react";
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock,
  ArrowRight,
  Calendar,
  Send,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  onSchedule?: () => void;
};

const Contact = ({ onSchedule }: Props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-16 relative bg-background">
      {/* Subtle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-foreground/1 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h2 
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground animate-slide-up"
          >
            Let's Build Something{" "}
            <span className="text-gradient">Amazing Together</span>
          </h2>
          <p 
            className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-slide-up-delayed"
          >
            Get a free quote and launch your project with LaunchDock. 
            We respond within 1 hour and are here to bring your vision to life.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
            {/* Form Section */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      px-6
                      py-4
                      rounded-2xl
                      border border-border/30
                      bg-card
                      text-foreground
                      placeholder:text-muted-foreground
                      focus:outline-none
                      focus:border-primary/50
                      focus:ring-2
                      focus:ring-primary/10
                      transition-all duration-300
                      text-base
                    "
                    placeholder="your name"
                  />
                </div>

                {/* Email & Phone Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="
                        w-full
                        px-6
                        py-4
                        rounded-2xl
                        border border-border/30
                        bg-card
                        text-foreground
                        placeholder:text-muted-foreground
                        focus:outline-none
                        focus:border-primary/50
                        focus:ring-2
                        focus:ring-primary/10
                        transition-all duration-300
                        text-base
                      "
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="
                        w-full
                        px-6
                        py-4
                        rounded-2xl
                        border border-border/30
                        bg-card
                        text-foreground
                        placeholder:text-muted-foreground
                        focus:outline-none
                        focus:border-primary/50
                        focus:ring-2
                        focus:ring-primary/10
                        transition-all duration-300
                        text-base
                      "
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                {/* Project Type & Budget Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-foreground mb-2">
                      Project Type
                    </label>
                    <div className="relative">
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className="
                          w-full
                          px-6
                          py-4
                          pr-12
                          rounded-2xl
                          border border-border/30
                          bg-card
                          text-foreground
                          focus:outline-none
                          focus:border-primary/50
                          focus:ring-2
                          focus:ring-primary/10
                          transition-all duration-300
                          text-base
                          appearance-none
                          cursor-pointer
                        "
                      >
                        <option value="">Select project type</option>
                        <option value="web">Web Development</option>
                        <option value="mobile">Mobile App</option>
                        <option value="design">UI/UX Design</option>
                        <option value="mvp">MVP Development</option>
                        <option value="custom">Custom Software</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
                      Budget Range
                    </label>
                    <div className="relative">
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="
                          w-full
                          px-6
                          py-4
                          pr-12
                          rounded-2xl
                          border border-border/30
                          bg-card
                          text-foreground
                          focus:outline-none
                          focus:border-primary/50
                          focus:ring-2
                          focus:ring-primary/10
                          transition-all duration-300
                          text-base
                          appearance-none
                          cursor-pointer
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

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    className="
                      w-full
                      px-6
                      py-4
                      rounded-2xl
                      border border-border/30
                      bg-card
                      text-foreground
                      placeholder:text-muted-foreground
                      focus:outline-none
                      focus:border-primary/50
                      focus:ring-2
                      focus:ring-primary/10
                      transition-all duration-300
                      resize-none
                      text-base
                    "
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  variant="hero" 
                  size="xl"
                  className="w-full group shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                >
                  Get a Free Quote
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </form>
            </div>

            {/* Contact Details & Scheduling */}
            <div className="space-y-12 animate-fade-in" style={{ animationDelay: '0.4s', opacity: 0 }}>
              {/* Contact Info */}
              <div className="space-y-8">
                <h3 className="font-display text-3xl font-bold text-foreground mb-8">
                  Get in Touch
                </h3>

                {/* Email */}
                <a 
                  href="mailto:hello@launchdock.com" 
                  className="flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition-all duration-300">
                    <Mail className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                      hello@launchdock.com
                    </p>
                  </div>
                </a>

                {/* Phone */}
                <a 
                  href="tel:8779142877" 
                  className="flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition-all duration-300">
                    <Phone className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                      +91 8779142877
                    </p>
                  </div>
                </a>

                {/* Response Time */}
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Response Time</p>
                    <p className="text-lg font-medium text-foreground">
                      We respond within 1 hour
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div>
                <a
                  href="https://wa.me/918779142877"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    gap-3
                    px-8
                    py-4
                    rounded-2xl
                    border-2
                    border-green-500/30
                    bg-green-500/5
                    text-green-600
                    hover:bg-green-500/10
                    hover:border-green-500/50
                    transition-all duration-300
                    font-semibold
                    group
                  "
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Scheduling Block */}
              <div className="
                p-8
                rounded-3xl
                border border-border/30
                bg-card/50
                backdrop-blur-sm
              ">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-display text-2xl font-bold text-foreground">
                    Book a Free Call
                  </h4>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Schedule a 15-minute consultation to discuss your project and explore how we can help bring your vision to life.
                </p>
                <Button 
                  variant="hero-outline" 
                  size="lg"
                  className="w-full group"
                  onClick={onSchedule}
                >
                    Schedule a Call
                    <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </Button>
              </div>

              {/* Talk to Expert Button */}
              <Button 
                variant="outline" 
                size="lg"
                className="w-full group"
                onClick={onSchedule}
              >
                Talk to an Expert
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

