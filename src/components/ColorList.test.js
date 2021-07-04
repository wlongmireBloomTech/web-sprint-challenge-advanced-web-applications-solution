import React from 'react';
import { render, screen} from "@testing-library/react";
import ColorList from './ColorList';

test("Renders an empty list of colors without errors", () => {
    const colors = [];
    render(<ColorList colors={colors}/>);
});

test("Renders a list of colors without errors", () => {
    const colors = [
        { color: "red", code: { hex: "#FF0000" }, id:1},
        { color: "yellow", code: { hex: "#FF0000" }, id:2},
        { color: "red", code: { hex: "#FF0000" }, id:3}
    ];
    
    render(<ColorList colors={colors}/>);
    
    const colorsItems = screen.queryAllByTestId("color");
    expect(colorsItems).toHaveLength(3);
});
// 
test("Renders the EditForm when editing = true but not when editing = false", () => {
    const { rerender } = render(<ColorList colors={[]} editing={true}/>);
    let editMenu = screen.queryByTestId('edit_menu');
    expect(editMenu).toBeInTheDocument();

    rerender(<ColorList colors={[]} editing={false}/>);
    editMenu = screen.queryByTestId('edit_menu');

    expect(editMenu).not.toBeInTheDocument();
});
