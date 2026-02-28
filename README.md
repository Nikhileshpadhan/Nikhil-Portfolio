# Nikhil's Portfolio 🚀

https://nikhil-portfolio-bice.vercel.app/

Welcome to the repository for my personal portfolio website! This project is a modern, responsive, and performance-optimized interactive portfolio designed to showcase my skills, projects, and professional background.

## 🎯 Project Overview

This portfolio is built to be a fast, visually engaging, and highly interactive digital resume. It features a sleek, dark-themed Neo-Brutalist/Glassmorphic design with smooth scroll-linked animations, 3D elements, and responsive layouts to ensure a premium experience across all devices.

## 🛠️ Built With

This project leverages a modern web development stack to deliver high performance and rich interactivity:

- **Frontend Framework:** [React.js](https://reactjs.org/) (with [Vite](https://vitejs.dev/) as the build tool for lightning-fast HMR)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for rapid utility-first styling and custom design tokens.
- **Animations:**
  - [Framer Motion](https://www.framer.com/motion/) for complex scroll-linked animations, page transitions, and magnetic interactions.
  - [Lenis](https://lenis.studiofreight.com/) for ultra-smooth global scrolling.
- **3D Graphics:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) & [Drei](https://github.com/pmndrs/drei) for the interactive 3D particle background in the Hero and Projects sections.
- **UI Components:** Custom components inspired by modern design trends, utilizing some structures from [shadcn/ui](https://ui.shadcn.com/).

## ✨ Key Features

- **Ultra-Smooth Scrolling:** Integration with Lenis provides a frictionless scrolling experience throughout the site.
- **Interactive 3D Backgrounds:** The Hero and Projects sections feature a dynamic, 3D particle cloud that slightly rotates and reacts to scroll.
- **Magnetic UI Elements:** Buttons and certain text elements (like the hero text) have custom magnetic pulling effects when hovered, increasing user engagement.
- **Scroll-Driven Animations:** Elements fade in, slide, and transform based on the user's scroll position using Framer Motion.
- **Custom Waves Background:** The Skills section features a highly performant, custom-built `Canvas`-based perlin noise wave animation that reacts to mouse movement.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop views, including a dedicated vertical-stack view for projects on smaller screens.
- **Glassmorphism:** Strategic use of blurred backgrounds and translucent borders to create depth and a modern aesthetic.

## 🗂️ Project Structure

The codebase is organized as follows:

```
src/
├── components/          # Reusable UI components
│   ├── About.jsx        # About me section with 3D image tilt
│   ├── Background3D.jsx # R3F Canvas for point clouds
│   ├── Contact.jsx      # Contact form with floating labels
│   ├── CustomCursor.jsx # Global custom mouse cursor
│   ├── Hero.jsx         # Landing section with magnetic text
│   ├── Navbar.jsx       # Responsive navigation bar
│   ├── Preloader.jsx    # Initial loading screen animation
│   ├── Projects.jsx     # Horizontal scroll project showcase
│   ├── Skills.jsx       # Skills section with draggable items
│   └── Waves.jsx        # Custom canvas background animation
├── Public/              # Static assets (images, resumes, etc.)
├── App.jsx              # Main application component & routing setup
├── index.css            # Global Tailwind styles & custom variables
└── main.jsx             # React DOM rendering entry point
```

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites

Ensure you have Node.js installed on your machine.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Nikhileshpadhan/Nikhil-Portfolio.git
    cd Nikhil-Portfolio
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **Open your browser:**
    Navigate to `http://localhost:5173` to see the application in action.

## 🤝 Contact

Feel free to reach out if you have any questions, want to collaborate, or just want to say hi!

- **Email:** [nikhilesh.coder@gmail.com](mailto:nikhilesh.coder@gmail.com)
- **LinkedIn:** [Nikhilesh Padhan](https://www.linkedin.com/in/nikhilesh-padhan-57b506308?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
- **GitHub:** [Nikhileshpadhan](https://github.com/Nikhileshpadhan)
