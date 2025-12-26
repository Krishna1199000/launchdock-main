"use client"
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Urmil Vadhvana",
    role: "Founder, Cranberri Diamonds",
    emoji: "👨‍💼",
    content: "LaunchDock built an exceptional e-commerce platform for Cranberri Diamonds. Their expertise in Next.js, Prisma, and AWS helped us create a scalable solution with comprehensive admin, employee, and customer management systems. Highly professional and reliable team!",
    rating: 5,
  },
  {
    name: "Tejas Bhosle",
    role: "Founder, Mothers Aura Diamonds",
    emoji: "👨‍💼",
    content: "Working with LaunchDock was a game-changer for Mothers Aura Diamonds. They delivered a premium diamond e-commerce solution with advanced features and enterprise-grade infrastructure. The platform has been instrumental in our business growth.",
    rating: 5,
  },
  {
    name: "Navin",
    role: "Founder, Humjoli Pvt Limited",
    emoji: "👨‍💼",
    content: "LaunchDock is developing an outstanding event management platform for Humjoli. Their modern web technologies and seamless user experience approach have been impressive. Professional team with excellent communication throughout the development process.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Loved by <span className="text-gradient">Industry Leaders</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it. Here's what our clients have to say 
            about working with LaunchDock.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-8 relative group hover:border-primary/30 transition-all duration-500"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary/20">
                <Quote className="w-12 h-12" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/90 leading-relaxed mb-8">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl ring-2 ring-primary/20">
                  {testimonial.emoji}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
