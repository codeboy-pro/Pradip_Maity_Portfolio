import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLayoutEffect, useRef, useEffect } from "react";
import { Draggable } from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, isMinimized, zIndex } = windows[windowKey];
    const ref = useRef(null);
    const prevIsOpenRef = useRef(isOpen);
    const prevIsMinimizedRef = useRef(isMinimized);
    const isAnimatingRef = useRef(false);
    const originalPositionRef = useRef({ x: 0, y: 0 });
    const windowKeyRef = useRef(windowKey);

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const [instance] = Draggable.create(el, {
        trigger: el.querySelector(".window-header"),
        onPress: () => focusWindow(windowKey),
        onDragEnd: function() {
          // Store position after drag
          originalPositionRef.current = { x: this.x, y: this.y };
        }
      });
      return () => instance.kill();
    }, []);

    // Handle open animation
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen || isMinimized) return;

      el.style.display = "block";
      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }, [isOpen]);

    // Handle minimize animation
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const key = windowKeyRef.current;

      // Minimize: was not minimized, now minimized
      if (!prevIsMinimizedRef.current && isMinimized && !isAnimatingRef.current) {
        isAnimatingRef.current = true;
        
        // Store current position before animating
        if (!originalPositionRef.current.x && !originalPositionRef.current.y) {
          originalPositionRef.current = { 
            x: gsap.getProperty(el, "x") || 0, 
            y: gsap.getProperty(el, "y") || 0 
          };
        }
        
        // Get dock icon by data-window-key attribute
        const dockIcon = document.querySelector(`[data-window-key="${key}"]`) || 
                         document.querySelector('#dock .dock-container');
        const dockRect = dockIcon?.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        
        // Calculate target position (center of dock icon)
        const targetX = dockRect 
          ? dockRect.left + dockRect.width / 2 - elRect.left - elRect.width / 2
          : 0;
        const targetY = dockRect 
          ? dockRect.top - elRect.top - elRect.height / 2 + dockRect.height / 2
          : window.innerHeight - elRect.top - 100;

        // macOS-style minimize animation (genie effect simulation)
        gsap.to(el, {
          scale: 0.1,
          opacity: 0,
          x: `+=${targetX}`,
          y: `+=${targetY}`,
          scaleX: 0.05,
          transformOrigin: "bottom center",
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            el.style.display = "none";
            isAnimatingRef.current = false;
            // Reset scaleX for restore
            gsap.set(el, { scaleX: 1 });
          },
        });

        // Animate dock icon bounce when receiving window
        if (dockIcon) {
          gsap.timeline()
            .to(dockIcon, { y: -15, duration: 0.2, ease: "power2.out" })
            .to(dockIcon, { y: 0, duration: 0.3, ease: "bounce.out" });
        }
      }

      // Restore: was minimized, now not minimized
      if (prevIsMinimizedRef.current && !isMinimized && !isAnimatingRef.current) {
        isAnimatingRef.current = true;
        el.style.display = "block";
        
        // Get dock icon position for starting point
        const dockIcon = document.querySelector(`[data-window-key="${key}"]`);
        
        // Animate dock icon when window leaves
        if (dockIcon) {
          gsap.timeline()
            .to(dockIcon, { y: -10, duration: 0.15, ease: "power2.out" })
            .to(dockIcon, { y: 0, duration: 0.2, ease: "power2.in" });
        }

        gsap.to(el, {
          scale: 1,
          opacity: 1,
          x: originalPositionRef.current.x || 0,
          y: originalPositionRef.current.y || 0,
          rotation: 0,
          duration: 0.4,
          ease: "back.out(1.4)",
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });
      }

      prevIsMinimizedRef.current = isMinimized;
    }, [isMinimized]);

    // Handle close animation
    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      // Detect closing: was open, now closed
      if (prevIsOpenRef.current && !isOpen && !isAnimatingRef.current) {
        isAnimatingRef.current = true;
        el.style.display = "block"; // Keep visible during animation
        
        gsap.to(el, {
          scale: 0.8,
          opacity: 0,
          y: 20,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            el.style.display = "none";
            isAnimatingRef.current = false;
            // Reset transform for next open
            gsap.set(el, { scale: 1, opacity: 1, y: 0, x: 0, rotation: 0 });
            originalPositionRef.current = { x: 0, y: 0 };
          },
        });
      }

      prevIsOpenRef.current = isOpen;
    }, [isOpen]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      // Only set display directly if opening or if not animating
      if (isOpen && !isMinimized) {
        el.style.display = "block";
      } else if (!isAnimatingRef.current) {
        el.style.display = "none";
      }
    }, [isOpen, isMinimized]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className="absolute"
        onMouseDown={() => focusWindow(windowKey)}
      >
        <Component {...props} />
      </section>
    );
  };
  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;
  return Wrapped;
};

export default WindowWrapper;
