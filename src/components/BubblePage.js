import React, { useState, useEffect  } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

import { editColorService, deleteColorService } from '../services/colorServices';
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
    editColorService(editColor)
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
      deleteColorService(colorToDelete)
      .then(res=>{
        setColors(
          colors.filter((color)=> color.id !== colorToDelete.id)
        );
      });
  };

  return (
    <>
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </>
  );
};

export default BubblePage;