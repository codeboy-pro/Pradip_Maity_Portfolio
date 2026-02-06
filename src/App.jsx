import { Navbar, Welcome, Dock, Home } from "#components";
import {  Finder, Resume, Safari, Terminal, Text, ImageFile, Contact, Photos } from "#windows";
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
      <Photos/>
      <Home/>
    </main>
  );
};

export default App;
