import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";
import BubblePage from './BubblePage';

import mockFetchColorService from '../services/fetchColorService';
jest.mock('./../services/fetchColorService')

test("renders approprate number of colors passed in through mock", async ()=> {
    mockFetchColorService.mockResolvedValueOnce({
        data:[
            { color: "red", code: { hex: "#FF0000" }, id:1},
            { color: "yellow", code: { hex: "#FF0000" }, id:2},
            { color: "red", code: { hex: "#FF0000" }, id:3}
        ]
    });

    render(<BubblePage/>);
    const colors = await screen.findAllByTestId("color");
    expect(colors).toHaveLength(3);
});