import { dockApps, locations } from "#constants/index.js";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import gsap from "gsap";
import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";

const Dock = () => {
  const { openWindow, closeWindow, windows, restoreWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();

  const dockRef = useRef(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll(".dock-icon");
    let rafId = null;

    const animateIcons = (mouseX) => {
      const dockRect = dock.getBoundingClientRect();
      
      icons.forEach((icon) => {
        const rect = icon.getBoundingClientRect();
        const iconCenter = rect.left - dockRect.left + rect.width / 2;
        const distance = Math.abs(mouseX - iconCenter);
        
        // Refined Gaussian curve for magnification
        const intensity = Math.max(0, 1 - distance / 130); 
        const easeIntensity = Math.pow(intensity, 0.4); // Adjusted exponent for smoother transition
        
        const scale = 1 + 0.35 * easeIntensity;
        const y = -12 * easeIntensity;

        gsap.to(icon, {
          scale: scale,
          y: y,
          duration: 0.25,
          ease: "power2.out",
          transformOrigin: "center bottom",
          overwrite: true,
        });
      });
    };

    const handleMouseMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const dockRect = dock.getBoundingClientRect();
        const mouseX = e.clientX - dockRect.left;
        animateIcons(mouseX);
      });
    };

    const resetIcons = () => {
      if (rafId) cancelAnimationFrame(rafId);
      
      icons.forEach((icon) =>
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          transformOrigin: "center bottom",
          overwrite: true,
        }),
      );
    };

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  });

  const toggleApp = (app) => {
    if (!app.canOpen) return;

    if (app.id === "trash") {
      setActiveLocation(locations.archive);
      openWindow("finder");
      return;
    }

    const window = windows[app.id];
    if (!window) {
      console.error(`Window not found for app: ${app.id}`);
      return;
    }
    // If minimized, restore it
    if (window.isMinimized) {
      restoreWindow(app.id);
    } else if (window.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
    }
  };
  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => {
          const windowState = windows[id];
          const isOpen = windowState?.isOpen;
          const isMinimized = windowState?.isMinimized;

          return (
            <div key={id} className="relative flex flex-col items-center">
              <button
                type="button"
                className={`dock-icon ${isMinimized ? "minimized" : ""}`}
                data-window-key={id}
                aria-label={name}
                data-tooltip-id="dock-tooltip"
                data-tooltip-content={
                  isMinimized ? `${name} (minimized)` : name
                }
                data-tooltip-delay-show={150}
                disabled={!canOpen}
                onClick={() => toggleApp({ id, canOpen })}
              >
                <img
                  src={`public/images/${icon}`}
                  alt={`${name}`}
                  loading="lazy"
                  className={canOpen ? "" : "opacity-60"}
                />
              </button>
              {/* Indicator dot for open/minimized windows */}
              {isOpen && (
                <div
                  className={`dock-indicator ${isMinimized ? "minimized" : ""}`}
                />
              )}
            </div>
          );
        })}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
