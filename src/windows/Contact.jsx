import { WindowControls } from "#components";
import { socials } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";

const Contact = () => {
  return (
    <>
    <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
    </div>
    <div className="p-5 space-y-5">
        <img src="/images/adrian.jpg" alt="pradip" className="w-20 rounded-full" />
        <h3>Let's Connect</h3>
        <p className="">Got an idea? A bug to squash? Or just wanna talk tech? I'm in. </p>
<p>
  <b>Email:- </b>
  <a
    href="https://mail.google.com/mail/?view=cm&fs=1&to=pardipmaity9907@gmail.com"
    target="_blank"
    rel="noopener noreferrer"
    className="italic text-lg text-blue-600"
  >
    pardipmaity9907@gmail.com
  </a>
</p>

<ul className="flex items-center gap-3 mt-5">
    {socials.map(({id,bg,link,icon,text})=>(
        <li key={id} style={{backgroundColor:bg}} className="rounded-lg p-3 w-60 hover:-translate-y-0.5 hover:scale-105 origin-center transition-all duration-300">
            <a href={link} target="_blank" rel="noopener noreferrer" className="space-y-5">
                <img src={icon} alt={text} className="size-5" />
                <p className="font-semibold text-sm text-white">{text}</p>
            </a>
            
        </li>
    ))}
</ul>
    </div>
    
    </>
  )
};

const ContactWindow=WindowWrapper(Contact,"contact");


export default ContactWindow;
