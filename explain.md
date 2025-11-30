# 📚 Complete Code Explanation - macOS Portfolio Project

## Table of Contents
1. [Navbar Component](#navbar-component)
2. [Welcome Component](#welcome-component)
3. [Dock Component](#dock-component)
4. [Window Store](#window-store)
5. [Mathematical Formulas](#mathematical-formulas)
6. [React Hooks Deep Dive](#react-hooks-deep-dive)

---

## 🔷 Navbar Component

### Full Code with Line-by-Line Explanation

```jsx
import dayjs from "dayjs";
import { navIcons, navLinks } from "#constants"
```

**Line 1:** Import `dayjs` library for date/time formatting  
**Line 2:** Import navigation data from constants file using path alias `#constants`

```jsx
const Navbar = () => {
```
**Line 4:** Define Navbar as a functional component (arrow function syntax)

```jsx
  return (
    <nav>
```
**Lines 6-7:** Return JSX. `<nav>` is semantic HTML5 element for navigation

```jsx
        <div>
            <img src="/public/public/images/logo.svg" alt="Logo" />
```
**Line 9:** Container div for left section  
**Line 10:** Logo image. `alt` attribute for accessibility (screen readers)

```jsx
            <p className="font-bold">Pradip's Portfolio</p>
```
**Line 11:** Site title with Tailwind class `font-bold` (font-weight: 700)

```jsx
            <ul>{
               navLinks.map(({id,name})=>{
                    return <li key={id}>{name}</li>
                })
            }
            </ul>
```
**Lines 12-17:** Navigation links list
- `navLinks.map()` - Iterate over array of link objects
- `({id, name})` - Object destructuring in parameter
- `key={id}` - React requires unique key for list items (for efficient re-rendering)
- Returns `<li>` with link name

**💡 Why `.map()` instead of loop?**
- React re-renders efficiently when data changes
- `.map()` returns new array of JSX elements
- `for` loops don't return values

```jsx
        <div>
 <ul>
    {
        navIcons.map(({id,img})=>{
            return <li key={id}>
                <img src={img} className="icon-hover" alt={`icon-${id}`} />
            </li>

        })
    }
 </ul>
```
**Lines 22-32:** Right section with icons
- Same `.map()` pattern for icons
- `className="icon-hover"` - Custom CSS class for hover effects
- `` alt={`icon-${id}`} `` - Template literal for dynamic alt text

```jsx
 <time >{dayjs().format("ddd MMM D h:mm A")}</time>
```
**Line 33:** HTML5 `<time>` element for semantic time display
- `dayjs()` - Creates dayjs object with current date/time
- `.format()` - Formats the date
  - `ddd` = Day of week (Mon, Tue, Wed...)
  - `MMM` = Month abbreviation (Jan, Feb, Mar...)
  - `D` = Day of month (1, 2, 3...)
  - `h:mm A` = Hour:Minutes AM/PM (2:30 PM)

**Example output:** `Sat Nov 30 3:45 PM`

---

## 🔷 Welcome Component

### Part 1: Text Rendering Function

```jsx
const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
```
**Line 1:** Function takes 3 parameters:
- `text` - String to render
- `className` - CSS classes
- `baseWeight = 400` - Default font weight (default parameter)

**Line 2:** `[...text]` - Spread operator converts string to array of characters
- `"hello"` becomes `['h', 'e', 'l', 'l', 'o']`
- `.map((char, i) => ...)` - `char` is character, `i` is index

```jsx
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `"wght" ${baseWeight}` }}
    >
```
**Lines 3-6:** Create span element for each character
- `key={i}` - React key (index is OK here since characters don't reorder)
- `style={{ }}` - Inline style object
- `fontVariationSettings` - CSS property for variable fonts
- `` `"wght" ${baseWeight}` `` - Template literal interpolates weight value

**📖 Variable Fonts Explained:**
- Traditional fonts: Fixed weights (400, 700)
- Variable fonts: Any weight (400, 450, 500, 550...)
- Allows smooth animation between weights

```jsx
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};
```
**Line 7:** Ternary operator
- If `char` is space, use `\u00A0` (non-breaking space Unicode)
- Otherwise use the character
- **Why?** Prevents spaces from collapsing in HTML

### Part 2: Font Weight Configuration

```jsx
const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};
```
**Object with two configurations:**
- `subtitle`: Thin to normal weight (100-400)
- `title`: Normal to ultra-bold weight (400-900)
- `default`: Weight when not hovering

### Part 3: Hover Animation Setup

```jsx
const setupTextHover = (container, type) => {
  if (!container) return ()=>{};
```
**Line 1:** Takes `container` (DOM element) and `type` ('subtitle' or 'title')  
**Line 2:** Guard clause - if no container, return empty cleanup function

```jsx
  const letters = container.querySelectorAll("span");
  const { min, max } = FONT_WEIGHTS[type];
```
**Line 4:** Get all span elements (individual letters)  
**Line 5:** Destructure min/max from FONT_WEIGHTS based on type

```jsx
  const animateLetter = ({ letter, weight, duration = 0.25 }) => {
    gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `"wght" ${weight}`,
    });
  };
```
**Lines 7-13:** Helper function to animate a single letter
- `{ letter, weight, duration = 0.25 }` - Object destructuring with default
- `gsap.to(letter, {...})` - GSAP animates `letter` element to target values
- `duration` - Animation time in seconds
- `ease: "power2.out"` - Easing function (fast start, slow end)
- Animates font weight smoothly

**🎨 Easing Functions Explained:**
- `linear` - Constant speed ▁▁▁▁▁
- `power2.out` - Fast then slow ▃▂▁▁▁
- `power2.in` - Slow then fast ▁▁▁▂▃

```jsx
  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;
```
**Lines 15-17:** Mouse move handler
- `e` - Event object
- `getBoundingClientRect()` - Returns element's position/size relative to viewport
- `e.clientX` - Mouse X position in viewport
- `mouseX` - Mouse X position relative to container's left edge

**📐 Coordinate System:**
```
Viewport:
┌─────────────────────┐
│  clientX = 500px    │
│         ↓           │
│   Container         │
│   ┌──────────────┐  │
│   │ left = 100px │  │
│   │              │  │
│   └──────────────┘  │
└─────────────────────┘

mouseX = 500 - 100 = 400px (relative to container)
```

```jsx
    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const center = iconLeft - left + width / 2;
      const distance = Math.abs(mouseX - center);
```
**Lines 19-22:** For each letter:
- Get letter's position (`l`) and width (`w`)
- Calculate letter's center point: `left position + half width`
- Calculate absolute distance from mouse to letter center

**📐 Distance Calculation:**
```
Mouse at 400px, Letter center at 350px
distance = |400 - 350| = 50px

Mouse at 200px, Letter center at 350px
distance = |200 - 350| = 150px
```

```jsx
      const intensity = Math.exp(-(distance ** 2) / 20000);
```
**Line 23:** **THE MAGIC FORMULA** - Exponential decay

**🧮 Mathematical Breakdown:**
1. `distance ** 2` - Square the distance
   - 50² = 2,500
   - 100² = 10,000
   - 200² = 40,000

2. `-(distance ** 2) / 20000` - Divide by 20,000 and negate
   - -(2,500 / 20,000) = -0.125
   - -(10,000 / 20,000) = -0.5
   - -(40,000 / 20,000) = -2.0

3. `Math.exp(...)` - Euler's number (e ≈ 2.718) raised to power
   - e^(-0.125) ≈ 0.88 (88% intensity)
   - e^(-0.5) ≈ 0.61 (61% intensity)
   - e^(-2.0) ≈ 0.14 (14% intensity)

**📊 Intensity vs Distance Graph:**
```
Intensity
1.0 |●
    |  ●
0.8 |    ●
    |      ●●
0.6 |         ●●
    |            ●●●
0.4 |                ●●●
    |                   ●●●●
0.2 |                       ●●●●●
    |                            ●●●●●●●
0.0 |_________________________________●●●●●
    0   50  100 150 200 250 300 350    Distance (px)
```

**Why exponential decay?**
- Creates smooth, natural-looking falloff
- Mimics physical phenomena (gravity, magnetism, light intensity)
- Close elements have strong effect, far elements have minimal effect

```jsx
      const newWeight = min + (max - min) * intensity;
      animateLetter({ letter, weight: newWeight });
```
**Lines 25-26:** Calculate and apply new weight
- For subtitle (min=100, max=400):
  - At intensity 1.0: `100 + (400-100) * 1.0 = 400` (bold)
  - At intensity 0.5: `100 + (400-100) * 0.5 = 250` (medium)
  - At intensity 0.0: `100 + (400-100) * 0.0 = 100` (thin)

```jsx
  const handleMouseLeave = () => {
    const defaultWeight = FONT_WEIGHTS[type].default;
    letters.forEach((letter) =>
      animateLetter({ letter, weight: defaultWeight, duration: 0.3 })
    );
  };
```
**Lines 29-33:** Reset all letters to default weight when mouse leaves
- Longer duration (0.3s) for smoother reset

```jsx
  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return ()=>{
    container.removeEventListener("mousemove",handleMouseMove);
    container.removeEventListener("mouseleave",handleMouseLeave);
  }
};
```
**Lines 39-44:** Event listeners and cleanup
- Attach event listeners to container
- Return cleanup function to remove listeners
- **Critical:** Prevents memory leaks when component unmounts

### Part 4: Welcome Component

```jsx
const Welcome = () => {
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);
```
**Lines 48-50:** Create refs
- `useRef` creates mutable reference object
- Initially `null`, will be set to DOM elements
- Persists across re-renders (unlike regular variables)

**🔍 useRef vs State:**
- `useState` - Triggers re-render when changed
- `useRef` - No re-render, direct DOM access

```jsx
  useGSAP(() => {
    const titleCleanUp=setupTextHover(titleRef.current, "title");
    const subtitleCleanUp=setupTextHover(subtitleRef.current,"subtitle");

   return()=>{
    subtitleCleanUp();
    titleCleanUp();
   };
  }, []);
```
**Lines 52-60:** useGSAP hook (GSAP + React integration)
- Runs once on mount (empty dependency array `[]`)
- `titleRef.current` - Actual DOM element
- Store cleanup functions
- Return function that calls both cleanups
- React calls return function on unmount

**🔄 Component Lifecycle:**
```
Mount → useGSAP runs → Setup animations
  ↓
User interacts → Animations run
  ↓
Unmount → Cleanup runs → Remove listeners
```

```jsx
  return (
    <section id='welcome'>
      <p ref={subtitleRef}>
        {renderText(
          "Hey, I'm Pradip Maity! Welcome to my ",
          "text-3xl font-georama",
          100
        )}
      </p>

      <h1 ref={titleRef} className='mt-7'>
        {renderText("portfolio", "text-9xl italic font-georama")}
      </h1>

      <div className='small-screen'>
        <p>This Portfolio is designed for desktop/tablet screens only.</p>
      </div>
    </section>
  );
};
```
**Lines 62-78:** JSX structure
- `ref={subtitleRef}` - Connects ref to DOM element
- `renderText()` - Calls function, returns array of spans
- `mt-7` - Tailwind margin-top (1.75rem)
- `text-3xl` - Tailwind font size (1.875rem)
- `text-9xl` - Tailwind font size (8rem)

---

## 🔷 Dock Component

### Part 1: Setup and State

```jsx
import { dockApps } from "#constants/index.js";
import { useGSAP } from "@gsap/react";
import { useRef } from "react"
import { Tooltip } from "react-tooltip";
import gsap from "gsap";
import useWindowStore from "#store/window.js";
```
**Lines 1-6:** Imports
- `dockApps` - Array of app configurations
- `useGSAP` - GSAP React hook
- `useRef` - React hook for DOM references
- `Tooltip` - Third-party tooltip component
- `gsap` - Animation library
- `useWindowStore` - Zustand store hook

```jsx
const Dock = () => {
const {openWindow,closeWindow,windows}=useWindowStore();
```
**Lines 8-9:** Access Zustand store
- Destructure functions and state from store
- `openWindow`, `closeWindow` - Actions to modify state
- `windows` - Current state of all windows

**🗄️ Zustand Pattern:**
```jsx
// Store returns object with state + actions
{
  windows: { finder: {...}, contact: {...} },
  openWindow: (key) => {...},
  closeWindow: (key) => {...}
}
```

```jsx
const dockRef=useRef(null);
```
**Line 11:** Create ref for dock container

### Part 2: Animation Logic

```jsx
useGSAP(()=>{
    const dock=dockRef.current;
    if(!dock) return ;
```
**Lines 13-15:** useGSAP hook
- Get actual DOM element
- Guard clause - exit if dock not mounted yet

```jsx
    const icons=dock.querySelectorAll(".dock-icon");
```
**Line 17:** Get all icon buttons
- `querySelectorAll` returns NodeList of matching elements

```jsx
    const animateIcons=(mouseX)=>{
        const {left}=dock.getBoundingClientRect();
```
**Lines 19-20:** Animation function
- `mouseX` - Mouse position relative to dock
- Get dock's left edge position

```jsx
        icons.forEach((icon) => {
            const {left:iconLeft,width}=icon.getBoundingClientRect();
            const center=iconLeft-left+width/2;
            const distance=Math.abs(mouseX-center);
```
**Lines 21-24:** For each icon:
- Get icon's position and width
- Calculate center: `icon's left - dock's left + half width`
- Calculate distance from mouse to icon center

**📐 Visual:**
```
Dock container (left = 100)
├── Icon 1 (left = 150, width = 60)
│   center = 150 - 100 + 30 = 80
├── Icon 2 (left = 220, width = 60)
│   center = 220 - 100 + 30 = 150
└── Icon 3 (left = 290, width = 60)
    center = 290 - 100 + 30 = 220
```

```jsx
                const intensity = Math.exp(-(distance ** 2.5) / 20000);
```
**Line 25:** Exponential decay with **power 2.5** instead of 2
- Higher exponent = sharper falloff
- Only very close icons animate significantly

**🧮 Comparison:**
```
Distance: 50px
- Power 2.0: exp(-2500/20000) = exp(-0.125) = 0.88
- Power 2.5: exp(-17677/20000) = exp(-0.88) = 0.41

Distance: 100px
- Power 2.0: exp(-10000/20000) = exp(-0.5) = 0.61
- Power 2.5: exp(-100000/20000) = exp(-5.0) = 0.007
```

**Effect:** Icons only pop up when mouse is very close

```jsx
                const scale = 1 + 0.5 * intensity;
                const y = -20 * intensity;
```
**Lines 26-27:** Calculate transformations
- Scale: 1.0 (normal) to 1.5 (50% bigger)
  - At intensity 1.0: `1 + 0.5 * 1.0 = 1.5`
  - At intensity 0.5: `1 + 0.5 * 0.5 = 1.25`
  - At intensity 0.0: `1 + 0.5 * 0.0 = 1.0`

- Y position: 0px to -20px (negative = move up)
  - At intensity 1.0: `-20 * 1.0 = -20px` (lift 20px)
  - At intensity 0.5: `-20 * 0.5 = -10px` (lift 10px)
  - At intensity 0.0: `-20 * 0.0 = 0px` (no lift)

```jsx
                gsap.to(icon, {
                    scale: scale,
                    y: y,
                    duration: 0.15,
                    ease: "power2.out",
                    overwrite: "auto",
                });
```
**Lines 29-35:** Animate icon with GSAP
- `scale` - CSS transform scale
- `y` - CSS transform translateY
- `duration: 0.15` - Fast animation (0.15 seconds)
- `ease: "power2.out"` - Smooth deceleration
- `overwrite: "auto"` - Cancel previous animation if still running

**Why short duration?**
- Dock needs to feel responsive and snappy
- Text animation (0.25s) can be slower for smoothness
- UI elements should react quickly

```jsx
    const handleMouseMove=(e)=>{
        const {left}=dock.getBoundingClientRect();
        animateIcons(e.clientX-left);
    };
```
**Lines 40-43:** Mouse move handler
- Get dock position (recalculate in case of window resize)
- Convert global mouse X to dock-relative X
- Call animation function

```jsx
    const resetIcons=()=>
        icons.forEach((icon)=>
            gsap.to(icon,{
                scale:1,
                y:0,
                duration:0.3,
                ease:"power1.out",
            }),
        );
```
**Lines 44-52:** Reset all icons
- Scale back to 1
- Y position back to 0
- Longer duration (0.3s) for smooth return
- `power1.out` - Gentler easing

```jsx
  dock.addEventListener("mousemove", handleMouseMove);
  dock.addEventListener("mouseleave", resetIcons);
  return ()=>{
    dock.removeEventListener("mousemove",handleMouseMove);
   dock.removeEventListener("mouseleave",resetIcons);
  }
});
```
**Lines 55-61:** Event listeners and cleanup
- Attach listeners when component mounts
- Return cleanup function
- Remove listeners on unmount

### Part 3: Window Toggle Logic

```jsx
const toggleApp=(app)=>{
  if(!app.canOpen) return;
```
**Lines 66-67:** Toggle function
- Early return if app can't open (like trash)

```jsx
  const window=windows[app.id];

  if(window.isOpen){
    closeWindow(app.id);
  }else{
    openWindow(app.id);
  }
}
```
**Lines 68-74:** Toggle logic
- Get window state from store by app ID
- If already open → close it
- If closed → open it

**🔄 Toggle Pattern:**
```
Click Finder icon:
1. Check windows.finder.isOpen
2. If true → closeWindow('finder')
3. If false → openWindow('finder')
4. Store updates → Component re-renders
```

### Part 4: JSX Render

```jsx
  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
```
**Lines 76-78:** Container structure
- `ref={dockRef}` - Attach ref for animations
- `dock-container` - Custom CSS class

```jsx
        {dockApps.map(({id,name,icon,canOpen})=>(
          <div key={id} className="relative flex justify-center">
```
**Lines 79-80:** Map over apps
- Destructure app properties
- Each app wrapped in div with `key`
- `relative` - For absolute positioning inside
- `flex justify-center` - Center icon

```jsx
            <button 
              type="button" 
              className="dock-icon" 
              aria-label={name} 
```
**Lines 81-84:** Button element
- `type="button"` - Prevents form submission
- `dock-icon` - Class for animations
- `aria-label` - Accessibility (screen readers)

```jsx
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
```
**Lines 85-87:** Tooltip configuration
- `data-tooltip-id` - Links to Tooltip component
- `data-tooltip-content` - Text to show
- `data-tooltip-delay-show` - Wait 150ms before showing

**Why delay?**
- Prevents tooltip flicker on quick mouse passes
- Only shows if user hovers intentionally

```jsx
              disabled={!canOpen}
              onClick={()=>toggleApp({id,canOpen})}
```
**Lines 88-89:** Interaction
- `disabled` if app can't open
- `onClick` - Arrow function calls toggleApp
- Pass object with id and canOpen

```jsx
            >
              <img 
                src={`public/images/${icon}`} 
                alt={`${name}`}
                loading="lazy"
                className={canOpen?"":"opacity-60"} 
              />
            </button>
```
**Lines 90-96:** Icon image
- Template literal for dynamic path
- `loading="lazy"` - Load images as needed (performance)
- Ternary: if can't open, add `opacity-60` (60% opacity)

```jsx
        <Tooltip id="dock-tooltip" place="top" className="tooltip"/>
```
**Line 100:** Tooltip component
- `id` matches `data-tooltip-id`
- `place="top"` - Show above icons
- `tooltip` - Custom styling class

---

## 🔷 Window Store (Zustand)

### Full Code Explanation

```jsx
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
```
**Lines 1-3:** Imports
- `INITIAL_Z_INDEX` - Starting z-index value (1000)
- `WINDOW_CONFIG` - Initial window states
- `immer` - Middleware for easier state updates
- `create` - Zustand store creator

```jsx
const useWindowStore = create(immer((set) => ({
```
**Line 5:** Create store with Immer middleware
- `create()` - Creates Zustand store
- `immer()` - Wraps store with Immer middleware
- `set` - Function to update state
- `({...})` - Return object with state and actions

**🎯 Why Immer?**
Without Immer:
```javascript
set(state => ({
  windows: {
    ...state.windows,
    finder: {
      ...state.windows.finder,
      isOpen: true
    }
  }
}))
```

With Immer:
```javascript
set(state => {
  state.windows.finder.isOpen = true
})
```
Much cleaner!

```jsx
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,
```
**Lines 6-7:** Initial state
- `windows` - Object with all window states
- `nextZIndex` - Starts at 1001 (INITIAL_Z_INDEX is 1000)

**📦 WINDOW_CONFIG Structure:**
```javascript
{
  finder: { isOpen: false, zIndex: 1000, data: null },
  contact: { isOpen: false, zIndex: 1000, data: null },
  safari: { isOpen: false, zIndex: 1000, data: null },
  // ... more windows
}
```

### openWindow Action

```jsx
    openWindow: (windowKey, data = null) =>
        set((state) => {
```
**Lines 9-10:** Open window function
- `windowKey` - Window identifier (e.g., 'finder')
- `data = null` - Optional data parameter
- `set((state) => {...})` - Immer-enabled setter

```jsx
            const win = state.windows[windowKey];
```
**Line 11:** Get window object
- `state.windows[windowKey]` - Access window by key
- With Immer, this is a draft we can mutate

```jsx
            win.isOpen = true;
            win.zIndex = state.nextZIndex;
```
**Lines 12-13:** Update window state
- Set `isOpen` to true (window becomes visible)
- Assign current `nextZIndex` (brings window to front)

**🎨 Z-Index Stack:**
```
Before opening:
Finder: 1000 (closed)
Contact: 1000 (closed)
nextZIndex: 1001

After openWindow('finder'):
Finder: 1001 (open, on top)
Contact: 1000 (closed)
nextZIndex: 1002
```

```jsx
            win.data = data ?? win.data;
```
**Line 14:** Update data
- `??` - Nullish coalescing operator
- If `data` is provided (not null/undefined), use it
- Otherwise, keep existing `win.data`

**📝 Nullish Coalescing vs OR:**
```javascript
// ?? (nullish coalescing)
null ?? 'default'       // 'default'
undefined ?? 'default'  // 'default'
0 ?? 'default'          // 0
'' ?? 'default'         // ''

// || (logical OR)
null || 'default'       // 'default'
undefined || 'default'  // 'default'
0 || 'default'          // 'default'
'' || 'default'         // 'default'
```

```jsx
            state.nextZIndex++;
        }),
```
**Line 15:** Increment for next window
- Next window opened will have even higher z-index

### closeWindow Action

```jsx
    closeWindow: (windowKey) =>
        set((state) => {
            const win = state.windows[windowKey];
            win.isOpen = false;
            win.zIndex = INITIAL_Z_INDEX;
            win.data = null;
        }),
```
**Lines 18-23:** Close window function
- Set `isOpen` to false (hide window)
- Reset z-index to initial value (1000)
- Clear window data

**Why reset z-index?**
- Keeps z-index values manageable
- Only open windows need high z-index

### focusWindow Action

```jsx
    focusWindow: (windowKey) =>
        set((state) => {
            const win = state.windows[windowKey];
            win.zIndex = state.nextZIndex;
            state.nextZIndex++;
        }),
})));
```
**Lines 25-30:** Focus window (bring to front)
- Window is already open
- Just update z-index to bring to front
- Increment nextZIndex

**🖱️ Use Case:**
User clicks on background window → call focusWindow() → window comes to front

```jsx
export default useWindowStore;
```
**Line 33:** Export store hook

---

## 🧮 Mathematical Formulas Explained

### Exponential Decay Formula

```javascript
intensity = Math.exp(-(distance ** exponent) / divisor)
```

**Components:**
1. **distance** - Distance in pixels from mouse to element
2. **exponent** - Controls falloff sharpness (2 or 2.5 in our code)
3. **divisor** - Controls range of effect (20,000 in our code)
4. **Math.exp()** - e^x where e ≈ 2.71828

**Step-by-step calculation for distance = 100px:**

```
1. Square the distance:
   100 ** 2 = 10,000

2. Divide by divisor:
   10,000 / 20,000 = 0.5

3. Negate:
   -0.5

4. Calculate e^(-0.5):
   Math.exp(-0.5) ≈ 0.606

Result: 60.6% intensity
```

**Why this formula?**
- **Natural appearance:** Mimics real-world phenomena
- **Smooth gradients:** No harsh boundaries
- **Performance:** Single calculation per frame
- **Tunable:** Adjust exponent/divisor for different effects

**Parameter tuning:**

| Change | Effect |
|--------|--------|
| Increase exponent (2→3) | Sharper falloff, smaller influence area |
| Decrease exponent (2→1.5) | Gentler falloff, larger influence area |
| Increase divisor (20000→40000) | Wider influence area |
| Decrease divisor (20000→10000) | Narrower influence area |

### Linear Interpolation (Weight Calculation)

```javascript
newWeight = min + (max - min) * intensity
```

**Formula:**
```
result = start + (end - start) * t
```
Where `t` is between 0 and 1

**Example with subtitle (min=100, max=400):**

```
intensity = 1.0 (directly under mouse):
newWeight = 100 + (400 - 100) * 1.0
         = 100 + 300 * 1.0
         = 100 + 300
         = 400 ← Maximum weight

intensity = 0.5 (medium distance):
newWeight = 100 + (400 - 100) * 0.5
         = 100 + 300 * 0.5
         = 100 + 150
         = 250 ← Medium weight

intensity = 0.0 (far away):
newWeight = 100 + (400 - 100) * 0.0
         = 100 + 300 * 0.0
         = 100 + 0
         = 100 ← Minimum weight
```

**Visualization:**
```
Weight
400 |               ●●●●●               max
    |           ●●●       ●●●
350 |         ●●             ●●
    |       ●●                 ●●
300 |     ●●                     ●●
    |   ●●                         ●●
250 | ●●                             ●●
    |●                                 ●
200 |                                   ●
    |                                    ●
150 |                                     ●
    |                                      ●●
100 |________________________________________●●● min
    -200  -150  -100  -50   0   50  100  150  200
                    Distance from mouse (px)
```

---

## 🎣 React Hooks Deep Dive

### useRef Hook

**Purpose:** Create mutable reference that persists across renders

**Syntax:**
```javascript
const myRef = useRef(initialValue)
```

**Common uses:**
1. **DOM access:**
```javascript
const inputRef = useRef(null)
<input ref={inputRef} />
// Later: inputRef.current.focus()
```

2. **Store mutable values (no re-render):**
```javascript
const countRef = useRef(0)
countRef.current += 1  // No re-render!
```

**useRef vs useState:**
```javascript
// useState - triggers re-render
const [count, setCount] = useState(0)
setCount(1)  // Component re-renders

// useRef - no re-render
const countRef = useRef(0)
countRef.current = 1  // No re-render
```

**In our code:**
```javascript
const dockRef = useRef(null)
<div ref={dockRef}>

// Later in useGSAP:
const dock = dockRef.current  // Access actual DOM element
dock.addEventListener('mousemove', handler)
```

### useGSAP Hook

**Purpose:** Integrate GSAP animations with React lifecycle

**Why not useEffect?**
```javascript
// ❌ Regular useEffect
useEffect(() => {
  gsap.to('.box', { x: 100 })
}, [])

// ✅ useGSAP (better)
useGSAP(() => {
  gsap.to('.box', { x: 100 })
}, [])
```

**Benefits of useGSAP:**
1. Context awareness
2. Automatic cleanup of GSAP instances
3. Better debugging
4. SSR compatibility

**Cleanup pattern:**
```javascript
useGSAP(() => {
  const cleanup1 = setupAnimation1()
  const cleanup2 = setupAnimation2()
  
  return () => {
    cleanup1()  // Called on unmount
    cleanup2()
  }
}, [])
```

**Dependency array:**
```javascript
// Empty array [] - run once on mount
useGSAP(() => {
  // Setup animations
}, [])

// With dependencies - run when deps change
useGSAP(() => {
  // Re-setup when color changes
}, [color])
```

### Zustand Store Hook

**Basic usage:**
```javascript
// Create store
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}))

// Use in component
const { count, increment } = useStore()
```

**With Immer middleware:**
```javascript
const useStore = create(immer((set) => ({
  nested: { deep: { value: 0 } },
  update: () => set((state) => {
    state.nested.deep.value++  // Direct mutation!
  })
})))
```

**Selective subscription:**
```javascript
// Subscribe to everything (re-renders on any change)
const store = useStore()

// Subscribe to specific value (only re-renders when count changes)
const count = useStore((state) => state.count)

// Subscribe to multiple specific values
const { count, name } = useStore((state) => ({
  count: state.count,
  name: state.name
}))
```

---

## 📚 Best Practices Used

### 1. Component Organization
✅ Import statements at top  
✅ Constants before component  
✅ Helper functions before component  
✅ Main component last  
✅ Export at end

### 2. Event Listener Cleanup
✅ Always remove event listeners in cleanup  
✅ Prevents memory leaks  
✅ Important for SPA (Single Page Applications)

```javascript
useGSAP(() => {
  element.addEventListener('event', handler)
  return () => element.removeEventListener('event', handler)
}, [])
```

### 3. Guard Clauses
✅ Early returns for invalid states  
✅ Prevents unnecessary processing

```javascript
if (!container) return () => {}
if (!app.canOpen) return
```

### 4. Object Destructuring
✅ Cleaner parameter access  
✅ Self-documenting code

```javascript
// ❌ Without destructuring
const name = props.name
const age = props.age

// ✅ With destructuring
const { name, age } = props
```

### 5. Default Parameters
✅ Prevents undefined values  
✅ Clear intent

```javascript
const renderText = (text, className, baseWeight = 400) => {
  // baseWeight defaults to 400 if not provided
}
```

### 6. Template Literals
✅ Dynamic strings  
✅ More readable than concatenation

```javascript
// ❌ Concatenation
"icon-" + id

// ✅ Template literal
`icon-${id}`
```

### 7. Nullish Coalescing
✅ Handle null/undefined specifically  
✅ Different from logical OR

```javascript
win.data = data ?? win.data
```

---

## 🎓 Key Takeaways

### Animation Concepts
1. **Exponential decay** creates natural-looking falloff
2. **Linear interpolation** smoothly transitions between values
3. **Easing functions** control animation feel
4. **Short durations** (0.15s) for UI responsiveness
5. **Longer durations** (0.3s) for smooth resets

### React Patterns
1. **useRef** for DOM access without re-renders
2. **useGSAP** for GSAP + React integration
3. **Cleanup functions** prevent memory leaks
4. **Key props** in lists for efficient rendering
5. **Refs** connect JSX to DOM elements

### State Management
1. **Zustand** for global state
2. **Immer** for simpler updates
3. **Actions** encapsulate state changes
4. **Selective subscription** for performance
5. **Z-index management** for window stacking

### Performance
1. **Lazy loading** images
2. **Exponential decay** (single calculation)
3. **GSAP** (GPU-accelerated animations)
4. **Cleanup** prevents memory leaks
5. **Memoization** via useRef

---

**Created:** November 30, 2025  
**Author:** Pradip Maity  
**Purpose:** Complete code explanation for learning and reference
