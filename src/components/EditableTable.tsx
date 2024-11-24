import { useContext } from "react";
import AccountPanel from '../components/AccountPanel';
import { AppStateContext } from "../App";

const EditableTable = () => {
  const context = useContext(AppStateContext);

  if (!context) {
      throw new Error('useContext must be used within an AppStateProvider');
  }

  const { appState, setAppState } = context;

  const deleteRow = (id: string) => {
    setAppState({...appState, 
      items: appState.items.filter((item) =>
      item.id !== id
    ),
    });
  };

  const toggleEdit = (id: string) => {
    setAppState({...appState, 
      items: appState.items.map((item) =>
      item.id === id ? { ...item, openPanel: true } : item
    ),
    });
  };

  return (
    <div className="p-4 font-light font-bold">
      <table className="w-full table-fixed border-collapse border border-stone-300 text-xs">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-1/4 px-4 py-4 font-light font-bold text-indigo-500">Activity</th>
            <th className="w-1/4 px-4 py-4 font-light font-bold text-indigo-500">Overall Spend</th>
            <th className="w-1/4 px-4 py-4 font-light font-bold text-indigo-500">Shared By</th>
            <th className="w-1/4 px-4 py-4 font-light font-bold text-indigo-500">Individual Share</th>
            <th className="w-1/4 px-4 py-4 font-light font-bold text-indigo-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appState.items.map((row) => (
            <tr key={row.id}
            className="border-solid border-b border-stone-300 bg-white">
              <td className="px-4 py-2 text-center">{row.text}</td>
              <td className="px-4 py-2 text-center">{row.totalAmount}</td>
              <td className="px-4 py-2 text-center">{row.totalPeople}</td>
              <td className="px-4 py-2 text-center">{row.eachPay}</td>
              <td className="px-4 py-2 text-center">
                <button
                  className="px-2 py-1 rounded text-indigo-500 hover:text-indigo-700"
                  onClick={() => toggleEdit(row.id)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 px-2 py-1 rounded hover:text-red-700"
                  onClick={() => deleteRow(row.id)}
                >
                  Delete
                </button>
              </td>
              <td>
              <AccountPanel isOpen={row.openPanel} activityId={row.id} activityName={row.text} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;