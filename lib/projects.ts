export interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  metric: string;
  url: string | null;
  accent: string;
  status: "live" | "development";
}

export const projects: Project[] = [
  {
    title: "Cranberri Diamonds",
    category: "E-Commerce Platform",
    description:
      "Full-featured diamond e-commerce platform with comprehensive admin, employee, and customer management systems. Built with modern tech stack for scalability and performance.",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=800&fit=crop&q=80",
    tags: ["Next.js", "Prisma ORM", "PostgreSQL", "AWS S3", "AWS EC2", "Tailwind CSS"],
    metric: "Live Production",
    url: "https://www.cranberridiamonds.in",
    accent: "from-emerald-400/30 via-sky-400/35 to-blue-500/35",
    status: "live",
  },
  {
    title: "Mothers Aura Diamonds",
    category: "E-Commerce Platform",
    description:
      "Premium diamond e-commerce solution featuring advanced admin controls, employee management, and seamless customer experience. Enterprise-grade infrastructure and robust feature set.",
    image:
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=1200&h=800&fit=crop",
    tags: ["Next.js", "Prisma ORM", "PostgreSQL", "AWS S3", "AWS EC2", "Tailwind CSS"],
    metric: "Live Production",
    url: "https://www.mothersauradiamonds.com",
    accent: "from-amber-400/30 via-orange-500/35 to-rose-500/35",
    status: "live",
  },
  {
    title: "Humjoli",
    category: "Event Management",
    description:
      "Comprehensive event management platform designed to streamline event planning, booking, and coordination. Built with modern web technologies for seamless user experience.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=800&fit=crop",
    tags: ["Next.js", "PostgreSQL", "AWS S3", "AWS EC2", "Tailwind CSS"],
    metric: "In Development",
    url: null,
    accent: "from-pink-400/30 via-fuchsia-500/35 to-violet-500/35",
    status: "development",
  },
  {
    title: "DataLab",
    category: "Course Platform",
    description:
      "Advanced course selling platform with infrastructure-as-code deployment. Scalable architecture for educational content delivery and management.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop",
    tags: ["Next.js", "Terraform", "AWS S3", "AWS EC2", "Infrastructure as Code"],
    metric: "In Development",
    url: null,
    accent: "from-indigo-400/30 via-blue-500/35 to-cyan-400/35",
    status: "development",
  },
];





