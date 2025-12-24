"use client";

import { use, useState, useEffect, useRef } from "react";
import { Clock, ArrowLeft, Calendar, Volume2, VolumeX, Play, Pause, BookOpen, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const blogPosts: Record<number, {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  readTime: string;
  content: string;
  date: string;
}> = {
  1: {
    id: 1,
    title: "How to Grow Your Business Online",
    description: "Discover proven strategies to expand your digital presence and reach more customers in the digital age.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    readTime: "5 min read",
    date: "January 15, 2025",
    content: `
      <h2>Introduction</h2>
      <p>Growing your business online has never been more important. With the digital landscape constantly evolving, businesses need to adapt and leverage online platforms to reach their target audience effectively.</p>
      
      <h2>1. Build a Strong Online Presence</h2>
      <p>Your website is often the first impression customers have of your business. Ensure it's professional, mobile-responsive, and optimized for search engines. A well-designed website can significantly impact your credibility and conversion rates.</p>
      
      <h2>2. Leverage Social Media</h2>
      <p>Social media platforms offer incredible opportunities to connect with your audience. Choose platforms that align with your target demographic and consistently share valuable content that engages and informs your followers.</p>
      
      <h2>3. Content Marketing</h2>
      <p>Create valuable, relevant content that addresses your customers' pain points. Blog posts, videos, and infographics can establish you as an industry expert and drive organic traffic to your website.</p>
      
      <h2>4. SEO Optimization</h2>
      <p>Search Engine Optimization is crucial for online visibility. Research keywords relevant to your business, optimize your website's content, and build quality backlinks to improve your search rankings.</p>
      
      <h2>5. Email Marketing</h2>
      <p>Build and nurture an email list to maintain direct communication with your customers. Personalized email campaigns can drive sales and keep your audience engaged with your brand.</p>
      
      <h2>Conclusion</h2>
      <p>Growing your business online requires a strategic approach and consistent effort. By implementing these strategies, you can expand your digital footprint and reach more customers effectively.</p>
    `
  },
  2: {
    id: 2,
    title: "Why Branding Matters More than Ever",
    description: "Learn how strong branding can differentiate your business and create lasting customer connections.",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1561070791-2526d93794bc?w=800&h=600&fit=crop",
    readTime: "7 min read",
    date: "January 12, 2025",
    content: `
      <h2>Introduction</h2>
      <p>In today's competitive marketplace, branding is not just a logo or a color scheme—it's the entire experience your customers have with your business. Strong branding can be the difference between being forgotten and being remembered.</p>
      
      <h2>1. Brand Identity</h2>
      <p>Your brand identity encompasses your logo, colors, typography, and overall visual style. These elements work together to create a cohesive image that customers can instantly recognize and connect with.</p>
      
      <h2>2. Brand Story</h2>
      <p>Every successful brand has a compelling story. Your brand story should communicate your values, mission, and what makes you unique. This narrative helps customers form emotional connections with your business.</p>
      
      <h2>3. Consistency is Key</h2>
      <p>Consistent branding across all touchpoints—from your website to social media to packaging—builds trust and recognition. Inconsistency can confuse customers and weaken your brand's impact.</p>
      
      <h2>4. Customer Experience</h2>
      <p>Your brand is reflected in every interaction customers have with your business. From customer service to product quality, every touchpoint should reinforce your brand values and promise.</p>
      
      <h2>5. Building Trust</h2>
      <p>Strong branding builds trust. When customers recognize and trust your brand, they're more likely to choose you over competitors, even if your prices are higher.</p>
      
      <h2>Conclusion</h2>
      <p>Investing in strong branding is investing in your business's future. A well-crafted brand can differentiate you from competitors, build customer loyalty, and drive long-term growth.</p>
    `
  },
  3: {
    id: 3,
    title: "Website vs Web App: What's Right for You?",
    description: "A comprehensive guide to help you choose between a website and web application for your business needs.",
    category: "Design",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    readTime: "6 min read",
    date: "January 10, 2025",
    content: `
      <h2>Introduction</h2>
      <p>Understanding the difference between a website and a web application is crucial when planning your digital presence. Each serves different purposes and offers unique benefits.</p>
      
      <h2>1. What is a Website?</h2>
      <p>A website is primarily informational, displaying content that visitors can read and navigate. It's perfect for showcasing your business, services, portfolio, or blog. Websites are typically static or have minimal interactivity.</p>
      
      <h2>2. What is a Web Application?</h2>
      <p>A web application is interactive software that runs in a browser. Users can perform actions, input data, and receive dynamic responses. Examples include online stores, social media platforms, and productivity tools.</p>
      
      <h2>3. Key Differences</h2>
      <p><strong>Interactivity:</strong> Websites display information; web apps enable user actions and data processing.</p>
      <p><strong>Complexity:</strong> Websites are simpler to build and maintain; web apps require more development resources.</p>
      <p><strong>Purpose:</strong> Websites inform; web apps perform functions and solve problems.</p>
      
      <h2>4. When to Choose a Website</h2>
      <p>Choose a website if you need to: showcase your business, share information, display a portfolio, publish blog content, or provide contact information.</p>
      
      <h2>5. When to Choose a Web App</h2>
      <p>Choose a web app if you need to: process user data, enable transactions, manage accounts, provide real-time updates, or offer interactive tools.</p>
      
      <h2>Conclusion</h2>
      <p>The choice between a website and web app depends on your specific needs. Many businesses benefit from having both—a website for information and a web app for functionality.</p>
    `
  },
  4: {
    id: 4,
    title: "How AI Can Automate Your Business",
    description: "Explore how artificial intelligence can streamline operations and boost productivity in your organization.",
    category: "AI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    readTime: "8 min read",
    date: "January 8, 2025",
    content: `
      <h2>Introduction</h2>
      <p>Artificial Intelligence is transforming how businesses operate. From automating repetitive tasks to providing intelligent insights, AI can significantly enhance productivity and efficiency.</p>
      
      <h2>1. Customer Service Automation</h2>
      <p>AI-powered chatbots can handle customer inquiries 24/7, providing instant responses and freeing up your team for more complex issues. Modern chatbots can understand context and provide personalized assistance.</p>
      
      <h2>2. Data Analysis and Insights</h2>
      <p>AI can process vast amounts of data quickly, identifying patterns and trends that would take humans weeks to discover. These insights can inform strategic decisions and improve business outcomes.</p>
      
      <h2>3. Marketing Automation</h2>
      <p>AI can personalize marketing campaigns, optimize ad spend, and predict customer behavior. This leads to higher conversion rates and more efficient use of marketing budgets.</p>
      
      <h2>4. Process Automation</h2>
      <p>Repetitive tasks like data entry, invoice processing, and report generation can be automated with AI, reducing errors and allowing employees to focus on high-value work.</p>
      
      <h2>5. Predictive Analytics</h2>
      <p>AI can forecast demand, predict maintenance needs, and identify potential issues before they become problems. This proactive approach can save time and money.</p>
      
      <h2>Conclusion</h2>
      <p>AI automation is no longer a luxury—it's becoming essential for competitive businesses. Start with small implementations and gradually expand as you see results.</p>
    `
  },
  5: {
    id: 5,
    title: "Top 10 Mistakes Small Businesses Make Online",
    description: "Avoid common pitfalls that can hurt your online presence and learn how to build a strong digital foundation.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    readTime: "10 min read",
    date: "January 5, 2025",
    content: `
      <h2>Introduction</h2>
      <p>Many small businesses struggle online due to common mistakes that are easily avoidable. Learning from these errors can save you time, money, and potential customers.</p>
      
      <h2>1. Neglecting Mobile Optimization</h2>
      <p>With most web traffic coming from mobile devices, a non-responsive website is a major mistake. Ensure your site works perfectly on all screen sizes.</p>
      
      <h2>2. Poor Website Performance</h2>
      <p>Slow-loading websites drive visitors away. Optimize images, use caching, and choose reliable hosting to ensure fast load times.</p>
      
      <h2>3. Ignoring SEO</h2>
      <p>Without proper SEO, potential customers won't find you online. Research keywords, optimize content, and build quality backlinks.</p>
      
      <h2>4. Inconsistent Branding</h2>
      <p>Inconsistent branding across platforms confuses customers and weakens your brand identity. Maintain consistent colors, fonts, and messaging everywhere.</p>
      
      <h2>5. Not Having Clear Calls-to-Action</h2>
      <p>Visitors need clear guidance on what to do next. Include prominent, compelling calls-to-action throughout your website.</p>
      
      <h2>6. Ignoring Social Media</h2>
      <p>Social media is essential for modern businesses. Engage with your audience, share valuable content, and build a community around your brand.</p>
      
      <h2>7. Poor Content Quality</h2>
      <p>Low-quality content damages your credibility. Invest in well-written, valuable content that serves your audience's needs.</p>
      
      <h2>8. Not Tracking Analytics</h2>
      <p>Without analytics, you're flying blind. Track website performance, user behavior, and conversion rates to make data-driven decisions.</p>
      
      <h2>9. Neglecting Customer Reviews</h2>
      <p>Customer reviews are crucial for trust and SEO. Encourage reviews and respond to feedback promptly and professionally.</p>
      
      <h2>10. Trying to Do Everything Yourself</h2>
      <p>Focus on what you do best and outsource specialized tasks like web development, SEO, and digital marketing to experts.</p>
      
      <h2>Conclusion</h2>
      <p>Avoiding these common mistakes can significantly improve your online presence. Take time to assess your current strategy and make necessary improvements.</p>
    `
  },
  6: {
    id: 6,
    title: "How Good UI/UX Increases Sales",
    description: "Understand the direct correlation between user experience design and your bottom line revenue.",
    category: "Design",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=600&fit=crop",
    readTime: "6 min read",
    date: "January 3, 2025",
    content: `
      <h2>Introduction</h2>
      <p>User experience design directly impacts your sales and revenue. A well-designed interface can guide users smoothly through your sales funnel, while poor design can drive them away.</p>
      
      <h2>1. First Impressions Matter</h2>
      <p>Users form opinions about your website in milliseconds. A clean, professional design builds trust and encourages exploration, while a cluttered or outdated design can cause immediate bounce.</p>
      
      <h2>2. Navigation and Usability</h2>
      <p>Intuitive navigation helps users find what they need quickly. Confusing layouts lead to frustration and abandoned carts. Clear menus, search functionality, and logical page structures are essential.</p>
      
      <h2>3. Mobile Experience</h2>
      <p>With mobile commerce growing rapidly, a poor mobile experience directly hurts sales. Ensure your site is fully responsive and optimized for touch interactions.</p>
      
      <h2>4. Loading Speed</h2>
      <p>Slow websites kill conversions. Every second of delay can reduce conversions by 7%. Optimize images, minimize code, and use fast hosting to keep load times under 3 seconds.</p>
      
      <h2>5. Clear Value Proposition</h2>
      <p>Users need to immediately understand what you offer and why they should care. Clear headlines, compelling copy, and prominent calls-to-action guide users toward purchase decisions.</p>
      
      <h2>6. Trust Signals</h2>
      <p>Security badges, customer reviews, and professional design elements build trust. Users are more likely to purchase from sites they trust.</p>
      
      <h2>7. Simplified Checkout</h2>
      <p>A complicated checkout process is a major conversion killer. Streamline forms, offer guest checkout, and minimize steps to complete a purchase.</p>
      
      <h2>Conclusion</h2>
      <p>Investing in good UI/UX design is investing in your revenue. Every design decision should be made with conversion optimization in mind.</p>
    `
  },
  7: {
    id: 7,
    title: "Why Every Business Needs a Modern Website in 2025",
    description: "Discover why having a cutting-edge website is no longer optional but essential for business success.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    readTime: "5 min read",
    date: "January 1, 2025",
    content: `
      <h2>Introduction</h2>
      <p>In 2025, a modern website is not just a nice-to-have—it's a fundamental requirement for business success. Your website is often the first and most important touchpoint with potential customers.</p>
      
      <h2>1. Digital First Impressions</h2>
      <p>Your website is your digital storefront. Before customers visit your physical location or speak with your team, they research you online. A modern, professional website creates positive first impressions.</p>
      
      <h2>2. 24/7 Availability</h2>
      <p>Unlike a physical store, your website is always open. Customers can learn about your services, make purchases, and contact you at any time, from anywhere in the world.</p>
      
      <h2>3. Credibility and Trust</h2>
      <p>Businesses without websites or with outdated sites appear unprofessional. A modern website with current design trends and functionality builds credibility and trust with potential customers.</p>
      
      <h2>4. Search Engine Visibility</h2>
      <p>Modern websites with proper SEO can rank in search results, bringing organic traffic and potential customers to your business without paid advertising.</p>
      
      <h2>5. Competitive Advantage</h2>
      <p>If your competitors have modern websites and you don't, you're losing customers to them. A cutting-edge website can be a significant competitive advantage.</p>
      
      <h2>6. Marketing Hub</h2>
      <p>Your website serves as the central hub for all your marketing efforts. Social media, email campaigns, and ads all drive traffic back to your website where conversions happen.</p>
      
      <h2>7. Data and Analytics</h2>
      <p>Modern websites provide valuable data about your visitors—what they're interested in, where they come from, and how they interact with your site. This data informs business decisions.</p>
      
      <h2>Conclusion</h2>
      <p>Investing in a modern website is investing in your business's future. It's an essential tool for growth, credibility, and customer acquisition in today's digital landscape.</p>
    `
  }
};

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const postId = parseInt(resolvedParams.id);
  const post = blogPosts[postId];
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Extract text from HTML content
  const extractText = (html: string): string => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  // Text-to-speech functionality
  const handlePlayPause = () => {
    if (!post) return;

    if (isPlaying && !isPaused) {
      // Pause
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isPaused) {
      // Resume
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      // Start
      const text = extractText(post.content);
      const utterance = new SpeechSynthesisUtterance(text);
      
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      utterance.lang = 'en-US';

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentUtterance(null);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentUtterance(null);
      };

      window.speechSynthesis.speak(utterance);
      setCurrentUtterance(utterance);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentUtterance(null);
  };


  // Share functionality
  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button variant="hero">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/blog">
              <Button variant="ghost" className="mb-8 group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Button>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="mb-6">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
              >
                {post.category}
              </motion.span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.description}
            </p>
            
            {/* Meta Info & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-card/50 border border-border/30">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  {post.readTime}
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  {Math.ceil(extractText(post.content).split(' ').length / 200)} min read
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {/* Audio Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePlayPause}
                    className="group"
                  >
                    {isPlaying && !isPaused ? (
                      <Pause className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    ) : (
                      <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    )}
                  </Button>
                  {isPlaying && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleStop}
                      className="group"
                    >
                      <VolumeX className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </Button>
                  )}
                  {!isPlaying && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handlePlayPause}
                      className="group"
                      title="Listen to article"
                    >
                      <Volume2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </Button>
                  )}
                </div>
                
                {/* Share Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="group"
                >
                  <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full h-96 mb-12 rounded-3xl overflow-hidden group"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </motion.div>

          {/* Content */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-foreground prose-headings:font-display prose-headings:font-bold
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
              prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:text-foreground
              prose-h2:border-b prose-h2:border-border/30 prose-h2:pb-4
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-ul:text-muted-foreground prose-li:mb-3
              prose-blockquote:border-l-primary prose-blockquote:border-l-4
              prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-sky-500/5 to-violet-500/10 border border-primary/20"
          >
            <div className="text-center">
              <h3 className="font-display text-2xl font-bold mb-4 text-foreground">
                Enjoyed this article?
              </h3>
              <p className="text-muted-foreground mb-6">
                Share it with others or explore more insights from LaunchDock.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button variant="hero" onClick={handleShare} className="group">
                  <Share2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Share Article
                </Button>
                <Link href="/blog">
                  <Button variant="hero-outline" className="group">
                    Read More Articles
                    <ArrowLeft className="w-4 h-4 ml-2 group-hover:-translate-x-1 transition-transform rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </article>
    </div>
  );
}
