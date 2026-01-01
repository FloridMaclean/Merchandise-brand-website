# CALEB CREATIONS - 3D Website

A modern, interactive 3D website for CALEB CREATIONS - a company specializing in custom bulk printing and shipping of t-shirts, hoodies, caps, mugs, tumblers, and bottles.

## Features

- 🎨 **3D Product Showcases** - Interactive 3D models using React Three Fiber
- 🚀 **Modern UI/UX** - Beautiful, responsive design with smooth animations
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Fast Performance** - Built with Vite for optimal loading times
- 🎯 **Bulk Order Focus** - Tailored for B2B bulk order inquiries

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Three Fiber** - 3D rendering library
- **Three.js** - 3D graphics library
- **Framer Motion** - Smooth animations
- **Tailwind CSS** - Utility-first CSS framework

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── 3D/
│   │   ├── TShirt3D.jsx      # 3D T-shirt model
│   │   └── Product3D.jsx     # Dynamic 3D product models
│   ├── Navbar.jsx            # Navigation bar
│   ├── Hero.jsx              # Hero section with 3D model
│   ├── Products.jsx          # Product showcase section
│   ├── About.jsx             # About/features section
│   ├── Contact.jsx           # Contact form
│   └── Footer.jsx            # Footer component
├── App.jsx                   # Main app component
├── main.jsx                  # Entry point
└── index.css                 # Global styles
```

## Product Categories

- T-Shirts
- Hoodies
- Caps
- Mugs
- Tumblers
- Bottles

## Customization

You can easily customize:
- Colors in `tailwind.config.js`
- 3D models in `src/components/3D/`
- Content in component files
- Styling with Tailwind classes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

