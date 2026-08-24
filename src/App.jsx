import Navbar from "./components/layout/Navbar.jsx";
import Hero from "./components/sections/Hero.jsx";
import SelectedWorks from "./components/sections/SelectedWorks.jsx";
import About from "./components/sections/About.jsx";
import CreativeProcess from "./components/sections/CreativeProcess.jsx";
import Contact from "./components/sections/Contact.jsx";
import MusicToggle from "./components/ui/MusicToggle.jsx";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      
      <Navbar />
      <main>
        <Hero />
        <SelectedWorks />
        <About />
        <CreativeProcess />
        <Contact />
      </main>
      <MusicToggle />
    </div>
  );
}

export default App;