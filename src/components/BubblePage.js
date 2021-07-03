import React, { useState, useEffect  } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth from './../helpers/axiosWithAuth';
import fetchColorService from '../services/fetchColorService';

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchColorService()
      .then((res) => {
        setColors(res.data);
      });
  }, []);


  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    axiosWithAuth()
      .put(`/colors/${editColor.id}`, editColor)screen
      .then((res) => {
        setColors(
          colors.map((color) =>
            color.id === editColor.id ? editColor : color
          )
        );
        setEditing(false);
      })
      .catch((err) => console.log(err.message));
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth()
      .delete(`/colors/${colorToDelete.id}`)
      .then(res=>{
        setColors(
          colors.filter((color)=> color.id !== colorToDelete.id)
        );
      });
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;