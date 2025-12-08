"use client"
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO, TechStart",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    content: "LaunchDock transformed our vision into reality. Their team delivered a stunning web app that exceeded all our expectations. The attention to detail was remarkable.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Founder, FinFlow",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    content: "Working with LaunchDock was a game-changer. They understood our fintech needs and built a platform that our users love. Highly recommend their services.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "CTO, HealthHub",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    content: "The mobile app they developed for us has received incredible user feedback. Professional team, on-time delivery, and outstanding quality. A true partner!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
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
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                />
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

        {/* Logos Section */}
        <div className="mt-24 text-center">
          <p className="text-muted-foreground mb-8">Trusted by innovative companies worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
            {["Stripe", "Vercel", "Linear", "Notion", "Figma"].map((company, i) => (
              <span key={i} className="font-display text-2xl font-bold text-muted-foreground/50">
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
