"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Clock, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const blogPosts = [
  {
    id: 1,
    title: "How to Grow Your Business Online",
    description: "Discover proven strategies to expand your digital presence and reach more customers in the digital age.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    readTime: "5 min read",
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
  {
    id: 2,
    title: "Why Branding Matters More than Ever",
    description: "Learn how strong branding can differentiate your business and create lasting customer connections.",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1561070791-2526d93794bc?w=800&h=600&fit=crop",
    readTime: "7 min read",
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
  {
    id: 3,
    title: "Website vs Web App: What's Right for You?",
    description: "A comprehensive guide to help you choose between a website and web application for your business needs.",
    category: "Design",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    readTime: "6 min read",
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
  {
    id: 4,
    title: "How AI Can Automate Your Business",
    description: "Explore how artificial intelligence can streamline operations and boost productivity in your organization.",
    category: "AI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    readTime: "8 min read",
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
  {
    id: 5,
    title: "Top 10 Mistakes Small Businesses Make Online",
    description: "Avoid common pitfalls that can hurt your online presence and learn how to build a strong digital foundation.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    readTime: "10 min read",
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
  {
    id: 6,
    title: "How Good UI/UX Increases Sales",
    description: "Understand the direct correlation between user experience design and your bottom line revenue.",
    category: "Design",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=600&fit=crop",
    readTime: "6 min read",
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
  {
    id: 7,
    title: "Why Every Business Needs a Modern Website in 2025",
    description: "Discover why having a cutting-edge website is no longer optional but essential for business success.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    readTime: "5 min read",
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
];

const categories = ["All", "Business", "Branding", "Design", "AI"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visiblePosts, setVisiblePosts] = useState<Set<number>>(new Set());

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  useEffect(() => {
    filteredPosts.forEach((post, index) => {
      setTimeout(() => {
        setVisiblePosts(prev => new Set([...prev, post.id]));
      }, index * 100);
    });
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-16 relative bg-background overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Blog
              </span>
            </motion.div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
              Resources &{" "}
              <span className="bg-gradient-to-r from-primary via-sky-400 to-violet-500 bg-clip-text text-transparent">
                Insights
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Learn, grow, and build with LaunchDock. We share knowledge, business growth tips, 
              tech insights, and creative inspiration to help you succeed.
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                  ${selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                    : 'bg-card border border-border/30 text-muted-foreground hover:border-primary/30 hover:text-foreground hover:bg-card/80'
                  }
                `}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => {
              const isVisible = visiblePosts.has(post.id);
              
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ 
                    opacity: isVisible ? 1 : 0, 
                    y: isVisible ? 0 : 50,
                    scale: isVisible ? 1 : 0.9
                  }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative"
                >
                  <Link href={`/blog/${post.id}`}>
                    <div className="
                      h-full
                      bg-card
                      border border-border/30
                      rounded-3xl
                      overflow-hidden
                      transition-all duration-500
                      hover:shadow-2xl
                      hover:shadow-primary/10
                      hover:border-primary/40
                      group-hover:bg-card/90
                      backdrop-blur-sm
                      cursor-pointer
                      relative
                    ">
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/3 group-hover:to-primary/5 transition-all duration-500 rounded-3xl pointer-events-none" />
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        <motion.img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover relative z-0"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent z-10" />
                        
                        {/* Category Tag */}
                        <motion.div
                          className="absolute top-4 left-4 z-20"
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="
                            px-4 py-1.5 rounded-full text-xs font-semibold
                            bg-primary/90 backdrop-blur-sm text-primary-foreground
                            shadow-lg border border-primary/30
                          ">
                            {post.category}
                          </span>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="p-8 relative z-10">
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
                              <Clock className="w-3.5 h-3.5 text-primary/60" />
                              {post.readTime}
                            </div>
                          </div>
                          <motion.div
                            className="flex items-center gap-2 text-sm font-semibold text-primary"
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            Read More
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

