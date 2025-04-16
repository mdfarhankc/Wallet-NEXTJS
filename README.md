# 💰 Wallet App

A simple, clean personal finance management app built with **Next.js 15**, **App Router**, **Prisma**, and **ShadCN UI**. Track your accounts, categories, tags, and manage your user profile with ease.

---

## 📦 Tech Stack

- **Frontend**: NextJS 15 with App Router
- **UI Components**: Tailwind CSS + ShadCN UI
- **Backend**: Server Actions , NextJS Public API
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: Authjs
- **Forms**: React hook forms
- **Validation**: Zod

---

## ⚙️ Features

- ✅ Authentication & User Sessions
- ✅ User Profile with Editable Info
- ✅ Account Management (CRUD)
- ✅ Category & Tag Management (CRUD)
- ✅ Currency Selector
- ✅ Optimistic UI with Suspense & Skeleton Loaders
- ✅ Delete Profile with all related data
- ✅ Local caching and fetching hooks
- ✅ Transaction management

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
    git clone https://github.com/mdfarhankc/Wallet-NEXTJS.git
    cd Wallet-NEXTJS
```

### 2. Install dependencies

```bash
    bun install
    # or
    npm install
    # or
    yarn
```

### 2. Copy and enter Environment Variables

```bash
    cp .env.sample .env
```

### 4. Database Setup
Make sure PostgreSQL is running and accessible.

Push Prisma schema to the database:
```bash
    npx prisma db push
```
(Optional: to generate migrations)
```bash
    npx prisma migrate dev --name init
```
Generate Prisma Client:
```bash
    npx prisma generate
```

### 4. Run the App

#### 4.1. Run the development server:

```bash
    bun run dev
    # or
    npm run dev
    # or
    yarn dev
```

#### 4.2. Run the production server:

##### 4.2.1. Build the app:

```bash
     bun run build
    # or
    npm run build
    # or
    yarn build
```

##### 4.2.1. Start the app:

```bash
    bun start
    # or
    npm start
    # or
    yarn start
```
---

## 📄 License

This project is licensed under the MIT License.  
You are free to use, modify, and distribute this software with attribution.

See the [LICENSE](./LICENSE) file for more details.