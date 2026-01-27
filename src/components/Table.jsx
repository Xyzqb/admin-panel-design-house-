import { Edit, Trash2 } from "lucide-react";

export default function Table({
  columns = [],
  data = [],
  onEdit,
  onDelete
}) {
  const showActions = onEdit || onDelete
  return (
    <div className="overflow-x-auto bg-white rounded-sm shadow-md border border-gray-100">
      <table className="w-full text-sm">
        {/* HEADER */}
        <thead className="bg-black">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-4 text-left font-bold text-white uppercase text-xs"
              >
                {col.label}
              </th>
            ))}

            {showActions && (
              <th className="px-6 py-4 text-right font-bold text-white uppercase text-xs">
                Actions
              </th>
            )}
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (showActions ? 1 : 0)}
                className="text-center py-12 text-gray-400"
              >
                No data found
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index} className="hover:bg-blue-50 transition">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}

                {showActions && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      )}

                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}