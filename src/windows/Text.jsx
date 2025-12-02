import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile.data;

  if (!data) {
    return null;
  }

  const { name, image, subtitle, description } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{name}</h2>
      </div>

      <div className="text-content bg-white flex  flex-col justify-center items-center  p-6 max-h-[70vh] overflow-y-auto space-y-4">
        {image && (
          <img 
            src={image} 
            alt={name} 
            className="w-fit  h-fit  object-cover object-center rounded-lg shadow-md"
          />
        )}

        {subtitle && (
          <h3 className="text-lg font-semibold text-gray-800">
            {subtitle}
          </h3>
        )}

        {description && Array.isArray(description) && (
          <div className="text-description space-y-3">
            {description.map((paragraph, index) => (
              <p key={index} className="text-sm text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
