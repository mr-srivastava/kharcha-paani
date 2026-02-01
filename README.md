# KharchaPaani 💰

[![Netlify Status](https://api.netlify.com/api/v1/badges/259060ed-778a-427a-b4ba-f17142fb1ef7/deploy-status)](https://app.netlify.com/sites/kharcha-paani/deploys)

A modern expense splitting application that makes group expense management effortless. No more fussing with change, misplaced receipts, or arguments about amounts. Simply enter your spending, and KharchaPaani will calculate who owes what to whom.

## ✨ Features

- **Group Management**: Create and manage multiple expense groups
- **Expense Tracking**: Add and track expenses with detailed information
- **Smart Calculations**: Automatically calculate who owes whom
- **Multi-Currency Support**: Handle expenses in different currencies
- **Modern UI**: Beautiful, responsive interface with smooth animations
- **Real-time Updates**: Instant synchronization across all devices

## 🚀 Tech Stack

- **Frontend Framework**: React 18.3
- **Build Tool**: Vite 5.4
- **Language**: TypeScript 5.5
- **Styling**: Tailwind CSS 3.4
- **State Management**: Zustand 4.5
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React & React Icons
- **Routing**: React Router DOM 6.26

## 📋 Prerequisites

- Node.js >= 22.0.0
- npm >= 10.0.0

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kharcha-paani.git
cd kharcha-paani
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open automatically at `http://localhost:3000`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking

## 🏗️ Project Structure

```
kharcha-paani/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── AddExpense/
│   │   ├── ExpenseTable/
│   │   ├── GroupCard/
│   │   ├── GroupModal/
│   │   ├── NavBar/
│   │   └── ui/         # Shadcn UI components
│   ├── pages/          # Page components
│   │   ├── Groups/
│   │   ├── GroupPage/
│   │   └── LandingPage/
│   ├── store/          # Zustand state management
│   ├── utils/          # Utility functions
│   ├── assets/         # Images and static assets
│   └── styles/         # Global styles
├── public/             # Static files
└── vite.config.ts      # Vite configuration
```

## 🎨 Design System

The application uses a custom design system with:
- **Color Palette**: Navy and teal theme with carefully selected shades
- **Typography**: Playfair Display (serif) and DM Sans (sans-serif)
- **Animations**: Smooth fade-in, slide-up, and scale-in effects
- **Shadows**: Custom glow effects for interactive elements

## 🌐 Deployment

The application is automatically deployed to Netlify on every push to the main branch.

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.
