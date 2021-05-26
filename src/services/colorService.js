import axiosWithAuth from '../helpers/axiosWithAuth';

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
