import React, { useState } from 'react';
import Navbar from "../components/Navbar/Index";


const Table = () => {
  const [fichier, setFichier] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const handleChangementFichier = (event) => {
    const fichierSelectionne = event.target.files[0];
    setFichier(fichierSelectionne);

    // Créer une URL pour l'image sélectionnée
    const urlImage = URL.createObjectURL(fichierSelectionne);
    setImageURL(urlImage);
  };

  return (
    <>
      <Navbar />

      <main className="container mx-auto p-4">
        <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
          <h1 className="text-2xl font-bold mb-4">Affichage de l'Image</h1>
          <input type="file" onChange={handleChangementFichier} className="mb-4" />
          {imageURL && <img src={imageURL} alt="Image sélectionnée" className="mb-4" />}

          {/* Bouton de téléchargement en vert */}
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Convertir l'image
          </button>
        </div>
      </main>


    </>
  );
};

export default Table;