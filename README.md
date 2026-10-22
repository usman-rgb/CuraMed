# CuraMed - Modern Clinic & Healthcare Web Platform

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**CuraMed** is a state-of-the-art, fully responsive modern healthcare clinic web application built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM**. Designed with rich aesthetics, patient booking capabilities, and an administrative control portal.

---

## 🌟 Key Features

- **🎨 Modern Aesthetic & Pixel-Perfect Design**: Custom medical palette (Deep Teal `#085854`, Warm Sage `#e9f2ef`, Amber `#e08a3c`, and Coral accents).
- **📱 100% Mobile Responsive**: Seamlessly adapts to smartphones, tablets, laptops, and ultra-wide screens.
- **📅 Patient Appointment Booking System**:
  - Live doctor consultation booking with interactive form validation.
  - Time-slot selection, service selector, and doctor assignment.
- **🛡️ Secure Admin Portal (`/admin`)**:
  - Protected with session authentication via secure cookies.
  - Live statistics dashboard (total bookings, confirmed, pending, revenue overview).
  - Appointments management: filter by status, search by patient name/email/phone, change status (`PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`).
  - Clinic services CRUD: dynamically add, edit, or delete offered clinical services.
  - One-click CSV export of appointment records.
- **🩺 Interactive Pages**:
  - **Home**: Hero section with quick booking widget, service highlights, stats counter, patient reviews, and partners.
  - **Services (`/services`)**: Comprehensive overview of medical departments & procedures.
  - **About Us (`/about`)**: Clinic history, values, and doctor team profiles.
  - **Contact (`/contact`)**: Emergency contacts, clinic location, working hours, and query form.
  - **Book Appointment (`/appointment`)**: Dedicated full-page booking experience.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & React Server Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Lucide Icons](https://lucide.dev/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Database & ORM**: [Prisma ORM](https://www.prisma.io/) with SQLite (configurable to PostgreSQL / Neon / Supabase for production)

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/usman-rgb/CuraMed.git
cd CuraMed
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"
ADMIN_SECRET="curamed_secure_token_secret_2026"
```

### 4. Initialize Database
```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

### 5. Run the development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the website.
Visit [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin portal.

---

## 🔐 Admin Portal Credentials (Default)

- **URL**: `/admin`
- **Username**: `admin`
- **Password**: `admin123`

---

## 🌐 Deploying to Vercel

1. Push your code to your GitHub repository: `https://github.com/usman-rgb/CuraMed`.
2. Go to [Vercel Dashboard](https://vercel.com/) and click **"Add New"** > **"Project"**.
3. Import the `CuraMed` repository.
4. Under **Environment Variables**, add:
   - `DATABASE_URL`: `file:./dev.db` (or a hosted PostgreSQL URL like Supabase/Neon for persistent cloud DB)
   - `ADMIN_USERNAME`: `admin`
   - `ADMIN_PASSWORD`: your secure password (e.g. `admin123`)
   - `ADMIN_SECRET`: a random secure string (e.g. `curamed_secure_token_secret_2026`)
5. Click **Deploy**. Vercel will run `prisma generate` and build the Next.js application automatically!

---

## 📄 License
This project is open-source and available under the MIT License.
