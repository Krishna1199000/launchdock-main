"use client";

import { useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Sparkles,
  Code,
  Palette,
  Users,
  Rocket,
  Heart,
  Coffee,
  GraduationCap,
  TrendingUp,
  Globe,
  Send,
  CheckCircle2,
  ArrowRight,
  Filter,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const jobCategories = ["All", "Engineering", "Design", "Marketing", "Sales", "Operations"];

const benefits = [
  {
    title: "Competitive Salary",
    description: "We offer market-competitive compensation packages",
    icon: DollarSign,
  },
  {
    title: "Remote Work",
    description: "Work from anywhere in the world",
    icon: Globe,
  },
  {
    title: "Health Insurance",
    description: "Comprehensive health and wellness coverage",
    icon: Heart,
  },
  {
    title: "Learning Budget",
    description: "Annual budget for courses, conferences, and books",
    icon: GraduationCap,
  },
  {
    title: "Flexible Hours",
    description: "Work when you're most productive",
    icon: Clock,
  },
  {
    title: "Team Events",
    description: "Regular team building and social events",
    icon: Users,
  },
];

const jobs = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "5+ years",
    description: "We're looking for an experienced full-stack developer to join our team and help build scalable web applications.",
    requirements: [
      "5+ years of experience with React, Next.js, and Node.js",
      "Strong knowledge of TypeScript and modern JavaScript",
      "Experience with databases (PostgreSQL, MongoDB)",
      "Familiarity with cloud platforms (AWS, Vercel)",
      "Excellent problem-solving and communication skills",
    ],
    icon: Code,
  },
  {
    id: 2,
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    description: "Join our design team to create beautiful, user-friendly interfaces that delight our clients and their users.",
    requirements: [
      "3+ years of UI/UX design experience",
      "Proficiency in Figma, Adobe Creative Suite",
      "Strong portfolio showcasing web and mobile designs",
      "Understanding of design systems and component libraries",
      "Experience with user research and testing",
    ],
    icon: Palette,
  },
  {
    id: 3,
    title: "Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    experience: "4+ years",
    description: "Lead our marketing efforts and help grow our brand presence across multiple channels.",
    requirements: [
      "4+ years of marketing experience in tech",
      "Experience with digital marketing, SEO, and content strategy",
      "Strong analytical skills and data-driven approach",
      "Excellent written and verbal communication",
      "Experience managing marketing campaigns and budgets",
    ],
    icon: TrendingUp,
  },
  {
    id: 4,
    title: "Sales Development Representative",
    department: "Sales",
    location: "Remote",
    type: "Full-time",
    experience: "2+ years",
    description: "Help us connect with potential clients and grow our business through strategic outreach.",
    requirements: [
      "2+ years of sales or business development experience",
      "Strong communication and interpersonal skills",
      "Experience with CRM tools (HubSpot, Salesforce)",
      "Self-motivated and goal-oriented",
      "Tech-savvy with interest in software development",
    ],
    icon: Users,
  },
  {
    id: 5,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "4+ years",
    description: "Build and maintain our infrastructure to ensure reliable, scalable deployments.",
    requirements: [
      "4+ years of DevOps or infrastructure experience",
      "Strong knowledge of AWS, Docker, Kubernetes",
      "Experience with CI/CD pipelines",
      "Knowledge of monitoring and logging tools",
      "Scripting skills (Bash, Python, or similar)",
    ],
    icon: Rocket,
  },
  {
    id: 6,
    title: "Product Manager",
    department: "Operations",
    location: "Remote",
    type: "Full-time",
    experience: "5+ years",
    description: "Lead product strategy and work with cross-functional teams to deliver exceptional products.",
    requirements: [
      "5+ years of product management experience",
      "Strong analytical and strategic thinking skills",
      "Experience with agile methodologies",
      "Excellent communication and leadership skills",
      "Technical background preferred",
    ],
    icon: Briefcase,
  },
];

export default function CareersPage() {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
  const [applicationForm, setApplicationForm] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const filteredJobs = jobs.filter((job) => {
    const matchesCategory = selectedCategory === "All" || job.department === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/chatwidget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "email",
          name: applicationForm.name,
          email: applicationForm.email,
          phone: applicationForm.phone,
          message: `Career Application for ${selectedJob?.title}\n\nCover Letter:\n${applicationForm.coverLetter}\n\nResume: ${applicationForm.resume}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        toast({
          title: "Application submitted!",
          description: "Thank you for applying. We'll review your application and get back to you soon.",
          variant: "success",
        });
        setTimeout(() => {
          setSubmitted(false);
          setSelectedJob(null);
          setApplicationForm({ name: "", email: "", phone: "", resume: "", coverLetter: "" });
        }, 5000);
      } else {
        toast({
          title: "Error",
          description: "Failed to submit application. Please try again.",
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-20 sm:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 mb-6 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
            >
              <Sparkles className="w-4 h-4" />
              Join Our Team
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground"
            >
              Build Your Career{" "}
              <span className="text-primary">
                With Us
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8"
            >
              Join a team of passionate innovators working on cutting-edge projects. We're looking for talented individuals who want to make an impact.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Why Work With Us?
            </h2>
            <p className="text-muted-foreground">
              We offer competitive benefits and a great work environment
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="p-6 rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50 transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Open Positions
            </h2>
            <p className="text-muted-foreground">
              Explore our current job openings
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-border/50 bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Filter className="w-5 h-5 text-muted-foreground" />
              {jobCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-foreground hover:bg-primary/20 border border-primary/30"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredJobs.map((job, index) => {
              const Icon = job.icon;
              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setSelectedJob(job)}
                  className="p-6 rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-sm cursor-pointer hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50 transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {job.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{job.experience}</span>
                    <span className="text-primary font-semibold text-sm">Apply Now →</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredJobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">No jobs found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-background rounded-3xl border border-border/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                    {selectedJob.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span>{selectedJob.department}</span>
                    <span>•</span>
                    <span>{selectedJob.location}</span>
                    <span>•</span>
                    <span>{selectedJob.type}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-foreground mb-3">Job Description</h3>
                <p className="text-muted-foreground mb-6">{selectedJob.description}</p>
                
                <h3 className="font-semibold text-foreground mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Application Submitted!
                  </h3>
                  <p className="text-muted-foreground">
                    Thank you for your interest. We'll review your application and get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleApplicationSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={applicationForm.name}
                        onChange={(e) => setApplicationForm({ ...applicationForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={applicationForm.email}
                        onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={applicationForm.phone}
                      onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Resume/CV Link *
                    </label>
                    <input
                      type="url"
                      required
                      value={applicationForm.resume}
                      onChange={(e) => setApplicationForm({ ...applicationForm, resume: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="https://linkedin.com/in/yourprofile or Google Drive link"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Cover Letter *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={applicationForm.coverLetter}
                      onChange={(e) => setApplicationForm({ ...applicationForm, coverLetter: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      placeholder="Tell us why you're interested in this position..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full group"
                  >
                    Submit Application
                    <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-primary/10 border border-primary/20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 mb-6 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
            >
              <Rocket className="w-4 h-4" />
              Don't See a Match?
            </motion.div>
            
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              We're Always Looking for{" "}
              <span className="text-primary">Great Talent</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Even if you don't see a position that fits, we'd love to hear from you. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Link href="/contact">
              <Button variant="hero" size="lg" className="group">
                Get In Touch
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


