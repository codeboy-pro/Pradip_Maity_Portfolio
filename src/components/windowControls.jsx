import useWindowStore from "#store/window"
import { X, Minus } from "lucide-react";

const WindowControls = ({target}) => {
    const {closeWindow, minimizeWindow}=useWindowStore();

  return (
    <div id="window-controls">
      {/* Mobile: labeled buttons — visible below sm */}
      <div className="flex sm:hidden items-center gap-2">
        <button
          type="button"
          onClick={()=>closeWindow(target)}
          aria-label="Close window"
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#ff6157] text-white text-xs font-semibold"
        >
          <X size={14} />
          Close
        </button>
        <button
          type="button"
          onClick={()=>minimizeWindow(target)}
          aria-label="Minimize window"
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#ffc030] text-white text-xs font-semibold"
        >
          <Minus size={14} />
          Hide
        </button>
      </div>

      {/* Desktop: macOS-style dots — visible sm and above */}
      <div className="desktop-controls hidden sm:flex gap-2">
        <button
          type="button"
          className="control-tap-area"
          onClick={()=>closeWindow(target)}
          aria-label="Close window"
        >
          <div className="close" />
        </button>
        <button
          type="button"
          className="control-tap-area"
          onClick={()=>minimizeWindow(target)}
          aria-label="Minimize window"
        >
          <div className="minimize" />
        </button>
        <button
          type="button"
          className="control-tap-area"
          aria-label="Maximize window"
        >
          <div className="maximize" />
        </button>
      </div>
    </div>
  )
}

export default WindowControls

