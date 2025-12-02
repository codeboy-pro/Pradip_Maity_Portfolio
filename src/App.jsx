import { Navbar, Welcome, Dock } from "#components";
import {  Finder, Resume, Safari, Terminal, Text, ImageFile, Contact } from "#windows";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari/>
      <Resume/>
      <Finder/>
      <Text/>
      <ImageFile/>
      <Contact/>
    </main>
  );
};

export default App;
