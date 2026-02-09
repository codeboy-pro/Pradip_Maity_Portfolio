import { useState } from "react";
import { Navbar, Welcome, Dock, Home, LoadingScreen } from "#components";
import {  Finder, Resume, Safari, Terminal, Text, ImageFile, Contact, Photos } from "#windows";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
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
    </>
  );
};

export default App;
