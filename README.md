# Temu Clone - Modern E-Commerce Platform 🛍️

[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)

A feature-rich Temu clone built with modern web technologies, featuring seamless integration with popular services and robust development practices.

## ✨ Key Features

- **Temu-like Interface** 📱  
  Faithful recreation of Temu's signature UI/UX patterns
- **Next.js 15 Optimization** ⚡  
  Enhanced App Router and React 19 Server Components
- **Secure Authentication** 🔐  
  Lucia Auth implementation with session management
- **Sanity CMS Integration** 📦  
  Product content management system
- **Stripe Payments** 💳  
  Complete checkout flow with payment processing
- **Wheel Of Fortune** 🎡  
  Spin the wheel to win exclusive prizes, adding a fun and engaging element to the shopping experience.

## 🛠 Technology Stack

### Core Technologies

- **Framework**: Next.js 15 (App Router)
- **UI Components**: Shadcn UI + Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod

### Backend Services

- **Authentication**: Lucia Auth
- **CMS**: Sanity.io
- **Database**: Vercel Storage (Neon)
- **Payment**: Stripe API
- **Deployment**: Vercel

## 🖥 Development Setup

### Prerequisites

- Node.js 18+
- npm 9+
- Sanity CLI
- Stripe Account

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/TamerlanK/temu-clone-next15.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd temu-clone-next15
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   - Copy the `.env.example` file to `.env.local`:

     ```bash
     cp .env.example .env.local
     ```

   - Open `.env.local` and fill in the required environment variables (e.g., Stripe API keys, Sanity project ID, etc.).

5. **Run the development server:**

   - In the root project directory, start the Next.js development server:

     ```bash
     npm run dev
     ```

   - The application should now be running on `http://localhost:3000`.

6. **Set up Stripe (optional):**

   - If you want to test the payment flow, make sure you have a Stripe account and configure the Stripe webhook to point to your local environment using a tool like [ngrok](https://ngrok.com/).

7. **Build and run the project for production:**

   - To build the project for production:

     ```bash
     npm run build
     ```

   - To start the production server:

     ```bash
     npm start
     ```

## 🚀 Deployment

- **Vercel**: The project is optimized for deployment on Vercel. Simply connect your GitHub repository to Vercel, and it will automatically detect the Next.js project and deploy it.

- **Environment Variables**: Make sure to add all required environment variables in the Vercel dashboard under the "Environment Variables" section.

Enjoy building your Temu clone! 🚀
