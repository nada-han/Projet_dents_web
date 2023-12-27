import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Index";
import axios from "axios";

function Table() {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dataHeader = [
    { key: "userName", label: "Username" },
    { key: "number", label: "Number" },
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "actions", label: "Actions" },
  ];

  const [modifiedUserName, setModifiedUserName] = useState("");
  const [modifiedNumber, setModifiedNumber] = useState("");
  const [modifiedFirstName, setModifiedFirstName] = useState("");
  const [modifiedLastName, setModifiedLastName] = useState("");
  const [modifiedImage, setModifiedImage] = useState("");
  const [modifiedPassword, setModifiedPassword] = useState("");

  useEffect(() => {
    if (selectedStudent) {
      setModifiedUserName(selectedStudent.userName);
      setModifiedNumber(selectedStudent.number);
      setModifiedFirstName(selectedStudent.firstName);
      setModifiedLastName(selectedStudent.lastName);
      setModifiedImage(selectedStudent.image);
      setModifiedPassword(selectedStudent.password);
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8085/api/students");
        setStudents(response.data);
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

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`http://localhost:8085/api/students/${studentId}`);
      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
    } catch (error) {
      console.error("Error deleting student:", error);
      setError('Error deleting student. Please try again.');
    }
  };

  const handleModify = (student) => {
    setSelectedStudent(student);
    setModifiedUserName(student.userName);
    setModifiedNumber(student.number);
    setModifiedFirstName(student.firstName);
    setModifiedLastName(student.lastName);
    setIsModalOpen(true);
  };

  const handleSaveChanges = async () => {
      try {
        const updatedStudent = {
          userName: modifiedUserName,
          number: modifiedNumber,
          firstName: modifiedFirstName,
          lastName: modifiedLastName,
          image: modifiedImage,
          password: modifiedPassword,
        };

        await axios.put(`http://localhost:8085/api/students/${selectedStudent.id}`, updatedStudent);

        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === selectedStudent.id ? { ...student, ...updatedStudent } : student
          )
        );

        handleCloseModal();
      } catch (error) {
        console.error("Error saving changes:", error);
        setError('Error saving changes. Please try again.');
      }
    };

  const handleCloseModal = () => {
    setSelectedStudent(null);
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
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="border px-4 py-2">{student.userName}</td>
                      <td className="border px-4 py-2">{student.number}</td>
                      <td className="border px-4 py-2">{student.firstName}</td>
                      <td className="border px-4 py-2">{student.lastName}</td>
                      <td className="border px-4 py-2">
                        <button onClick={() => handleDelete(student.id)} className="bg-red-500 text-white px-2 py-1 rounded-md mr-2">
                          Delete
                        </button>
                        <button onClick={() => handleModify(student)} className="bg-yellow-500 text-white px-2 py-1 rounded-md">
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

        {isModalOpen && selectedStudent && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Modify Student</h2>
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
                <label className="block text-gray-700 text-sm font-bold mb-2">Number</label>
                <input
                  type="text"
                  value={modifiedNumber}
                  onChange={(e) => setModifiedNumber(e.target.value)}
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