# Anurag Goyal - Portfolio

Modern personal portfolio web application built with **Vite**, **React**, **Tailwind CSS**, **Framer Motion**, **react-icons**, and **react-intersection-observer**.

---

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [PostCSS](https://postcss.org/) + [Autoprefixer](https://github.com/postcss/autoprefixer)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Scroll Observer**: [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer)

---

## 📁 Project Structure

```text
src/
├── assets/        # Static images, icons, and media
├── components/    # Modular section components (e.g., Hero, About, Projects, Contact)
├── data/          # Portfolio content and structured data models
├── hooks/         # Custom React hooks (e.g., useScrollSpy, useTheme)
├── App.jsx        # Main application layout and section assembly
├── index.css      # Tailwind base, components, and utilities
└── main.jsx       # React application DOM root mount
```

---

## 🚀 Getting Started

### 1. Prerequisites

Make sure you have Node.js and npm installed:

```bash
node -v
npm -v
```

### 2. Installation

Install all project dependencies:

```bash
npm install
```

### 3. Development Server

Start the local Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The app will be accessible at:
```text
http://localhost:5173/
```

### 4. Production Build

Compile and bundle the project for production:

```bash
npm run build
```

The optimized static assets will be output to the `dist/` directory.

### 5. Preview Production Build

Preview the production bundle locally:

```bash
npm run preview
```