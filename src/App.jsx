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
        <div className="fixed top-0 left-0 z-[999999] bg-red-600 p-5 text-white text-2xl">
        APP TEST 123456
      </div>
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