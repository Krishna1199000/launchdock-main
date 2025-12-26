"use client"
import { useState, useEffect } from "react";
import { ArrowRight, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "How to Grow Your Business Online",
    description: "Discover proven strategies to expand your digital presence and reach more customers in the digital age.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Why Branding Matters More than Ever",
    description: "Learn how strong branding can differentiate your business and create lasting customer connections.",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Website vs Web App: What's Right for You?",
    description: "A comprehensive guide to help you choose between a website and web application for your business needs.",
    category: "Design",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "How AI Can Automate Your Business",
    description: "Explore how artificial intelligence can streamline operations and boost productivity in your organization.",
    category: "AI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    readTime: "8 min read"
  },
  {
    id: 5,
    title: "Top 10 Mistakes Small Businesses Make Online",
    description: "Avoid common pitfalls that can hurt your online presence and learn how to build a strong digital foundation.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    readTime: "10 min read"
  },
  {
    id: 6,
    title: "How Good UI/UX Increases Sales",
    description: "Understand the direct correlation between user experience design and your bottom line revenue.",
    category: "Design",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=600&fit=crop",
    readTime: "6 min read"
  },
  {
    id: 7,
    title: "Why Every Business Needs a Modern Website in 2025",
    description: "Discover why having a cutting-edge website is no longer optional but essential for business success.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    readTime: "5 min read"
  }
];

const quotes = [
  "Design is the silent ambassador of your brand.",
  "Your website is your 24/7 salesperson — make it count.",
  "A brand is no longer what we tell the customer it is — it's what customers tell each other.",
  "Creativity is intelligence having fun.",
  "If you don't build your dream, someone will hire you to help build theirs.",
  "Good design is good business.",
  "Innovation is the engine of progress."
];

const categories = ["All", "Business", "Branding", "Design", "AI"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentQuote, setCurrentQuote] = useState(0);
  const [visiblePosts, setVisiblePosts] = useState<Set<number>>(new Set());

  // Filter posts by category
  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  // Quote rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Staggered animation for posts
  useEffect(() => {
    filteredPosts.forEach((post, index) => {
      setTimeout(() => {
        setVisiblePosts(prev => new Set([...prev, post.id]));
      }, index * 100);
    });
  }, [selectedCategory]);

  return (
    <section id="blog" className="py-16 relative bg-background">
      {/* Subtle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary/3 rounded-full blur-[100px] animate-float-delayed" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h2 
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground animate-slide-up"
          >
            Resources &{" "}
            <span className="text-gradient">Insights</span>
          </h2>
          <p 
            className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-slide-up-delayed"
          >
            Learn, grow, and build with LaunchDock. We share knowledge, business growth tips, 
            tech insights, and creative inspiration to help you succeed.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 animate-fade-in">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                ${selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'bg-card border border-border/30 text-muted-foreground hover:border-primary/30 hover:text-foreground'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.map((post, index) => {
            const isVisible = visiblePosts.has(post.id);
            
              return (
                <article
                  key={post.id}
                  className="group relative"
                  style={{
                    animation: `slide-up-scale 0.8s ease-out forwards`,
                    animationDelay: `${index * 0.1}s`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)'
                  }}
                >
                  <Link href={`/blog/${post.id}`}>
                    <div className="
                      h-full
                      bg-card
                      border border-border/30
                      rounded-3xl
                      overflow-hidden
                      transition-all duration-700
                      hover:shadow-2xl
                      hover:shadow-foreground/5
                      hover:-translate-y-4
                      hover:border-primary/30
                      group-hover:bg-card/80
                      backdrop-blur-sm
                      cursor-pointer
                    ">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="
                        w-full h-full object-cover
                        transition-transform duration-700
                        group-hover:scale-110
                      "
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                    
                    {/* Category Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="
                        px-4 py-1.5 rounded-full text-xs font-semibold
                        bg-primary/90 backdrop-blur-sm text-primary-foreground
                        shadow-lg
                      ">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="
                      font-display text-2xl font-bold mb-3 text-foreground
                      transition-colors duration-500
                      group-hover:text-primary
                      tracking-tight
                    ">
                      {post.title}
                    </h3>
                    <p className="
                      text-muted-foreground leading-relaxed mb-6
                      text-[15px] font-light
                    ">
                      {post.description}
                    </p>

                    {/* Meta & CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </div>
                      </div>
                      <Link
                        href={`/blog/${post.id}`}
                        className="
                          flex items-center gap-2 text-sm font-semibold text-primary
                          hover:gap-3 transition-all duration-300
                          group/link
                        "
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                  </div>
                  </Link>
                </article>
            );
          })}
        </div>

        {/* Animated Quote Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="
            relative
            h-32
            flex items-center justify-center
            rounded-3xl
            bg-card/30
            backdrop-blur-sm
            border border-border/20
            p-8
          ">
            <div className="text-center">
              <p 
                key={currentQuote}
                className="
                  text-2xl md:text-3xl font-light text-foreground
                  animate-fade-in
                  italic
                "
                style={{
                  animation: 'fade-in 1s ease-in-out'
                }}
              >
                "{quotes[currentQuote]}"
              </p>
            </div>
            
            {/* Quote Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {quotes.map((_, index) => (
                <div
                  key={index}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-500
                    ${index === currentQuote ? 'bg-primary w-8' : 'bg-border/30'}
                  `}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;


