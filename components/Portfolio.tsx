"use client"
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "FinTech Dashboard",
    category: "Web Application",
    description: "A comprehensive financial management platform with real-time analytics and trading capabilities.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "E-Commerce Platform",
    category: "Web & Mobile",
    description: "Multi-vendor marketplace with seamless checkout experience and inventory management.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    tags: ["Next.js", "Stripe", "AWS"],
  },
  {
    title: "Health & Fitness App",
    category: "Mobile Application",
    description: "AI-powered fitness tracking app with personalized workout plans and nutrition guidance.",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=600&fit=crop",
    tags: ["React Native", "AI/ML", "Firebase"],
  },
  {
    title: "SaaS Analytics Tool",
    category: "Web Application",
    description: "Business intelligence platform helping companies make data-driven decisions.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["Vue.js", "Python", "Docker"],
  },
];

const Portfolio = () => {
  return (
    <section id="work" className="py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
              Our Work
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </div>
          <Button variant="hero-outline" className="self-start md:self-auto">
            View All Projects
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl glass-card"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-primary text-sm font-medium mb-2 block">
                  {project.category}
                </span>
                <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full bg-secondary/80 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
