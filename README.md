# VisionCommerce SaaS

An AI-powered SaaS platform that generates premium e-commerce product descriptions from images using Google Gemini 1.5 Pro Vision.

![VisionCommerce Demo](https://via.placeholder.com/800x400?text=Vision+Commerce+SaaS)

## Features

- 📸 **Vision AI Analysis**: Drag & drop product images to instantly analyze material, style, and features.
- ✍️ **Smart Copywriting**: Generates SEO-optimized titles, descriptions, and feature lists.
- 🎨 **Premium UI**: Built with Next.js 14, Tailwind CSS, and Framer Motion for a sleek, dark-mode aesthetic.
- ⚡ **Real-time Preview**: See results instantly in the interactive dashboard.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS, Framer Motion, Lucide Icons
- **AI**: Google Generative AI (Gemini 1.5 Flash/Pro)
- **Backend Services**: Next.js API Routes (Serverless)

## Getting Started

1.  **Clone the repository** (if applicable) or navigate to the project folder.

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    - Rename `.env.example` to `.env.local`.
    - Add your **Google Gemini API Key** (Get it from [Google AI Studio](https://aistudio.google.com/)).
    - (Optional) Add Supabase/Stripe keys for future extensions.

    ```env
    GOOGLE_API_KEY=your_key_here
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app`: Routes and Pages.
- `src/components/features`: Complex feature components (e.g., ImageUpload).
- `src/services`: Business logic (Gemini integration).
- `src/controllers`: Request handling logic.
- `src/lib`: Utilities and configuration.

## Future Roadmap

- [ ] User Authentication (Supabase)
- [ ] Payment Integration (Stripe)
- [ ] History Dashboard (Save generated descriptions)
