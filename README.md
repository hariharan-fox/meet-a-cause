# Meet A Cause - Volunteer Matching Platform

This application is a modern, feature-rich web platform designed to connect volunteers with non-governmental organizations (NGOs). It provides a seamless experience for users to find volunteering opportunities, track their contributions, and engage with a community of change-makers.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Component Library:** [ShadCN/UI](https://ui.shadcn.com/)
- **Generative AI:** [Genkit (Google AI)](https://firebase.google.com/docs/genkit)
- **Authentication:** Mocked client-side authentication (easily replaceable with Firebase Auth).
- **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)

---

## Project Structure

```
/
├── src/
│   ├── app/                # Main application routes (pages)
│   │   ├── (auth)/         # Auth-related pages (Login, Signup)
│   │   ├── events/         # Event listing and detail pages
│   │   ├── ngos/           # NGO listing and detail pages
│   │   ├── notifications/  # User notifications page
│   │   ├── settings/       # User profile and settings page
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main dashboard page
│   │
│   ├── ai/                 # Genkit AI configuration and flows
│   │   ├── flows/          # Specific AI-powered workflows
│   │   └── genkit.ts       # Genkit initialization
│   │
│   ├── components/         # Reusable React components
│   │   ├── layout/         # Layout components (Header, Sidebar, Footer)
│   │   ├── shared/         # Components shared across multiple pages
│   │   └── ui/             # ShadCN UI components
│   │
│   ├── hooks/              # Custom React hooks (e.g., useToast)
│   │
│   └── lib/                # Libraries, helpers, and data
│       ├── auth-context.tsx # Mock authentication logic
│       ├── placeholder-data.ts # Mock data for the application
│       ├── placeholder-images.ts # Mock image data configuration
│       ├── types.ts        # TypeScript type definitions
│       └── utils.ts        # Utility functions
│
├── public/                 # Static assets
└── tailwind.config.ts      # Tailwind CSS configuration
```

---

## Key Features & Functionality

### 1. Authentication

- **Location:** `src/lib/auth-context.tsx`, `src/app/(auth)/**`
- **Description:** A mock authentication system using React Context and `localStorage` to simulate user login, signup, and session persistence. It's designed to be easily swappable with a real authentication provider like Firebase Authentication. The `ClientLayout` component handles route protection.

### 2. Dashboard

- **Location:** `src/app/page.tsx`
- **Description:** The central hub for logged-in users. It features:
    - A welcome message and user avatar.
    - A dynamic carousel highlighting featured events.
    - Key statistics (hours logged, events completed, badges earned).
    - Sections for featured events and NGOs.
    - A list of the user's upcoming commitments.

### 3. Event Discovery

- **Location:** `src/app/events/**`
- **Description:** Users can browse, search, and filter volunteering opportunities.
    - **Events Page (`/events`):** Displays all available events in a card format. Includes a collapsible filter section for searching by keyword, cause, and location.
    - **Event Detail Page (`/events/[id]`):** Provides comprehensive information about a specific event, including a description, skills needed, and details about the organizing NGO.

### 4. NGO Profiles

- **Location:** `src/app/ngos/**`
- **Description:** A directory of participating NGOs.
    - **NGOs Page (`/ngos`):** A filterable list of all NGOs, showcasing their name, mission, and cause.
    - **NGO Detail Page (`/ngos/[id]`):** A profile page for each NGO, detailing their mission, impact, contact information, and a list of their upcoming events.

### 5. My Impact & Gamification

- **Location:** `src/app/my-impact/page.tsx`
- **Description:** A gamified experience to motivate volunteers. This page displays a collection of badges that users can earn by completing various milestones (e.g., logging hours, completing events, volunteering for specific causes). It shows both earned and unearned badges.

### 6. AI-Powered Recommendations

- **Location:** `src/app/actions.ts`, `src/ai/flows/recommend-events-based-on-skills.ts`
- **Description:** A form where users can input their skills to receive AI-driven event recommendations.
    - The `getRecommendedEvents` Server Action calls a Genkit flow.
    - The `recommendEventsBasedOnSkillsFlow` uses a Google AI model to analyze the user's skills and suggest relevant events from the mock data.

### 7. Notifications

- **Location:** `src/app/notifications/page.tsx`
- **Description:** A dedicated page that lists all user notifications, such as new badges unlocked or event reminders. It distinguishes between read and unread messages.

### 8. User Settings

- **Location:** `src/app/settings/page.tsx`
- **Description:** A page where users can manage their profile information (name, photo) and account settings (password, logout, delete account). It also includes a history of their completed events.

### 9. Responsive Layout

- **Location:** `src/components/layout/**`
- **Description:** The application is fully responsive.
    - **Desktop:** A three-column layout with a persistent sidebar for navigation.
    - **Mobile:** The sidebar is replaced by a `BottomNav` component for easy access to key pages. The main header provides access to notifications and the user profile menu.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Running the Development Server

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the Next.js app:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002`.

### Running the AI (Genkit) Environment

To use the AI-powered features, you need to run the Genkit development server in a separate terminal.

1.  **Set up your Google AI API Key:**
    - Create a `.env` file in the project root.
    - Add your API key: `GEMINI_API_KEY=your_api_key_here`

2.  **Run the Genkit server:**
    ```bash
    npm run genkit:dev
    ```
    This starts the Genkit development UI, typically at `http://localhost:4000`, where you can inspect and test your AI flows.
