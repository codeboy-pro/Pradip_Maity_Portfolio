import dayjs from "dayjs";
import { useState, useEffect, useRef } from "react";
import { navIcons, navLinks } from "#constants"
import useWindowStore from "#store/window";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const {openWindow}=useWindowStore();
  const [currentTime, setCurrentTime] = useState(dayjs().format("ddd MMM D h:mm A"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format("ddd MMM D h:mm A"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [mobileMenuOpen]);

  const handleNavAction = (type) => {
    openWindow(type);
    setMobileMenuOpen(false);
  };

  return (
    <nav ref={menuRef}>
        {/* Left part */}
        <div className="nav-left">
            <img src="/public/images/logo.svg" alt="Logo" />
            <p className="font-bold text-sm sm:text-base">Pradip's Portfolio</p>
            {/* Desktop nav links */}
            <ul className="nav-links-desktop">{navLinks.map(({id,name,type})=>(
                <li key={id} onClick={()=> openWindow(type)}><p>{name}</p></li>
            ))}</ul>
        </div>

        {/* Mobile hamburger button */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Right part (desktop) */}
        <div className="nav-right">
          <ul>{navIcons.map(({id,img})=>(
            <li key={id}><img src={img} className="icon-hover" alt={`icon-${id}`} /></li>
          ))}</ul>
          <time>{currentTime}</time>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <ul>
              {navLinks.map(({id, name, type}) => (
                <li key={id} onClick={() => handleNavAction(type)}>
                  <p>{name}</p>
                </li>
              ))}
            </ul>
            <time>{currentTime}</time>
          </div>
        )}
    </nav>
  )
}

export default Navbar