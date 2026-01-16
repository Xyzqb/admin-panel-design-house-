// components/AdminPage.jsx
export default function AdminPage({ title, subtitle, children }) {
  return (
    <div className="w-full space-y-6">
      {(title || subtitle) && (
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-600 text-sm sm:text-base mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
        {children}
      </div>
    </div>
  );
}