import { faPage4, faWindows } from "@fortawesome/free-brands-svg-icons";
import {
  faTachometer,
  faTable,
  faLock,
  faNoteSticky,
  faNotdef
} from "@fortawesome/free-solid-svg-icons";

const initMenu = [


  
  {
    label: 'Tabel dan Form'
  },
  {
      label: "Etudiant",
      path: "/Professeur/pages/table",
      icon: faTable,
    },
    {
        label: "Groupe",
        path: "/Professeur/pages/groupe",
        icon: faTable,
      },
      {
              label: "Travaux pratique des étudiants",
              path: "/Professeur/pages/studentPW",
              icon: faTable,
            },

  {
    label: "Ajouter un etudiant",
    path: "/Professeur/pages/form",
    icon: faWindows,
  },
  {
     label: "Ajouter un groupe",
     path: "/Professeur/pages/ajgrp",
     icon: faWindows,
  },



];

export default initMenu