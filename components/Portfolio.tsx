"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { projects } from "@/lib/projects";

const useParallaxTilt = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  return { x, y, rotateX, rotateY };
};

const Portfolio = () => {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const activeProject = projects[active];
  const { x, y, rotateX, rotateY } = useParallaxTilt();

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => {
      setActive((prev) => (prev + 1) % projects.length);
    }, 4500);
    return () => clearInterval(t);
  }, [auto]);

  const duplicated = useMemo(() => [...projects, ...projects], []);

  return (
    <section id="work" className="relative overflow-hidden py-16 sm:py-20">
      {/* Background vibes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-[-10%] h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[28rem] w-[28rem] rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute inset-x-0 top-10 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_0_6px_rgba(59,130,246,0.35)]" />
              Featured Projects
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Featured work{" "}
              <span className="bg-gradient-to-r from-primary via-sky-400 to-violet-500 bg-clip-text text-transparent">
                that feels bespoke
            </span>
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
              A refined gallery with subtle motion, live spotlighting, and concise
              performance signals so the craft and impact stay front and center.
            </p>
          </div>

          <Link href="/projects">
            <Button variant="hero-outline" className="self-start md:self-auto group">
              View All Projects
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Auto-marquee rail */}
        <div className="relative mb-10 overflow-hidden rounded-3xl border border-border/70 bg-card/60 py-4 shadow-[0_18px_60px_rgba(15,23,42,0.35)]">
          <motion.div
            className="flex min-w-full"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear",
            }}
          >
            {duplicated.map((project, i) => (
              <div
                key={`${project.title}-${i}`}
                className="flex w-[18rem] shrink-0 items-center gap-3 px-5"
              >
                <span className="h-2 w-2 rounded-full bg-primary" />
                <p className="text-sm text-muted-foreground">
                  {project.title} <span className="text-primary/80">·</span>{" "}
                  {project.metric}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Layout: carousel + spotlight */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Carousel */}
          <div className="relative">
            <div className="absolute -left-10 top-10 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute -right-10 bottom-10 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl" />

            <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-card text-left shadow-[0_18px_60px_rgba(15,23,42,0.25)] transition-all duration-400 cursor-pointer ${
                    active === index ? "ring-2 ring-primary/50 ring-offset-2 ring-offset-background" : ""
                  }`}
                  onClick={() => {
                    if (project.url) {
                      window.open(project.url, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  onMouseEnter={() => {
                    setActive(index);
                    setAuto(false);
                  }}
                  onFocus={() => {
                    setActive(index);
                    setAuto(false);
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const px = (e.clientX - rect.left) / rect.width - 0.5;
                    const py = (e.clientY - rect.top) / rect.height - 0.5;
                    x.set(px);
                    y.set(py);
                  }}
                  onMouseLeave={() => {
                    x.set(0);
                    y.set(0);
                  }}
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                <img
                  src={imageErrors.has(project.title) ? "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=800&fit=crop&q=80" : project.image}
                  alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-103"
                  onError={() => {
                    setImageErrors(prev => new Set([...prev, project.title]));
                  }}
                />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

                    <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {project.category}
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-white drop-shadow-md">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-200/90 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div className={`absolute top-4 right-4 flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium text-white backdrop-blur ${
                      project.status === 'live' 
                        ? 'bg-emerald-500/20' 
                        : 'bg-amber-500/20'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        project.status === 'live' 
                          ? 'bg-emerald-400' 
                          : 'bg-amber-400'
                      }`} />
                      {project.metric}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 px-4 py-3 sm:px-5 sm:py-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary/70 px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                      Explore
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Spotlight panel with slide animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.title}
              initial={{ opacity: 0, x: 30, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative overflow-hidden rounded-[26px] border border-border/80 bg-card p-6 shadow-[0_28px_80px_rgba(15,23,42,0.35)]"
            >
              <div className="relative flex items-center justify-between gap-3 border-b border-border/70 pb-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Live spotlight
                  </p>
                  <p className="text-sm text-foreground/90">
                    {activeProject.title}
                  </p>
                </div>
                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium ring-1 ${
                  activeProject.status === 'live'
                    ? 'bg-emerald-500/10 text-emerald-300 ring-emerald-400/40'
                    : 'bg-amber-500/10 text-amber-300 ring-amber-400/40'
                }`}>
                  <span className={`h-2 w-2 rounded-full ${
                    activeProject.status === 'live'
                      ? 'bg-emerald-400'
                      : 'bg-amber-400'
                  }`} />
                  {activeProject.status === 'live' ? 'Live' : 'In Development'}
                </div>
              </div>

              <div className="relative mt-5 overflow-hidden rounded-2xl border border-border/80 bg-black/80">
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                  <motion.img
                    key={activeProject.image}
                    src={imageErrors.has(activeProject.title) ? "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=800&fit=crop&q=80" : activeProject.image}
                    alt={activeProject.title}
                    className="h-full w-full object-cover"
                    initial={{ opacity: 0.5, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    onError={() => {
                      setImageErrors(prev => new Set([...prev, activeProject.title]));
                    }}
                  />
                  <motion.div
                    className="absolute inset-x-6 bottom-6 flex items-center justify-between rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white backdrop-blur"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 items-center rounded-full bg-white/10 px-2 text-[11px] font-semibold uppercase tracking-[0.2em]">
                        {activeProject.category}
                      </span>
                      <span className="text-white/80">
                        {activeProject.metric}
                </span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-white/80" />
                  </motion.div>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                <p className="text-base font-semibold text-foreground">
                  What we shipped
                </p>
                <p>
                  {activeProject.description}
                </p>
                {activeProject.url && (
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-primary hover:text-primary/80 transition-colors"
                  >
                    Visit Website
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary/70 px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
