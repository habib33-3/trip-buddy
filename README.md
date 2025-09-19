# Trip Buddy 🌍✈️

## Your Smart Travel Companion\*\*

Plan, track, and relive your journeys with **Trip Buddy**—a travel companion that lets you create trips, manage itineraries, visualize routes on a map, and explore your travel stats in an immersive globe view.

## ✨ Key Features

✅ **Secure Authentication** – JWT with HTTP-only cookies
✅ **Trip Management** – Create, edit, and organize trips with detailed itineraries
✅ **Interactive Map Preview** – Visualize routes and destinations
✅ **Travel Timeline** – Browse past trips with photos and notes
✅ **Stats Dashboard** – Track distances and visited countries on a 3D globe
✅ **Responsive Design** – Works on mobile, tablet, and desktop

---

## 🛠 Tech Stack

| Category     | Technologies                          |
| ------------ | ------------------------------------- |
| **Frontend** | React, TypeScript, Tailwind CSS, Vite |
| **Backend**  | Node.js, Express, Prisma              |
| **Database** | PostgreSQL                            |
| **APIs**     | Map/Globe visualization libraries     |

---

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose (v2+)
- Node.js (v18+) _(optional for local setup)_
- PNPM (v8+) _(optional for local setup)_

---

### 🐳 Run with Docker (Recommended)

**1️⃣ Development Mode (with HMR):**

```bash
# Start development containers
pnpm docker:dev

# Stop containers
pnpm docker:down

# Rebuild containers with fresh dependencies
pnpm docker:dev:rebuild
```

**Ports in development:**

- Frontend: `5173`
- Backend API: `5000`
- Prisma Studio: `5555`

**2️⃣ Production Mode (optimized build):**

```bash
# Start production containers
pnpm docker:prod

# Stop containers
pnpm docker:down
```

**Ports in production:**

- Frontend: `8080`
- Backend API: `5000`

---

### ⚡ Local Setup (Optional)

1. **Clone & Install**

```bash
git clone https://github.com/habib33-3/trip-buddy.git
cd trip-buddy
pnpm install
```

2. **Configure Environment**
   Duplicate `.env.example` to `.env` and add your credentials.

3. **Run the App Locally**

```bash
pnpm build
pnpm start
```

4. **Open in Browser**
   Visit `http://localhost:4173`

---

## 📜 License

MIT License - See [LICENSE](LICENSE).

---

### 🎯 Roadmap

- Trip sharing
- Collaborative planning
- Mobile app
- Image Sharing
- User profiles
- Admin dashboard
- Payment integration
- Analytics and reporting
- User feedback and reporting
