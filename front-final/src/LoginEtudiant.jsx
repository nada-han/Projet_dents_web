import React, { useState } from 'react';
import axios from 'axios';

const LoginEtudiant = ({ onLogin }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Rediriger l'utilisateur vers "/pages/table"
    window.location.href = 'Etudiant/pages/';
  };

  return (
    <div className="login-container">
      {/* Menu en haut */}
      <nav>
        <ul>
          <li>
            <a href="/login-professor">Login Professor</a>
          </li>
          <li>
            <a href="/login-admin">Login Admin</a>
          </li>
          <li>
             <a href="/login-etudiant">Login Etudiant</a>
          </li>
        </ul>
      </nav>

      {/* Champs de connexion */}
      <div className="login-form">
        <h2>Etudiant Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>
              UserName:
              <input type="text" value={userName} onChange={handleUsernameChange} />
            </label>
          </div>
          <div className="input-container">
            <label>
              Password:
              <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
          </div>
          <button type="submit" className="custom-button">Login</button>
        </form>
      </div>
    </div>
  );
};

// Styles CSS
const styles = `
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  nav {
    background-color: #333;
    padding: 10px;
  }

  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  nav ul li {
    display: inline;
    margin-right: 20px;
  }

  nav ul li a {
    text-decoration: none;
    color: white;
    font-weight: bold;
  }

  .login-form {
    background-color: #f4f4f4;
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
  }

  .login-form h2 {
    text-align: center;
    color: #333;
  }

  label {
    display: block;
    margin: 10px 0 5px;
    color: #555;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }

  .custom-button {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
  }

  .custom-button:hover {
    background-color: #45a049;
  }
`;

// Injecter les styles dans l'en-tête du document
const styleElement = document.createElement('style');
styleElement.appendChild(document.createTextNode(styles));
document.head.appendChild(styleElement);

export default LoginEtudiant;
