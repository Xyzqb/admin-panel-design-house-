export default function Table({
  columns = [],
  data = [],
  renderActions,
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow border">
      <table className="min-w-full text-sm">
        {/* HEADER */}
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left font-semibold text-gray-600"
              >
                {col.label}
              </th>
            ))}

            {renderActions && (
              <th className="px-4 py-3 text-right">Actions</th>
            )}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center py-6 text-gray-400"
              >
                No data found
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {row[col.key]}
                  </td>
                ))}

                {renderActions && (
                  <td className="px-4 py-3 text-right">
                    {renderActions(row)}
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

// import Table from "../../components/table/Table";
// import { Edit, Trash } from "lucide-react";

// export default function FacilitiesList() {
//   const columns = [
//     { key: "name", label: "Facility Name" },
//     { key: "location", label: "Location" },
//     { key: "status", label: "Status" },
//   ];

//   const data = [
//     { name: "Warehouse", location: "Noida", status: "Active" },
//     { name: "Plant", location: "Delhi", status: "Inactive" },
//   ];

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-semibold mb-4">Facilities</h1>

//       <Table
//         columns={columns}
//         data={data}
//         renderActions={(row) => (
//           <div className="flex justify-end gap-2">
//             <button className="p-2 bg-blue-50 text-blue-600 rounded-lg">
//               <Edit size={16} />
//             </button>
//             <button className="p-2 bg-red-50 text-red-600 rounded-lg">
//               <Trash size={16} />
//             </button>
//           </div>
//         )}
//       />
//     </div>
//   );
// }
