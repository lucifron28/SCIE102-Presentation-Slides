# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Science Presentation: Populations, Communities & Metapopulations

An interactive educational presentation built with React, TypeScript, and Framer Motion covering ecological concepts of populations, communities, metapopulations, and measurement methods.

## 🚀 Features

- **Interactive Quizzes**: Multiple choice quizzes with letter-based answers (A, B, C, D)
- **Prompt Questions**: Engaging discussion prompts throughout the presentation
- **Visual Simulations**: Interactive components for quadrat sampling and mark-recapture methods
- **Responsive Design**: Works on desktop and mobile devices
- **Keyboard Navigation**: Full support for arrow key navigation
- **Accessibility**: Screen reader friendly with proper ARIA labels

## 📋 Presentation Outline

1. **Title Slide** - Introduction and overview
2. **Populations and Communities Overview** - Key definitions and concepts
3. **Population Factors** - Biotic and abiotic factors affecting populations
4. **Population Dynamics** - How populations change over time
5. **Factor Selector Interactive** - Explore different environmental factors
6. **Community Definition** - Understanding ecological communities
7. **Predator-Prey Relationships** - Evolutionary arms race dynamics
8. **Metapopulations** - Connected populations across landscapes
9. **Quadrat Method** - Interactive simulation for plant population sampling
10. **Mark-Recapture Method** - Statistical population estimation technique
11-15. **Topic Quizzes** - Comprehensive assessment of learned concepts

## 🛠️ Technology Stack

- **React 19.1.1** - Component-based UI framework
- **TypeScript** - Type safety and enhanced developer experience
- **Framer Motion 12.23.12** - Smooth animations and transitions
- **Tailwind CSS 4.0.0** - Utility-first styling framework
- **Vite 7.1.2** - Fast build tool and development server

## 💻 Development

### Prerequisites
- Node.js (v18 or higher)
- npm

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment to Vercel

This project is ready for deployment to Vercel:

### Option 1: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: Deploy via Git Integration
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the configuration and deploy

### Deployment Configuration
The project includes a `vercel.json` configuration file with optimal settings:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## 📁 Project Structure

```
src/
├── App.tsx              # Main presentation component
├── main.tsx            # Application entry point
├── index.css           # Global styles and accessibility features
├── vite-env.d.ts       # Vite type definitions
├── assets/
│   └── images/         # Educational images
│       ├── abiotic-factor.png
│       ├── biotic-factor.png
│       ├── ecosystem-community.png
│       ├── predator-vs-prey.png
│       └── species-interaction.png
└── components/         # Reusable components (future refactoring)
    ├── TitleSlide.tsx
    └── OverviewSlide.tsx
```

## 🎮 Usage Instructions

### Navigation
- **Arrow Keys**: Navigate between slides (Left/Right arrows)
- **Escape**: Cancel prompts and return to normal navigation
- **Enter/Space**: Continue from prompt questions

### Interactive Elements
- **Quizzes**: Click on answer choices (A, B, C, D) or use keyboard
- **Simulations**: Click buttons to interact with quadrat and mark-recapture simulations
- **Factor Selector**: Toggle between biotic and abiotic factors

## 🎨 Design Features

- **Responsive Layout**: Adapts to different screen sizes
- **High Contrast Support**: Respects user's contrast preferences
- **Reduced Motion**: Honors prefers-reduced-motion settings
- **Dark Theme**: Professional dark gradient backgrounds
- **Visual Hierarchy**: Clear typography and spacing

## 📱 Mobile Support

The presentation is fully responsive and includes:
- Touch-friendly interface
- Optimized text sizes for mobile
- Responsive grid layouts
- Mobile-specific spacing adjustments

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### Customization
- **Colors**: Modify Tailwind classes in components
- **Content**: Update slide content in `App.tsx`
- **Images**: Replace images in `src/assets/images/`

## 📄 License

This educational presentation is created for academic purposes.

## 🤝 Contributing

This is an educational project. For improvements or suggestions, please create an issue or submit a pull request.

---

**Ready for deployment!** 🚀

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
