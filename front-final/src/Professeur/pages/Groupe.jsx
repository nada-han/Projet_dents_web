import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Index";
import axios from "axios";

function Groupe() {
  const [loading, setLoading] = useState(false);
  const [groupes, setGroupes] = useState([]);
  const [error, setError] = useState('');
  const [selectedGroupe, setSelectedGroupe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dataHeader = [
    { key: "code", label: "Code" },
    { key: "year", label: "Year" },
    { key: "actions", label: "Actions" },
  ];

  const [modifiedCode, setModifiedCode] = useState("");
  const [modifiedYear, setModifiedYear] = useState("");

  useEffect(() => {
    if (selectedGroupe) {
      setModifiedCode(selectedGroupe.code);
      setModifiedYear(selectedGroupe.year);
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8085/api/groupes");
        setGroupes(response.data);
        setError('');
      } catch (error) {
        console.error("Error fetching data:", error);
        setError('Error fetching data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (groupeId) => {
    try {
      await axios.delete(`http://localhost:8085/api/groupes/${groupeId}`);
      setGroupes((prevGroupes) => prevGroupes.filter((groupe) => groupe.id !== groupeId));
    } catch (error) {
      console.error("Error deleting groupe:", error);
      setError('Error deleting groupe. Please try again.');
    }
  };

  const handleModify = (groupe) => {
    setSelectedGroupe(groupe);
    setModifiedCode(groupe.code);
    setModifiedYear(groupe.year);
    setIsModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedGroupe = {
        code: modifiedCode,
        year: modifiedYear,
      };

      await axios.put(`http://localhost:8085/api/groupes/${selectedGroupe.id}`, updatedGroupe);

      setGroupes((prevGroupes) =>
        prevGroupes.map((groupe) =>
          groupe.id === selectedGroupe.id ? { ...groupe, ...updatedGroupe } : groupe
        )
      );

      handleCloseModal();
    } catch (error) {
      console.error("Error saving changes:", error);
      setError('Error saving changes. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setSelectedGroupe(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <main className="h-full">
        <Navbar />

        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md overflow-x-auto">
            {error && <p className="text-red-500">{error}</p>}
            {loading && <p>Loading...</p>}
            {!error && !loading && (
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    {dataHeader.map((header) => (
                      <th key={header.key} className="border px-4 py-2">{header.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {groupes.map((groupe) => (
                    <tr key={groupe.id}>
                      <td className="border px-4 py-2">{groupe.code}</td>
                      <td className="border px-4 py-2">{groupe.year}</td>
                      <td className="border px-4 py-2">
                        <button onClick={() => handleDelete(groupe.id)} className="bg-red-500 text-white px-2 py-1 rounded-md mr-2">
                          Delete
                        </button>
                        <button onClick={() => handleModify(groupe)} className="bg-yellow-500 text-white px-2 py-1 rounded-md">
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {isModalOpen && selectedGroupe && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Modify Groupe</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Code</label>
                <input
                  type="text"
                  value={modifiedCode}
                  onChange={(e) => setModifiedCode(e.target.value)}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                <input
                  type="text"
                  value={modifiedYear}
                  onChange={(e) => setModifiedYear(e.target.value)}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveChanges}
                  className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Groupe;