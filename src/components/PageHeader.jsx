import { useNavigate } from "react-router-dom";

const PageHeader = ({
  title,
  description,
  buttonText,
  buttonIcon: ButtonIcon,
  buttonPath,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6 mx-2">
      {/* Left Content */}
      <div>
        <h1 className="text-3xl font-bold text-amber-600 mb-2">
          {title}
        </h1>
        <p className="text-gray-600 text-lg">
          {description}
        </p>
      </div>

      {/* Action Button */}
      {buttonText && buttonPath && (
        <button
          onClick={() => navigate(buttonPath)}
          className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-sm hover:bg-gray-900 transition"
        >
          {ButtonIcon && <ButtonIcon className="w-5 h-5" />}
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default PageHeader;