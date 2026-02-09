import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { navIcons, navLinks } from "#constants"
import useWindowStore from "#store/window";

const Navbar = () => {
  const {openWindow}=useWindowStore();
  const [currentTime, setCurrentTime] = useState(dayjs().format("ddd MMM D h:mm A"));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format("ddd MMM D h:mm A"));
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    //start of nav bar
    <nav>
        {/* //Left part */}
        <div>
            <img src="/public/images/logo.svg" alt="Logo" />
            <p className="font-bold">Pradip's Portfolio</p>
            <ul>{
               navLinks.map(({id,name,type})=>{
                    return <li key={id} onClick={()=> openWindow(type)}>
                        <p>{name}</p>
                    </li>
                })
            }
            </ul>
        </div>

{/* 
 Right Part */}
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
 <time>{currentTime}</time>
        </div>
    </nav>
  )
}

export default Navbar