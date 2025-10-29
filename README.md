# Hiring Management Web App

### 🎯 Project Overview

Aplikasi ini memungkinkan Admin membuat dan mengelola lowongan kerja, serta menangani pelamar (candidates). Sementara Applicant bisa melihat lowongan yang aktif dan melamar pekerjaan dengan form yang dikonfigurasi secara dinamis. Tujuan utamanya adalah menilai kemampuan frontend dalam aspek:

- Menerjemahkan desain & PRD ke aplikasi fungsional
- Validasi form dinamis berdasarkan konfigurasi
- UX yang halus, responsif, dan pixel-perfect
- Logika sistem dan interaksi browser (modal, form, webcam, gesture)
- Fokus ke kualitas frontend, bukan hanya tampilan

### 🛠 TechStack Used

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Fetch (Data Fetching)
- Vercel (Deployment)

### 🔐 JWT Authentication (using jose)

- Mock login credentials:

**Admin**

```bash
    Email: admin@mail.com
    Password: admin123
```

**Applicant**

```bash
    Email: applicant@mail.com
    Password: user123
```

## 🚀 Live Demo

https://hiring-management-web.vercel.app

## ⚙️ Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/edoGultom/hiring-management-web
cd qubicball-frontend-test
```

2. Install dependencies:

```bash
npm install
```

3. Create **.env.local**:

```bash
    NEXT_PUBLIC_JWT_SECRET=abcd1234
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
