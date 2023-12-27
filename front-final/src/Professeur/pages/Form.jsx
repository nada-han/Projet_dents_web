import React, { useState } from "react";
import Navbar from "../components/Navbar/Index";
import { useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faPhone } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Form() {
  const [sidebarToggle] = useOutletContext();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    image: "",
    number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to create a new student
      await axios.post("http://localhost:8085/api/students", formData);
      // Handle success, e.g., redirect or show a success message
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error creating student:", error);
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
                <label htmlFor="userName" className="text-sm text-gray-600">
                  Username
                </label>
                <input
                  id="userName"
                  type="text"
                  name="userName"
                  onChange={handleChange}
                  value={formData.userName}
                  className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                  placeholder="Username"
                />
              </div>

              <div>
                <label htmlFor="password" className="text-sm text-gray-600">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                  placeholder="Password"
                />
              </div>

              <div>
                <label htmlFor="firstName" className="text-sm text-gray-600">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  value={formData.firstName}
                  className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                  placeholder="First Name"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="text-sm text-gray-600">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  value={formData.lastName}
                  className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                  placeholder="Last Name"
                />
              </div>

              <div>
                <label htmlFor="image" className="text-sm text-gray-600">
                  Image URL
                </label>
                <input
                  id="image"
                  type="text"
                  name="image"
                  onChange={handleChange}
                  value={formData.image}
                  className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                  placeholder="Image URL"
                />
              </div>

              <div>
                <label htmlFor="number" className="text-sm text-gray-600">
                  Number
                </label>
                <input
                  id="number"
                  type="text"
                  name="number"
                  onChange={handleChange}
                  value={formData.number}
                  className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                  placeholder="Number"
                />
              </div>

              <div className="mt-6 flex flex-row gap-4">
                <button
                  type="submit"
                  className="bg-emerald-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm"
                >
                  Create Student
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Form;