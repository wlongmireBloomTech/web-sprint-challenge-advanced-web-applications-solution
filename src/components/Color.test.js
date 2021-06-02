import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

test("Renders without errors", () => {
    const color = { color: "", code: { hex: "" }};

    render(<Color color={color}/>);
});
  
test("Renders the color passed into the component", () => {
    const color = { color: "red", code: { hex: "#FF0000" }};
    render(<Color color={color}/>);

    const colorItem = screen.queryByText('red');
    expect(colorItem).toBeInTheDocument();
});

test("Executes handleDelete and toggleEdit when the 'x' icon is clicked", () => {
    const deleteMock = jest.fn();
    const toggleMock = jest.fn();

    const color = { color: "red", code: { hex: "#FF0000" }};
    render(<Color color={color} deleteColor={deleteMock} toggleEdit={toggleMock}/>);

    const deleteItem = screen.queryByTestId('delete');
    userEvent.click(deleteItem);

    expect(deleteMock).toBeCalled();
    expect(toggleMock).toBeCalled();
});

test("Executes setEditColor and toggleEdit when color div is clicked", () => {
    const editMock = jest.fn();
    const toggleMock = jest.fn();

    const color = { color: "red", code: { hex: "#FF0000" }};
    render(<Color color={color} setEditColor={editMock} toggleEdit={toggleMock}/>);

    const colorItem = screen.queryByTestId('color');
    userEvent.click(colorItem);

    expect(editMock).toBeCalled();
    expect(toggleMock).toBeCalled();
});