"use client"
import Image from "next/image";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const footerLinks = {
    Services: [
      { name: "Web Development", href: "/services/web-development" },
      { name: "Mobile Apps", href: "/services/mobile-apps" },
      { name: "UI/UX Design", href: "/services/ui-ux-design" },
      { name: "MVP Development", href: "/services/mvp-development" },
      { name: "Custom Software", href: "/services/custom-software" },
      { name: "Digital Strategy", href: "/services/digital-strategy" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
    Resources: [
      { name: "Case Studies", href: "/case-studies" },
      { name: "Documentation", href: "/documentation" },
      { name: "Support", href: "/support" },
      { name: "FAQ", href: "/faq" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "https://x.com/launchdock_dev" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/launch-dock-2677b83a1/" },
    { icon: Github, href: "https://github.com/Krishna1199000" },
    { icon: Instagram, href: "https://www.instagram.com/launchdock.dev/" },
  ];

  return (
    <footer className="border-t border-border/50 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center mb-6">
              <Image 
                src="/launchdocklogo1.png" 
                alt="LaunchDock Logo" 
                width={150} 
                height={40}
                className="object-contain h-10"
              />
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              We build digital products that help startups and businesses 
              grow. From concept to launch, we're your creative partner.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-foreground mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 LaunchDock. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
