import axios from "axios";
import { MenuInterface } from "../../interfaces/IMenu";

const apiUrl = "http://localhost:8000";

const Authorization = localStorage.getItem("token");

const Bearer = localStorage.getItem("token_type");


const requestOptions = {

  headers: {

    "Content-Type": "application/json",

    Authorization: `${Bearer} ${Authorization}`,

  },

};
async function GetCategory() {

    return await axios
  
      .get(`${apiUrl}/category`, requestOptions)
  
      .then((res) => res)
  
      .catch((e) => e.response);
}

async function GetAllMenus() {

    return await axios

      .get(`${apiUrl}/menus`, requestOptions)

      .then((res) => res)

      .catch((e) => e.response);
}

async function GetMenu(id: string) {

    return await axios
  
      .get(`${apiUrl}/menus/${id}`, requestOptions)
  
      .then((res) => res)
  
      .catch((e) => e.response);
}

async function CreateMenu(data: MenuInterface) {

    return await axios
  
      .post(`${apiUrl}/menus`, data, requestOptions)
  
      .then((res) => res)
  
      .catch((e) => e.response);
}

async function DeleteMenu(id: string) {

    return await axios
  
        .delete(`${apiUrl}/menus/${id}`, requestOptions)

        .then((res) => res)

        .catch((e) => e.response);
}

async function UpdateMenu(id: string, data: MenuInterface) {

  return await axios

    .put(`${apiUrl}/menus/${id}`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);
}


export {
    GetCategory,
    CreateMenu,
    GetAllMenus,
    DeleteMenu,
    GetMenu,
    UpdateMenu,
}
