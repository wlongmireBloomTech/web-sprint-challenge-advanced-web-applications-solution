import React, { useState } from "react";
import { editColorService, deleteColorService } from './../services/colorService';

import Color from './Color';
import EditMenu from './EditMenu';

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    console.log(editColor);

    editColorService(colorToEdit)
    .then((res) => {
      updateColors(
        colors.map((color) =>
          color.id === colorToEdit.id ? colorToEdit : color
        )
      );
      setEditing(false);
    })
    .catch((err) => console.log(err.message));
  };

  const deleteColor = (colorToDelete) => {

      deleteColorService(colorToDelete)
      .then(res=>{
        updateColors(
          colors.filter((color)=> color.id !== colorToDelete.id)
        );
        setEditing(false);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => <Color key={color.id} editing={editing} color={color} editColor={editColor} deleteColor={deleteColor}/>)}
      </ul>
      
      {editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/>}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
