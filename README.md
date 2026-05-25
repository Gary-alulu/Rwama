# Rwama Coffee Platform

> *"Modern African Luxury meets Specialty Coffee Traceability."*

A luxury-grade, cinematic web platform for the **Rwama Farmers Cooperative Society** in Kirinyaga County, Kenya. The platform merges an immersive public brand experience with rigorous B2B data tools, serving global specialty coffee buyers, roasters, and cooperative members.

---

## 🌟 The Experience

The Rwama platform is built on the philosophy of **"Modern African Luxury"**. It avoids generic e-commerce layouts in favor of an editorial, documentary-style experience.

*   **Immersive Storytelling:** Cinematic hero sections, parallax scrolling, and atmospheric gradients.
*   **Intelligent Traceability:** Real-time data panels, interactive flavor radar charts, and farm-to-cup timelines.
*   **Premium Aesthetics:** Deep forest greens, rich coffee browns, warm creams, and soft gold accents. Glassmorphism UI elements with buttery-smooth Framer Motion transitions.

---

## 🚀 Key Features

*   **Cinematic Landing Page:** An immersive gateway introducing the cooperative's heritage, altitude, and global reach.
*   **Live Marketplace (`/marketplace`):** An "Apple-grade" product discovery tool. Features instantaneous, debounce-enabled search, advanced filtering (by factory, grade, status), and seamless React Query data fetching.
*   **Traceability Engine (`/traceability` & `/trace/[lotId]`):** A rigorous B2B data dashboard wrapped in luxury UI. Includes Recharts-powered Sensory Profile radars, environmental context cards, and a Framer Motion-powered interactive coffee journey timeline.
*   **Our Story (`/story`):** An emotional, documentary-style narrative page highlighting the generational wisdom of our 1,200+ farmers.
*   **Factory Showcase (`/factories`):** Deep dives into our historic washing stations (Muthigi-ini, Kimatu, Muburi) detailing their unique terroir and craftsmanship.
*   **Premium Contact Portal (`/contact`):** An elegant B2B inquiry hub featuring glassmorphic forms, interactive origin maps, and dynamic FAQs.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 14+ (App Router), React 18 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS, CSS Modules |
| **Animation** | Framer Motion |
| **Data Fetching** | TanStack React Query (`@tanstack/react-query`) |
| **Data Viz** | Recharts |
| **Icons** | Lucide React |

---

## 🎨 Design Tokens

**Colors:**
*   `primary-forest` (`#123524`): The anchor of the brand.
*   `secondary-coffee` (`#4E342E`): Richness and warmth.
*   `bg-cream` (`#F6F1E9`): Luxury background.
*   `accent-gold` (`#C8A96B`): Premium badges and highlights.

**Typography:**
*   **Headings:** `Cormorant Garamond` (Cinematic serif)
*   **Body/UI:** `Inter` (Clean, modern sans-serif)

**UI Elements:**
*   `24px` to `32px` border radii.
*   `backdrop-blur-md` (12px) glassmorphism effects.
*   Subtle `hover:scale-[1.02]` interactions and soft drop shadows.

---

## 📦 Getting Started

### Prerequisites
*   Node.js (v18.17+)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/rwama-platform.git
    cd rwama-platform
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the platform:**
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌍 About Rwama Cooperative

Located on the volcanic slopes of Mount Kenya (1,500m - 1,800m), Rwama Farmers Cooperative Society represents over 1,200 smallholder farmers. Through our three historic washing stations—Muthigi-ini, Kimatu, and Muburi—we produce fully traceable, high-scoring (85+ SCA) Kenyan Arabica coffee (SL28, SL34, Ruiru 11, Batian).

*"Every conversation begins with shared passion for exceptional coffee."*
