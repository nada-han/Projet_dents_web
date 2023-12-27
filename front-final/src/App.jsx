// App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import TableAdmin from "./Admin/pages/Table";
import AuthLayoutAdmin from "./Admin/components/Layout/AuthLayout";
import FormAdmin from "./Admin/pages/Form";
import EtudiantProf from "./Professeur/pages/Table";
import TableProf from "./Professeur/pages/Form";
import GrpProf from "./Professeur/pages/Groupe"
import AjGrp from "./Professeur/pages/AjGrp"
import StudPW from "./Professeur/pages/StudentPW"
import AuthLayoutProf from "./Professeur/components/Layout/AuthLayout";
import TableEtudiant from "./Etudiant/pages/Table";
import AuthLayoutEtudiant from "./Etudiant/components/Layout/AuthLayout";
import LoginAdmin from "./LoginAdmin";
import LoginProfessor from "./LoginProfessor";
import LoginEtudiant from "./LoginEtudiant";

function App() {
  return (
    <Routes>
      {/* Route pour la racine (LoginAdmin) */}
      <Route path="/" element={<LoginAdmin />} />

      {/* Routes privées (nécessitent une authentification) */}
      <Route path="/admin/pages/*" element={<AuthLayoutAdmin />}>
        <Route path="table" element={<TableAdmin />} />

        <Route path="form" element={<FormAdmin />} />
      </Route>

      {/* Ajoutez également une route pour LoginProfessor */}
      <Route path="/login-professor" element={<LoginProfessor />} />
      <Route path="/login-admin" element={<LoginAdmin />} />
      <Route path="/login-etudiant" element={<LoginEtudiant />} />

      {/* Routes privées professeur */}
      <Route path="/Professeur/pages/*" element={<AuthLayoutProf />}>
        <Route path="table" element={<EtudiantProf />} />
        <Route path="form" element={<TableProf />} />
        <Route path="groupe" element={<GrpProf />} />
        <Route path="ajgrp" element={<AjGrp />} />
        <Route path="studentPW" element={<StudPW />} />
      </Route>
      <Route path="/Etudiant/pages/*" element={<AuthLayoutEtudiant />}>
           <Route path="table" element={<TableEtudiant />} />

      </Route>

    </Routes>
  );
}

export default App;
