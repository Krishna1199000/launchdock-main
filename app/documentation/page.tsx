"use client";

import { useState } from "react";
import { 
  BookOpen, 
  Code, 
  Rocket, 
  Zap, 
  Shield, 
  Globe, 
  Database, 
  Settings,
  ArrowRight,
  ChevronRight,
  Search,
  FileText,
  Terminal,
  Layers,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Key,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

const docSections = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Rocket,
    color: "from-emerald-400/20 via-sky-400/25 to-blue-500/25",
    borderColor: "border-emerald-400/30",
    items: [
      {
        title: "Quick Start Guide",
        description: "Get up and running with LaunchDock in minutes",
        content: `# Quick Start Guide

Welcome to LaunchDock! This guide will help you get started quickly.

## Installation

\`\`\`bash
npm install @launchdock/core
\`\`\`

## Basic Setup

\`\`\`typescript
import { LaunchDock } from '@launchdock/core';

const app = new LaunchDock({
  apiKey: 'your-api-key',
  environment: 'production'
});

app.initialize();
\`\`\`

## Next Steps

1. Configure your project settings
2. Set up authentication
3. Deploy your first application
      `,
        code: `npm install @launchdock/core`,
      },
      {
        title: "Authentication Setup",
        description: "Learn how to set up authentication for your project",
        content: `# Authentication Setup

LaunchDock provides secure authentication out of the box.

## Environment Variables

\`\`\`env
LAUNCHDOCK_API_KEY=your_api_key
LAUNCHDOCK_SECRET=your_secret
JWT_SECRET=your_jwt_secret
\`\`\`

## Implementation

\`\`\`typescript
import { Auth } from '@launchdock/auth';

const auth = new Auth({
  secret: process.env.JWT_SECRET
});

// Sign up
await auth.signUp({
  email: 'user@example.com',
  password: 'securepassword'
});

// Sign in
const token = await auth.signIn({
  email: 'user@example.com',
  password: 'securepassword'
});
\`\`\`
      `,
        code: `const auth = new Auth({ secret: process.env.JWT_SECRET });`,
      },
      {
        title: "First Deployment",
        description: "Deploy your first application to production",
        content: `# First Deployment

Deploy your application with a single command.

## Prerequisites

- Git repository initialized
- LaunchDock CLI installed
- API credentials configured

## Deploy Command

\`\`\`bash
launchdock deploy --env production
\`\`\`

## Deployment Process

1. Build your application
2. Run tests automatically
3. Deploy to production
4. Monitor with built-in analytics
      `,
        code: `launchdock deploy --env production`,
      },
    ],
  },
  {
    id: "api-reference",
    title: "API Reference",
    icon: Code,
    color: "from-indigo-400/20 via-purple-400/25 to-pink-500/25",
    borderColor: "border-indigo-400/30",
    items: [
      {
        title: "REST API",
        description: "Complete REST API documentation",
        content: `# REST API Reference

LaunchDock provides a comprehensive REST API for all operations.

## Base URL

\`\`\`
https://api.launchdock.me/v1
\`\`\`

## Authentication

All API requests require authentication via Bearer token:

\`\`\`bash
curl -H "Authorization: Bearer YOUR_TOKEN" \\
     https://api.launchdock.me/v1/projects
\`\`\`

## Endpoints

### Projects

\`\`\`http
GET /projects
POST /projects
GET /projects/:id
PATCH /projects/:id
DELETE /projects/:id
\`\`\`

### Users

\`\`\`http
GET /users
GET /users/:id
PATCH /users/:id
\`\`\`
      `,
        code: `GET /api/v1/projects`,
      },
      {
        title: "GraphQL API",
        description: "Query data with GraphQL",
        content: `# GraphQL API

LaunchDock supports GraphQL for flexible data queries.

## Endpoint

\`\`\`
https://api.launchdock.me/graphql
\`\`\`

## Example Query

\`\`\`graphql
query GetProjects {
  projects {
    id
    name
    status
    createdAt
    team {
      id
      name
    }
  }
}
\`\`\`

## Mutations

\`\`\`graphql
mutation CreateProject($input: ProjectInput!) {
  createProject(input: $input) {
    id
    name
    status
  }
}
\`\`\`
      `,
        code: `query GetProjects { projects { id name } }`,
      },
      {
        title: "Webhooks",
        description: "Set up webhooks for real-time events",
        content: `# Webhooks

Receive real-time notifications about events in your projects.

## Supported Events

- \`project.created\`
- \`project.updated\`
- \`deployment.completed\`
- \`payment.succeeded\`

## Webhook Payload

\`\`\`json
{
  "event": "project.created",
  "data": {
    "id": "proj_123",
    "name": "My Project",
    "createdAt": "2025-01-15T10:00:00Z"
  },
  "timestamp": "2025-01-15T10:00:00Z"
}
\`\`\`
      `,
        code: `POST /webhooks`,
      },
    ],
  },
  {
    id: "guides",
    title: "Guides",
    icon: BookOpen,
    color: "from-amber-400/20 via-orange-400/25 to-rose-500/25",
    borderColor: "border-amber-400/30",
    items: [
      {
        title: "Building Your First App",
        description: "Step-by-step guide to building your first application",
        content: `# Building Your First App

This guide walks you through building a complete application.

## Step 1: Project Setup

\`\`\`bash
mkdir my-app
cd my-app
npm init -y
npm install @launchdock/core
\`\`\`

## Step 2: Create Your App

\`\`\`typescript
// app.ts
import { LaunchDock } from '@launchdock/core';

const app = new LaunchDock();

app.get('/', (req, res) => {
  res.json({ message: 'Hello from LaunchDock!' });
});

app.listen(3000);
\`\`\`

## Step 3: Deploy

\`\`\`bash
launchdock deploy
\`\`\`
      `,
        code: `const app = new LaunchDock();`,
      },
      {
        title: "Database Integration",
        description: "Connect and use databases in your projects",
        content: `# Database Integration

LaunchDock supports multiple database systems.

## PostgreSQL

\`\`\`typescript
import { Database } from '@launchdock/database';

const db = new Database({
  type: 'postgresql',
  url: process.env.DATABASE_URL
});

// Query
const users = await db.query('SELECT * FROM users');

// Transaction
await db.transaction(async (tx) => {
  await tx.insert('users', { name: 'John' });
  await tx.insert('posts', { userId: 1, title: 'Hello' });
});
\`\`\`

## MongoDB

\`\`\`typescript
const db = new Database({
  type: 'mongodb',
  url: process.env.MONGODB_URL
});

const users = await db.collection('users').find({});
\`\`\`
      `,
        code: `const db = new Database({ type: 'postgresql' });`,
      },
      {
        title: "Authentication & Security",
        description: "Implement secure authentication in your apps",
        content: `# Authentication & Security

LaunchDock provides built-in security features.

## JWT Authentication

\`\`\`typescript
import { Auth } from '@launchdock/auth';

const auth = new Auth();

// Generate token
const token = auth.generateToken({ userId: 123 });

// Verify token
const payload = auth.verifyToken(token);
\`\`\`

## Role-Based Access Control

\`\`\`typescript
app.use(auth.middleware());

app.get('/admin', auth.requireRole('admin'), (req, res) => {
  res.json({ message: 'Admin access granted' });
});
\`\`\`
      `,
        code: `const token = auth.generateToken({ userId: 123 });`,
      },
    ],
  },
  {
    id: "examples",
    title: "Examples",
    icon: Layers,
    color: "from-cyan-400/20 via-blue-400/25 to-indigo-500/25",
    borderColor: "border-cyan-400/30",
    items: [
      {
        title: "Todo App",
        description: "Complete todo application example",
        content: `# Todo App Example

A full-featured todo application built with LaunchDock.

## Features

- Create, read, update, delete todos
- User authentication
- Real-time updates
- Persistent storage

## Code Example

\`\`\`typescript
import { LaunchDock } from '@launchdock/core';
import { Database } from '@launchdock/database';

const app = new LaunchDock();
const db = new Database();

// Get todos
app.get('/todos', async (req, res) => {
  const todos = await db.query('SELECT * FROM todos WHERE userId = ?', [req.user.id]);
  res.json(todos);
});

// Create todo
app.post('/todos', async (req, res) => {
  const { title, description } = req.body;
  const todo = await db.insert('todos', {
    title,
    description,
    userId: req.user.id,
    completed: false
  });
  res.json(todo);
});
\`\`\`
      `,
        code: `app.get('/todos', async (req, res) => { ... });`,
      },
      {
        title: "E-Commerce API",
        description: "Build an e-commerce backend",
        content: `# E-Commerce API Example

Complete e-commerce backend with payments, inventory, and orders.

## Features

- Product management
- Shopping cart
- Payment processing
- Order management

## Implementation

\`\`\`typescript
// Products
app.get('/products', async (req, res) => {
  const products = await db.query('SELECT * FROM products');
  res.json(products);
});

// Add to cart
app.post('/cart', async (req, res) => {
  const { productId, quantity } = req.body;
  await db.insert('cart_items', {
    userId: req.user.id,
    productId,
    quantity
  });
  res.json({ success: true });
});

// Checkout
app.post('/checkout', async (req, res) => {
  const order = await processCheckout(req.user.id);
  res.json(order);
});
\`\`\`
      `,
        code: `app.post('/checkout', async (req, res) => { ... });`,
      },
    ],
  },
];

const quickLinks = [
  { title: "API Keys", icon: Key, href: "#api-keys" },
  { title: "Rate Limits", icon: Zap, href: "#rate-limits" },
  { title: "Error Codes", icon: AlertCircle, href: "#errors" },
  { title: "SDKs", icon: Code, href: "#sdks" },
];

export default function DocumentationPage() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredSections = docSections.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(section => section.items.length > 0);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-20 sm:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 mb-6 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
            >
              <Sparkles className="w-4 h-4" />
              Documentation
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground"
            >
              Build with{" "}
              <span className="bg-gradient-to-r from-primary via-sky-400 to-violet-500 bg-clip-text text-transparent">
                Confidence
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8"
            >
              Comprehensive guides, API references, and examples to help you build amazing products.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative max-w-2xl mx-auto"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="relative z-10 py-12 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="sticky top-24 space-y-2"
              >
                {docSections.map((section, index) => {
                  const Icon = section.icon;
                  return (
                    <motion.button
                      key={section.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      onClick={() => {
                        setSelectedSection(selectedSection === section.id ? null : section.id);
                        setSelectedItem(null);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                        selectedSection === section.id
                          ? "bg-primary/10 border border-primary/30 text-primary"
                          : "bg-card/50 border border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-semibold">{section.title}</span>
                      <ChevronRight
                        className={`w-4 h-4 ml-auto transition-transform ${
                          selectedSection === section.id ? "rotate-90" : ""
                        }`}
                      />
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {filteredSections.map((section) => {
                  if (selectedSection !== section.id) return null;
                  
                  return (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      {section.items.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-6 rounded-2xl border ${section.borderColor} bg-gradient-to-br ${section.color} backdrop-blur-sm cursor-pointer transition-all hover:shadow-xl hover:shadow-primary/10`}
                          onClick={() => setSelectedItem(selectedItem === index ? null : index)}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                                {item.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                {item.description}
                              </p>
                              {item.code && (
                                <div className="relative group">
                                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/80 border border-border/50">
                                    <code className="text-sm text-foreground font-mono">
                                      {item.code}
                                    </code>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        copyToClipboard(item.code, `${section.id}-${index}`);
                                      }}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded hover:bg-secondary"
                                    >
                                      {copiedCode === `${section.id}-${index}` ? (
                                        <Check className="w-4 h-4 text-emerald-500" />
                                      ) : (
                                        <Copy className="w-4 h-4 text-muted-foreground" />
                                      )}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                            <ChevronRight
                              className={`w-5 h-5 text-muted-foreground transition-transform ${
                                selectedItem === index ? "rotate-90" : ""
                              }`}
                            />
                          </div>

                          <AnimatePresence>
                            {selectedItem === index && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-6 pt-6 border-t border-border/50"
                              >
                                <div className="prose prose-invert max-w-none">
                                  <pre className="bg-background/80 p-4 rounded-lg border border-border/50 overflow-x-auto">
                                    <code className="text-sm text-foreground whitespace-pre-wrap">
                                      {item.content}
                                    </code>
                                  </pre>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Default State */}
              {!selectedSection && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Select a category to get started
                  </h3>
                  <p className="text-muted-foreground">
                    Choose a documentation section from the sidebar to view guides and examples.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
              Quick Links
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.title}
                    href={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="flex items-center gap-4 p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{link.title}</h3>
                      <p className="text-sm text-muted-foreground">Learn more</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 py-20"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-sky-500/5 to-violet-500/10 border border-primary/20"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Need Help?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#contact">
                <Button variant="hero" size="lg" className="group">
                  Contact Support
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button variant="hero-outline" size="lg" className="group">
                  View Case Studies
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

