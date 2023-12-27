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
    label: "Ajouter un professeur",
    path: "/Admin/pages/form",
    icon: faWindows,
  },
  {
    label: "Professeur",
    path: "/Admin/pages/table",
    icon: faTable,
  },


];

export default initMenu