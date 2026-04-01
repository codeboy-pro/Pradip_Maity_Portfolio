import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

const galleryImages = [
  { id: 1, name: "1.jpg", img: "/public/images/1.jpg" },
  { id: 2, name: "podo-2.jpg", img: "/public/images/podo.png" },
  
];

const Photos = () => {
  const { openWindow } = useWindowStore();

  const handleImageClick = (image) => {
    openWindow("imgfile", {
      name: image.name,
      imageUrl: image.img,
    });
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />
        <h2>Gallery</h2>
      </div>

      <div className="p-5 space-y-5">
        <h3 className="text-xl font-semibold">My Photos</h3>
        <p className="text-gray-600">Click on any photo to view it in full size.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              onClick={() => handleImageClick(image)}
              className="cursor-pointer hover:scale-105 transition-transform duration-300 rounded-lg overflow-hidden shadow-md"
            >
              <img 
                src={image.img} 
                alt={image.name} 
                className="w-full h-48 sm:h-32 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const PhotosWindow = WindowWrapper(Photos, "photos");

export default PhotosWindow;