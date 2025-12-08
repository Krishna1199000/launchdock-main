"use client"
import { useState, useEffect } from "react";
import { 
  Globe, 
  Smartphone, 
  Palette, 
  Zap, 
  Code, 
  TrendingUp, 
  Cloud,
  Sparkles,
  Video,
  Bot
} from "lucide-react";

const technologies = {
  "Mobile Development": {
    icon: Smartphone,
    techs: ["React Native", "Flutter", "Swift", "Kotlin", "Dart", "Java", "Objective-C", "Xamarin", "Ionic", "Expo"],
    color: "from-blue-500/20 to-cyan-500/20"
  },
  "Website Development": {
    icon: Globe,
    techs: ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "JavaScript", "Node.js", "Express", "Python", "Django", "PHP", "Laravel", "HTML5", "CSS3"],
    color: "from-purple-500/20 to-pink-500/20"
  },
  "UI/UX Design": {
    icon: Palette,
    techs: ["Figma", "Adobe XD", "Sketch", "Framer", "InVision", "Principle", "Protopie", "Zeplin", "After Effects", "Illustrator"],
    color: "from-pink-500/20 to-rose-500/20"
  },
  "Automation & AI Integration": {
    icon: Bot,
    techs: ["OpenAI", "GPT-4", "Claude", "TensorFlow", "PyTorch", "Machine Learning", "RPA", "Zapier", "Make", "ChatGPT API", "LangChain", "AI Agents"],
    color: "from-yellow-500/20 to-orange-500/20"
  },
  "Custom Software": {
    icon: Code,
    techs: ["Python", "Java", "C#", ".NET", "Go", "Rust", "Ruby", "Rails", "Docker", "Kubernetes", "Microservices", "GraphQL"],
    color: "from-green-500/20 to-emerald-500/20"
  },
  "Digital Strategy": {
    icon: TrendingUp,
    techs: ["Google Analytics", "SEO Tools", "Marketing Automation", "A/B Testing", "Data Analytics", "Business Intelligence", "CRM", "Email Marketing"],
    color: "from-indigo-500/20 to-blue-500/20"
  },
  "Scalable Deployment": {
    icon: Cloud,
    techs: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Terraform", "Vercel", "Netlify", "Cloudflare", "Nginx", "Load Balancing"],
    color: "from-cyan-500/20 to-teal-500/20"
  },
  "Video Editing & Multimedia": {
    icon: Video,
    techs: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Final Cut Pro", "Motion Graphics", "3D Animation", "Blender", "Cinema 4D", "Photoshop", "Illustrator", "Audition", "Color Grading"],
    color: "from-violet-500/20 to-purple-500/20"
  }
};

const Technologies = () => {
  const [visibleTechs, setVisibleTechs] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Staggered animation for technologies
    const timer = setTimeout(() => {
      Object.entries(technologies).forEach(([category, { techs }], categoryIndex) => {
        techs.forEach((tech, techIndex) => {
          setTimeout(() => {
            setVisibleTechs(prev => new Set([...prev, `${category}-${tech}`]));
          }, (categoryIndex * 200) + (techIndex * 50));
        });
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="technologies" className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[100px] animate-float-delayed" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 animate-slide-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Our Tech Stack
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
            Technologies We{" "}
            <span className="text-gradient">Master</span>
          </h2>
          <p className="text-muted-foreground text-lg animate-slide-up-delayed">
            Cutting-edge tools and technologies powering every project we deliver. 
            From mobile apps to cloud infrastructure, we've got you covered.
          </p>
        </div>

        {/* Technologies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.entries(technologies).map(([category, { icon: Icon, techs, color }], categoryIndex) => (
            <div
              key={category}
              className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 group"
              style={{ 
                animation: `fade-in 0.8s ease-out forwards`,
                animationDelay: `${categoryIndex * 0.15}s`,
                opacity: 0
              }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Icon className="w-6 h-6 text-primary relative z-10 group-hover:animate-pulse" />
                </div>
                <h3 className="font-display text-lg font-bold group-hover:text-primary transition-colors">
                  {category}
                </h3>
              </div>

              {/* Technologies List */}
              <div className="flex flex-wrap gap-2">
                {techs.map((tech, techIndex) => {
                  const techKey = `${category}-${tech}`;
                  const isVisible = visibleTechs.has(techKey);
                  
                  return (
                    <span
                      key={tech}
                      className={`
                        text-xs px-3 py-1.5 rounded-full 
                        bg-secondary/50 backdrop-blur-sm
                        border border-border/50
                        text-muted-foreground
                        hover:bg-primary/10 hover:border-primary/50 hover:text-primary
                        transition-all duration-500
                        cursor-default
                        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}
                        hover:scale-110 hover:shadow-lg hover:shadow-primary/20
                        hover:-translate-y-1
                        animate-float
                      `}
                      style={{
                        animationDelay: `${techIndex * 0.05}s`,
                        animationDuration: `${4 + (techIndex % 3)}s`
                      }}
                    >
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Floating Tech Badges */}
        <div className="mt-20 relative">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {Object.values(technologies).flatMap(({ techs }) => 
              techs.slice(0, 3).map((tech, index) => (
                <div
                  key={`floating-${tech}-${index}`}
                  className="glass-card px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-primary transition-colors animate-float"
                  style={{
                    animationDelay: `${index * 0.3}s`,
                    animationDuration: `${5 + (index % 2)}s`
                  }}
                >
                  {tech}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;

