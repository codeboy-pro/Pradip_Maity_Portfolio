import { WindowControls } from "#components"
import { codingProfiles } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { ChevronLeft, ChevronRight, Copy, MoveRight, PanelLeft, Plus, Search, Share, ShieldHalf } from "lucide-react";

const Safari = () => {
  return (
    <div className="flex flex-col h-full">
    <div id="window-header">
        <WindowControls target="safari"/>

        <PanelLeft className="ml-10 icon" />
    <div className="flex items-center gap-1 ml-5">
        <ChevronLeft className="icon"/>
        <ChevronRight className="icon"/>

    </div>
    <div className="flex-1 flex-center gap-3">
        <ShieldHalf className="icon" />
        <div className="search">
            <Search className="icon"/>
            <input type="text" placeholder="search or enter website name" className="flex-1"/>
    
        </div>
    </div>
<div  className="flex items-center gap-5">
    <Share className="icon"/>
    <Plus className="icon"/>
    <Copy className="icon"/>

</div>
    </div>

    <div className="blog select-text">
        <h2 className="text-xl font-bold text-pink-600 mb-10">Coding Profiles</h2>
        <div className="space-y-8">
            {codingProfiles.map(({id,image,title,stats,link,platform })=>(
                <div key={id} className="blog-post">
                    <div className="flex-center bg-gray-50 rounded-lg p-2">
                        <img src={image} alt={platform} className="object-contain size-16" />
                    </div>
                    <div className="content">
                        <p className="font-bold text-blue-600">{platform}</p>
                        <h3>{title}</h3>
                        <p className="text-xs text-gray-500">{stats}</p>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            visit profile <MoveRight className="icon"/>

                        </a>

                    </div>
                    
                    </div>
            ))}
        </div>
    </div>
    </div>
  )
};

const SafariWindow=WindowWrapper(Safari,"safari");




export default SafariWindow;
