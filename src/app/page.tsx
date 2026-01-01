"use client";

import { ImageUpload } from "@/components/features/image-upload";
import { Button } from "@/components/ui/button";
import { GeneratedContent } from "@/types";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, BarChart3, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (selectedFile: File) => {
    setFile(selectedFile);
    setIsGenerating(true);
    setResult(null);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.status === 401) {
        // Unauthorized - redirect to login
        window.location.href = "/login?error=Please login to generate";
        return;
      }

      if (data.success) {
        setResult(data.data);
      } else {
        console.error("Generation failed:", data.error);
        alert(data.error || "Failed to generate description. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Check console for details.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `${result.title}\n\n${result.description}\n\nFeatures:\n${result.features.join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden selection:bg-primary/20">

      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center pt-12 pb-24 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 border border-secondary text-secondary-foreground text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Powered by Gemini 1.5 Pro Vision
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            Transform Images into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-primary to-purple-400">
              Selling Content
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Upload your product photo and let our AI agents craft SEO-optimized,
            high-converting descriptions in seconds.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Button size="lg" className="rounded-full h-12 px-8 text-base" asChild>
              <Link href="/login">
                Start Generating <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full h-12 px-8 text-base bg-background/50 backdrop-blur-sm" asChild>
              <Link href="/demo">
                View Demo
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Interactive Demo Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full max-w-6xl mx-auto mt-16 p-1 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"
        >
          <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-[22px] p-8 md:p-12 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-6 text-left">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Try it right now</h3>
                  <p className="text-muted-foreground">Upload a product image to see the magic happen.</p>
                </div>
                <ImageUpload
                  onImageSelected={handleGenerate}
                  isGenerating={isGenerating}
                />
                {file && !isGenerating && !result && (
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                    Analyzing {file.name}...
                  </div>
                )}
              </div>

              <div className="relative h-full min-h-[400px] bg-background/50 rounded-xl border border-white/5 p-6 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <span className="font-semibold">AI Output</span>
                  </div>
                  {result && (
                    <Button size="sm" variant="ghost" className="h-8" onClick={copyToClipboard}>
                      {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  )}
                </div>

                {result ? (
                  <div className="space-y-4 text-left overflow-y-auto max-h-[400px] pr-2 scrollbar-thin scrollbar-thumb-muted-foreground/20">
                    <div>
                      <h4 className="text-lg font-bold text-primary">{result.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{result.priceEstimate}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {result.description}
                    </p>

                    <div className="space-y-2">
                      <h5 className="font-medium text-sm text-foreground">Key Features:</h5>
                      <ul className="grid grid-cols-1 gap-1">
                        {result.features.map((feature, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {result.tags.map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 flex-1 opacity-50">
                    <div className="h-6 w-3/4 bg-white/5 rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-white/5 rounded animate-pulse" />
                    <div className="space-y-2 pt-4">
                      <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                      <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                      <div className="h-4 w-5/6 bg-white/5 rounded animate-pulse" />
                    </div>
                    <div className="pt-4 space-y-2">
                      <div className="h-20 w-full bg-white/5 rounded animate-pulse" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Sparkles, title: "Vision AI Analysis", desc: "Detects materials, colors, and styles automatically." },
            { icon: Zap, title: "Instant Descriptions", desc: "Generate 10+ variations in milliseconds." },
            { icon: BarChart3, title: "SEO Optimized", desc: "Keywords tailored for Google, Amazon, and Shopify." }
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-2xl bg-secondary/5 border border-white/5 hover:border-primary/20 transition-colors">
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />

    </main >
  );
}
