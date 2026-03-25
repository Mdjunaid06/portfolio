// ╔══════════════════════════════════════════════════════════════════╗
// ║                        PROJECTS DATA FILE                        ║
// ║                                                                  ║
// ║  This is the ONLY file you need to edit to manage your           ║
// ║  projects. The UI updates automatically.                         ║
// ║                                                                  ║
// ║  ➕ ADD PROJECT    → copy any object block and paste at the end  ║
// ║  ➖ REMOVE PROJECT → delete the entire { ... } object block      ║
// ║  ✏️  EDIT PROJECT   → change values inside any object            ║
// ╚══════════════════════════════════════════════════════════════════╝


// ──────────────────────────────────────────────────────────────────
//  STATUS GUIDE — controls the badge shown on the card
//
//  "completed"  →  No badge shown at all (clean card)
//  "working"    →  Shows yellow  ● "Work In Progress" badge
//  "updating"   →  Shows purple  ● "Currently Improving" badge
//
//  To change a project's status, just replace the value below:
//  Example:   status: "working"   →   status: "completed"
// ──────────────────────────────────────────────────────────────────


// ══════════════════════════════════════════════════════════════════
//  SECTION 1 — MACHINE LEARNING / DATA SCIENCE PROJECTS
//  These appear in the "ML & Data Science Projects" section
// ══════════════════════════════════════════════════════════════════

export const mlProjects = [

  // ── PROJECT 1 ──────────────────────────────────────────────────
  {
    id: 1,

    // ✏️ Project name shown as the card heading
    title: "Movie Recommendation System",

    // ✏️ Short description shown on the card (2-3 sentences max)
    description:
      "An AI-powered movie recommendation system that suggests films based on movie title, genre, actors, and director. Supports up to 10 movie inputs simultaneously for personalised batch recommendations.",

    // ✏️ Project screenshot/preview image
    // → Put your image in the /public/projects/ folder
    // → Then set the path like:  image: "/projects/movie-recommender.png"
    // → Leave empty string ""  if you have no image yet
    image: "/projects/movie.png",

    // ✏️ Your GitHub repository link for this project
    github: "https://github.com/Mdjunaid06/movie-recommender",

    // ✏️ Live deployed link — set "" if not deployed yet
    live: "https://movie-recommender-eight-gules.vercel.app",

    // ✏️ Tech stack tags shown as pills on the card
    tags: ["Python", "Pandas", "Scikit-Learn", "NLP", "Cosine Similarity"],

    // ✏️ Current status of this project — see STATUS GUIDE above
    status: "completed",
  },
  // ── END PROJECT 1 ──────────────────────────────────────────────


  // ── PROJECT 2 ──────────────────────────────────────────────────
  {
    id: 2,

    // ✏️ Project name
    title: "House Price Predictor",

    // ✏️ Description
    description:
      "A machine learning model that predicts house prices based on features like location, size, and amenities using Linear Regression and XGBoost.",

    // ✏️ Image path
    image: "",

    // ✏️ GitHub repo link
    github: "https://github.com",

    // ✏️ Live link
    live: "",

    // ✏️ Tech stack
    tags: ["Python", "Scikit-Learn", "Pandas", "XGBoost"],

    // ✏️ Status
    status: "completed",
  },
  // ── END PROJECT 2 ──────────────────────────────────────────────


  // ── PROJECT 3 ──────────────────────────────────────────────────
  {
    id: 3,

    // ✏️ Project name
    title: "Sentiment Analysis Tool",

    // ✏️ Description
    description:
      "NLP-based sentiment classifier trained on Twitter data to detect positive, negative, and neutral sentiments using TF-IDF and Logistic Regression.",

    // ✏️ Image path
    image: "",

    // ✏️ GitHub repo link
    github: "https://github.com",

    // ✏️ Live link
    live: "",

    // ✏️ Tech stack
    tags: ["Python", "NLTK", "Scikit-Learn", "TF-IDF"],

    // ✏️ Status
    status: "updating",
  },
  // ── END PROJECT 3 ──────────────────────────────────────────────


  // ── PROJECT 4 ──────────────────────────────────────────────────
  {
    id: 4,

    // ✏️ Project name
    title: "Image Classifier (CNN)",

    // ✏️ Description
    description:
      "A convolutional neural network built with TensorFlow/Keras to classify images across 10 categories with 92% accuracy on the CIFAR-10 dataset.",

    // ✏️ Image path
    image: "",

    // ✏️ GitHub repo link
    github: "https://github.com",

    // ✏️ Live link
    live: "",

    // ✏️ Tech stack
    tags: ["Python", "TensorFlow", "Keras", "CNN"],

    // ✏️ Status
    status: "working",
  },
  // ── END PROJECT 4 ──────────────────────────────────────────────


  // ── HOW TO ADD A NEW ML PROJECT ────────────────────────────────
  // Copy the block below, paste after the last project above,
  // and fill in your details. Make sure to increment the id number.
  //
  // {
  //   id: 5,
  //   title: "Your Project Name",
  //   description: "What does this project do? Keep it 2-3 sentences.",
  //   image: "/projects/your-image.png",
  //   github: "https://github.com/Mdjunaid06/your-repo",
  //   live: "https://your-project.vercel.app",
  //   tags: ["Python", "YourTech", "AnotherTech"],
  //   status: "completed",
  // },
  // ── END TEMPLATE ───────────────────────────────────────────────

]


// ══════════════════════════════════════════════════════════════════
//  SECTION 2 — FULL STACK / MERN PROJECTS
//  These appear in the "Full Stack Projects" section
// ══════════════════════════════════════════════════════════════════

export const mernProjects = [

  // ── PROJECT 1 ──────────────────────────────────────────────────
  {
    id: 1,

    // ✏️ Project name
    title: "Dev Portfolio",

    // ✏️ Description
    description:
      "This very portfolio website — built with React, Vite, and TailwindCSS. Features dark theme, animations, typewriter effect, and a contact form.",

    // ✏️ Image path
    image: "",

    // ✏️ GitHub repo link
    github: "https://github.com/Mdjunaid06/portfolio",

    // ✏️ Live link
    live: "",

    // ✏️ Tech stack
    tags: ["React", "Vite", "TailwindCSS", "Node.js"],

    // ✏️ Status
    status: "updating",
  },
  // ── END PROJECT 1 ──────────────────────────────────────────────


  // ── PROJECT 2 ──────────────────────────────────────────────────
  {
    id: 2,

    // ✏️ Project name
    title: "Task Manager App",

    // ✏️ Description
    description:
      "A full-stack task management application with user authentication, drag-and-drop boards, and real-time updates using Socket.io.",

    // ✏️ Image path
    image: "",

    // ✏️ GitHub repo link
    github: "https://github.com",

    // ✏️ Live link
    live: "",

    // ✏️ Tech stack
    tags: ["React", "Node.js", "MongoDB", "Express"],

    // ✏️ Status
    status: "working",
  },
  // ── END PROJECT 2 ──────────────────────────────────────────────


  // ── PROJECT 3 ──────────────────────────────────────────────────
  {
    id: 3,

    // ✏️ Project name
    title: "E-Commerce Store",

    // ✏️ Description
    description:
      "A complete e-commerce platform with product listings, cart, checkout flow, and admin dashboard. Integrated with Stripe for payments.",

    // ✏️ Image path
    image: "",

    // ✏️ GitHub repo link
    github: "https://github.com",

    // ✏️ Live link
    live: "",

    // ✏️ Tech stack
    tags: ["React", "Express", "MongoDB", "Stripe"],

    // ✏️ Status
    status: "completed",
  },
  // ── END PROJECT 3 ──────────────────────────────────────────────


  // ── HOW TO ADD A NEW FULL STACK PROJECT ────────────────────────
  // Copy the block below, paste after the last project above,
  // and fill in your details. Make sure to increment the id number.
  //
  // {
  //   id: 4,
  //   title: "Your Project Name",
  //   description: "What does this project do? Keep it 2-3 sentences.",
  //   image: "/projects/your-image.png",
  //   github: "https://github.com/Mdjunaid06/your-repo",
  //   live: "https://your-project.vercel.app",
  //   tags: ["React", "YourTech", "AnotherTech"],
  //   status: "completed",
  // },
  // ── END TEMPLATE ───────────────────────────────────────────────

]
