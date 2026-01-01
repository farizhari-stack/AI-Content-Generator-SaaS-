<div align="center">
  <h1>🚀 VisionCommerce AI</h1>
  <p><strong>Transform Product Images into High-Converting Sales Copy with AI</strong></p>
  
  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#environment-variables">Environment</a> •
    <a href="#database-setup">Database</a> •
    <a href="#roadmap">Roadmap</a>
  </p>

  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Supabase-Auth-3ecf8e?style=for-the-badge&logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/Gemini-1.5_Pro-4285f4?style=for-the-badge&logo=google" alt="Gemini AI" />
</div>

---

## ✨ Overview

VisionCommerce AI is a modern SaaS platform that leverages Google's Gemini 1.5 Pro Vision model to automatically generate premium e-commerce product descriptions from images. Simply upload a product photo, and our AI will craft SEO-optimized titles, compelling descriptions, and feature lists tailored for your target platform.

## 🎯 Features

### Core Functionality
- **🖼️ Vision AI Analysis** - Upload product images and get instant AI-powered analysis of materials, style, and key features
- **✍️ Smart Copywriting** - Generate SEO-optimized titles, descriptions, and bullet points
- **🎨 Platform Targeting** - Customize output for Amazon, Shopify, Instagram, or general SEO
- **🎭 Tone Selection** - Choose between Professional, Luxury, Friendly, or Persuasive tones

### User Management
- **🔐 Authentication** - Secure login with Google OAuth via Supabase
- **💳 Credit System** - Free tier with 3 credits, premium plans for unlimited access
- **📊 Generation History** - View and manage all your past generations

### Premium Experience
- **🌗 Theme Toggle** - Switch between dark and light modes
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile
- **⚡ Real-time Preview** - See AI results instantly in the dashboard

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4, Framer Motion |
| **Authentication** | Supabase Auth (Google OAuth) |
| **Database** | Supabase PostgreSQL |
| **AI Model** | Google Gemini 1.5 Pro Vision |
| **Icons** | Lucide React |
| **Components** | Radix UI Primitives |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Supabase account
- Google AI Studio API key

### Installation

```bash
# Clone the repository
git clone https://github.com/farizhari-stack/AI-Content-Generator-SaaS-.git

# Navigate to project directory
cd AI-Content-Generator-SaaS-

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Google Gemini AI
GOOGLE_API_KEY=your_gemini_api_key_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Stripe (Optional - for payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### How to Get API Keys

| Service | Instructions |
|---------|-------------|
| **Google Gemini** | Visit [Google AI Studio](https://aistudio.google.com/) → Get API Key |
| **Supabase** | Create project at [supabase.com](https://supabase.com) → Settings → API |
| **Stripe** | Sign up at [stripe.com](https://stripe.com) → Developers → API Keys |

## 🗄️ Database Setup

Run the following SQL in your Supabase SQL Editor to set up the required tables:

```sql
-- User profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMPTZ
);

-- User credits
CREATE TABLE user_credits (
  user_id UUID REFERENCES auth.users PRIMARY KEY,
  credits_remaining INTEGER DEFAULT 3,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Generation history
CREATE TABLE generations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT,
  description TEXT,
  features TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

-- RLS Policies (see src/lib/supabase/schema.sql for full policies)
```

> 📁 Full schema available at `src/lib/supabase/schema.sql`

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication callback
│   ├── dashboard/         # Protected dashboard pages
│   ├── demo/              # Public demo page
│   ├── login/             # Login page
│   ├── pricing/           # Pricing page
│   └── page.tsx           # Landing page
├── components/
│   ├── features/          # Feature components (ImageUpload)
│   ├── layout/            # Layout components (Navbar, Footer)
│   └── ui/                # Reusable UI components
├── controllers/           # Request handlers
├── lib/                   # Utilities and configurations
│   └── supabase/          # Supabase client setup
├── services/              # Business logic (Gemini, Credits)
└── types/                 # TypeScript type definitions
```

## 🗺️ Roadmap

- [x] Google OAuth Authentication
- [x] Credit-based usage system
- [x] Generation history
- [x] Theme toggle (Dark/Light)
- [x] Tone & Platform selection
- [ ] Stripe payment integration
- [ ] Multi-language support
- [ ] Bulk image processing
- [ ] API access for developers
- [ ] Chrome extension

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with ❤️ using Next.js and Gemini AI</p>
  <p>
    <a href="https://github.com/farizhari-stack">
      <img src="https://img.shields.io/badge/GitHub-farizhari--stack-181717?style=flat&logo=github" alt="GitHub" />
    </a>
  </p>
</div>
