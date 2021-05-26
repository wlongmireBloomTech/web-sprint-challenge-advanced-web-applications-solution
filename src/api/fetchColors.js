import axiosWithAuth from './../helpers/axiosWithAuth';

const fetchColors = () => {
    return axiosWithAuth()
        .get("/colors")
}