import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Index";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

function AjGrp() {
  const [sidebarToggle] = useOutletContext();

  const [formData, setFormData] = useState({
    professor_id: "",
    code: "",
    year: "",
  });

  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    // Faire une requête GET pour récupérer la liste des professeurs
    const fetchProfessors = async () => {
      try {
        const response = await axios.get("http://localhost:8085/api/professors");
        setProfessors(response.data);
      } catch (error) {
        console.error("Error fetching professors:", error);
      }
    };

    fetchProfessors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Faire une requête POST pour créer un nouveau groupe
      await axios.post("http://localhost:8085/api/groupes", formData);
      // Handle success, e.g., redirect or show a success message
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error creating group:", error);
    }
  };

  return (
    <>
      <main className="h-full">
        <Navbar toggle={sidebarToggle} />

        {/* Main Content */}
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="professor_id" className="text-sm text-gray-600">
                  Professor
                </label>
                <select
                  id="professor_id"
                  name="professor_id"
                  onChange={handleChange}
                  value={formData.professor_id}
                  className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                >
                  <option value="" disabled>Select a Professor</option>
                  {professors.map((professor) => (
                    <option key={professor.id} value={professor.id}>
                      {professor.firstName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="code" className="text-sm text-gray-600">
                  Code
                </label>
                <input
                  id="code"
                  type="text"
                  name="code"
                  onChange={handleChange}
                  value={formData.code}
                  className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                  placeholder="Code"
                />
              </div>

              <div>
                <label htmlFor="year" className="text-sm text-gray-600">
                  Year
                </label>
                <input
                  id="year"
                  type="text"
                  name="year"
                  onChange={handleChange}
                  value={formData.year}
                  className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                  placeholder="Year"
                />
              </div>

              <div className="mt-6 flex flex-row gap-4">
                <button
                  type="submit"
                  className="bg-emerald-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm"
                >
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default AjGrp;