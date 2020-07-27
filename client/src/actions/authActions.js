import axios from "axios";
import { GET_AUTH } from "./types";
import { LOGIN_ADMIN } from "./types";


import M from "materialize-css";

export const getAuth = () => {
  return async (dispatch) => {
    const res = await axios.get("/api/current_user");
    if (!res.data)
      dispatch({ type: GET_AUTH, payload: false });
    else
      dispatch({ type: GET_AUTH, payload: res.data });
  };
};

export const loginAdmin = (admin_name, admin_pass) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/auth/admin", {username: admin_name, password: admin_pass});
      if (res.data) {
        dispatch({ type: GET_AUTH, payload: res.data });
      }else{
        showError("Error de autentificación. Revise su correo y contraseña.");
      }
    } catch (err) {
      console.log(err);
    }
  };
};




//Toasts
export const showError = (message) => {
  M.Toast.dismissAll();
  setTimeout(function(){
    M.toast({
      html: message+"<p class='hide-on-med-and-up'>&nbsp</p>",
      classes: "right red darken-1",
      displayLength: 5000,
    });
  }, 500);

};

export const showInfo = (message) => {
  M.Toast.dismissAll();

  M.toast({
    html: message+"<p class='hide-on-med-and-up'>&nbsp</p>",
    classes: "right teal lighten-1",
    displayLength: 2000,
  });


};

export const showSucces = (message) => {
  M.Toast.dismissAll();
  setTimeout(function(){
    M.toast({
    html: message+"<p class='hide-on-med-and-up'>&nbsp</p>",
    classes: "right blue-grey darken-1",
    displayLength: 2000,
  });
}, 500);
};
