"use client"
import { Globe, Smartphone, Palette, Zap, Code, TrendingUp } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom websites and web applications built with cutting-edge technologies for optimal performance.",
    features: ["React & Next.js", "Custom CMS", "E-commerce"],
    href: "/services/web-development",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
    features: ["iOS & Android", "React Native", "Flutter"],
    href: "/services/mobile-apps",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive designs that engage users and drive conversions.",
    features: ["User Research", "Prototyping", "Design Systems"],
    href: "/services/ui-ux-design",
  },
  {
    icon: Zap,
    title: "MVP Development",
    description: "Launch your startup fast with lean, scalable minimum viable products.",
    features: ["Rapid Prototyping", "Agile Sprints", "Quick Launch"],
    href: "/services/mvp-development",
  },
  {
    icon: Code,
    title: "Custom Software",
    description: "Tailored software solutions that solve your unique business challenges.",
    features: ["API Development", "Integrations", "Automation"],
    href: "/services/custom-software",
  },
  {
    icon: TrendingUp,
    title: "Digital Strategy",
    description: "Strategic consulting to help you grow and scale your digital presence.",
    features: ["SEO & Analytics", "Growth Hacking", "Optimization"],
    href: "/services/digital-strategy",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-16 relative">
      {/* Background Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            Our Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="text-gradient">Launch & Scale</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From concept to launch and beyond, we provide end-to-end digital solutions 
            that help your business thrive in the digital age.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group glass-card rounded-2xl p-8 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 block"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
