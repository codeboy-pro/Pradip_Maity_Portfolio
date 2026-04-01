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

      <div className="text-content bg-white flex flex-col items-center p-4 sm:p-6 overflow-y-auto space-y-4">
        {image && (
          <img 
            src={image} 
            alt={name} 
            className="max-h-52 sm:max-h-64 w-auto object-contain object-center rounded-xl shadow-md"
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
