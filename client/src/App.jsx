import "./styles/global.css"
import Navbar            from "./components/Navbar"
import Hero              from "./sections/Hero"
import Skills            from "./sections/Skills"
import MLProjects        from "./sections/MLProjects"
import FullStackProjects from "./sections/FullStackProjects"
import Stats             from "./sections/Stats"
import Contact           from "./sections/Contact"
import Footer            from "./sections/Footer"

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <MLProjects />
        <FullStackProjects />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
