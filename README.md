# Cana Church Merch Store

This is a modern, self-serve church merchandise web app built with [Next.js App Router](https://nextjs.org/docs/app/building-your-application/routing) and deployed via [Vercel](https://vercel.com/). Members and visitors of Cana Church can pick up items in person at the merch counter and then complete their secure payment online through this site. No shipping or fulfillment is involved.

---

## 🚀 Features

* ⚡ **Instant Online Checkout** via Stripe Elements
* 🛍️ **In-Person Merch Pickup** model — users grab items at a physical counter and pay online
* 🎨 **Light/Dark Mode** support
* 🔍 **Search & Browse** functionality by category or keyword
* 🧾 **Auto-generated Payment Success & Failure Screens**
* 🔐 **No data stored outside Stripe** — only name and email are collected for receipt/record
* 📱 Fully responsive design using Tailwind + ShadCN UI components

---

## 🧠 Project Structure

```
src/
├── app/                 # Route structure (App Router)
│   ├── api/             # API routes (e.g. Stripe intent, product fetch)
│   ├── category/        # Category pages
│   ├── checkout/        # Stripe checkout + success/failure
│   ├── legal/           # Terms and Privacy pages
│   ├── product/         # Individual product detail pages
│   ├── search/          # Product search functionality
│
├── components/          # Reusable UI and logic components
│   ├── cart/            # Cart state and icon (if applicable)
│   ├── forms/           # Checkout forms
│   ├── home/            # Hero and landing sections
│   ├── nav/             # Header and navigation
│   ├── payment/         # Payment confirmation UIs
│   ├── products/        # Product list/grid components
│   ├── skeletons/       # Loading states
│   └── ui/              # ShadCN-based UI primitives
│
├── context/             # Global state providers (e.g. cart context)
├── lib/                 # Utility functions and API wrappers
│   └── api/             # Stripe and client API functions
├── resources/           # Fonts, images, static assets
```

---

## 🛠️ Getting Started

First, install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to use the app.

---

## 🔐 Environment Variables

This app uses Stripe — create a `.env.local` file with the following:

```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Make sure these are set in your Vercel dashboard for production.

---

## 📦 Deployment

This app is optimized for deployment via [Vercel](https://vercel.com/). Push to `main` or deploy manually through the Vercel UI.

---

## 📄 Legal

This app includes:

* `/legal/terms` – Terms of Service
* `/legal/privacy` – Privacy Policy

These pages reflect Cana Church's pickup-only model and clarify that data is stored only within Stripe.

---

## 🙌 Credits

* Built with [Next.js](https://nextjs.org/)
* UI powered by [Tailwind CSS](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com/)
* Payments via [Stripe Elements](https://stripe.com/docs/elements)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this software as long as the original license is included.

---

## ✉️ Support

For questions or support, contact Brandon from Cana Church at [brandon@canachurch.com](mailto:brandon@canachurch.com).