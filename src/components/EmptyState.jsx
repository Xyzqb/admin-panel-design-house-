import React from "react";
import { Search } from "lucide-react";

const EmptyState = ({
  title = "No data found",
  description = "There is no data to display.",
  icon: Icon = Search,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="p-12 text-center">
      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      <p className="text-gray-500 mb-4">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
export default EmptyState;