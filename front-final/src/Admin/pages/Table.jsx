import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Index";
import axios from "axios";

function Table() {
  const [loading, setLoading] = useState(false);
  const [professors, setProfessors] = useState([]);
  const [error, setError] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProfessorForDeletion, setSelectedProfessorForDeletion] = useState(null);

  const dataHeader = [
    { key: "userName", label: "Username" },
    { key: "grade", label: "Grade" },
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "actions", label: "Actions" },
  ];

  const [modifiedUserName, setModifiedUserName] = useState("");
  const [modifiedGrade, setModifiedGrade] = useState("");
  const [modifiedFirstName, setModifiedFirstName] = useState("");
  const [modifiedLastName, setModifiedLastName] = useState("");
  const [modifiedImage, setModifiedImage] = useState("");
  const [modifiedPassword, setModifiedPassword] = useState("");

  useEffect(() => {
    if (selectedProfessor) {
      setModifiedUserName(selectedProfessor.userName);
      setModifiedGrade(selectedProfessor.grade);
      setModifiedFirstName(selectedProfessor.firstName);
      setModifiedLastName(selectedProfessor.lastName);
      setModifiedImage(selectedProfessor.image);
      setModifiedPassword(selectedProfessor.password);
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8085/api/professors");
        setProfessors(response.data);
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

  const handleDelete = async (professorId) => {
    setSelectedProfessorForDeletion(professors.find((professor) => professor.id === professorId));
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8085/api/professors/${selectedProfessorForDeletion.id}`);
      setProfessors((prevProfessors) =>
        prevProfessors.filter((professor) => professor.id !== selectedProfessorForDeletion.id)
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting professor:", error);
      setError('Error deleting professor. Please try again.');
    }
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleModify = (professor) => {
    setSelectedProfessor(professor);
    setModifiedUserName(professor.userName);
    setModifiedGrade(professor.grade);
    setModifiedFirstName(professor.firstName);
    setModifiedLastName(professor.lastName);
    setModifiedImage(professor.image);
    setModifiedPassword(professor.password);
    setIsModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedProfessor = {
        userName: modifiedUserName,
        grade: modifiedGrade,
        firstName: modifiedFirstName,
        lastName: modifiedLastName,
        image: modifiedImage,
        password: modifiedPassword,
      };

      await axios.put(`http://localhost:8085/api/professors/${selectedProfessor.id}`, updatedProfessor);

      setProfessors((prevProfessors) =>
        prevProfessors.map((professor) =>
          professor.id === selectedProfessor.id ? { ...professor, ...updatedProfessor } : professor
        )
      );

      handleCloseModal();
    } catch (error) {
      console.error("Error saving changes:", error);
      setError('Error saving changes. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setSelectedProfessor(null);
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
                  {professors.map((professor) => (
                    <tr key={professor.id}>
                      <td className="border px-4 py-2">{professor.userName}</td>
                      <td className="border px-4 py-2">{professor.grade}</td>
                      <td className="border px-4 py-2">{professor.firstName}</td>
                      <td className="border px-4 py-2">{professor.lastName}</td>

                      <td className="border px-4 py-2">
                        <button onClick={() => handleDelete(professor.id)} className="bg-red-500 text-white px-2 py-1 rounded-md mr-2">
                          Delete
                        </button>
                        <button onClick={() => handleModify(professor)} className="bg-yellow-500 text-white px-2 py-1 rounded-md">
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

        {isDeleteModalOpen && selectedProfessorForDeletion && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
              <p>Are you sure you want to delete {selectedProfessorForDeletion.userName}?</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {isModalOpen && selectedProfessor && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Update Professor</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                <input
                  type="text"
                  value={modifiedUserName}
                  onChange={(e) => setModifiedUserName(e.target.value)}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Grade</label>
                <input
                  type="text"
                  value={modifiedGrade}
                  onChange={(e) => setModifiedGrade(e.target.value)}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                <input
                  type="text"
                  value={modifiedFirstName}
                  onChange={(e) => setModifiedFirstName(e.target.value)}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                <input
                  type="text"
                  value={modifiedLastName}
                  onChange={(e) => setModifiedLastName(e.target.value)}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                <input
                  type="text"
                  value={modifiedImage}
                  onChange={(e) => setModifiedImage(e.target.value)}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                  type="password"
                  value={modifiedPassword}
                  onChange={(e) => setModifiedPassword(e.target.value)}
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

export default Table;
