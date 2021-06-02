import axiosWithAuth from '../helpers/axiosWithAuth';
import axios from 'axios';

export const fetchColorService = () => {
    return axiosWithAuth()
        .get("/colors")
}

export const editColorService = (colorToEdit) => {
    return axiosWithAuth()
        .put(`/colors/${colorToEdit.id}`, colorToEdit);
}

export const deleteColorService = (colorToDelete) => {
    return axiosWithAuth()
        .delete(`/colors/${colorToDelete.id}`);
}

export const loginService = (credentials) => {
    return axios
        .post("http://localhost:5000/api/login", credentials)
}