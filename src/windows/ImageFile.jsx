import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

const ImageFile = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile.data;

  if (!data) {
    return null;
  }

  const { name, imageUrl } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{name}</h2>
      </div>

      <div className="image-content bg-white flex flex-col justify-center items-center p-6 max-h-[70vh] overflow-y-auto">
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-fit h-fit object-contain object-center rounded-lg shadow-md"
          />
        )}
      </div>
    </>
  );
};

const ImageFileWindow = WindowWrapper(ImageFile, "imgfile");

export default ImageFileWindow;
