import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from "../../src/App.js";

const correctUsername = "Lambda";
const correctPassword = "School";

const doLogin = (username, password)=> {
    const nameInput = document.querySelector("#username");    
    const passwordInput = document.querySelector("#password");

    userEvent.clear(nameInput);
    userEvent.type(nameInput, username);

    userEvent.clear(passwordInput);
    userEvent.type(passwordInput, password);

    
    const button = document.querySelector("#submit");
    userEvent.click(button);
}

describe("Login Authentication", ()=>{
    test("App does nothing when login incorrect username", async ()=>{
        render(<App />);
        
        doLogin('notFound', correctPassword);
        waitFor(()=> {
            const errorMessage = document.querySelector("#error");
            expect(errorMessage).toBeTruthy();
        })
        
    });
    
    test("App does nothing when login incorrect password", async ()=>{
        render(<App />);
        
        doLogin(correctUsername, 'notFound');

        waitFor(()=> {
            const errorMessage = document.querySelector("#error");
            expect(errorMessage).toBeTruthy();
        });
    });

    test("App navigates to /bubbles when correct username/password is given", async ()=>{
        render(<App />);
        doLogin(correctUsername, correctPassword);

        waitFor(()=>{
            const bubblesTitle = screen.getByText(/bubbles/i);
            const colorTitle = screen.getByText(/colors/i);
            
            expect(colorTitle).toBeTruthy();
            expect(bubblesTitle).toBeTruthy();
        });
    });
});

describe("Color Interface", ()=>{
    test("When navigating to /bubbles, all colors are loaded and displayed from server.", async ()=>{
        render(<App />);
        
        await waitFor(()=>{
            const colors = screen.getAllByTestId(/color/i);
            expect(colors).toHaveLength(11);
        });
    });
    
    test("When a color is clicked, edit menu appears.", async ()=>{
        render(<App />);
        
        const colors = await screen.findAllByTestId(/color/i);
        const firstColor = colors[0];
        userEvent.click(firstColor);
    
        const editMenuText = await screen.findByTestId(/edit_menu/i);
        expect(editMenuText).toBeTruthy();
    });
    
    test("When the cancel button is clicked, edit mode is turned off.", async ()=>{
        render(<App />);
        
        let colors = await screen.findAllByTestId(/color/i);
        let firstColor = colors[0];
        userEvent.click(firstColor);
    
        const button = screen.getByTestId("cancel_button");
        userEvent.click(button);
            
        await waitFor(()=>{
            const editMenu = screen.queryByTestId('edit_menu');
            expect(editMenu).toBeFalsy();
        });
    });
    
    test("When a new color name is entered and save is clicked, that name is replaced within the colors list", async ()=>{
        render(<App />);
        
        let colors = await screen.findAllByTestId(/color/i);
        let firstColor = colors[0];
        userEvent.click(firstColor);
    
        const colorName = await screen.findByTestId("colorName");
        userEvent.type(colorName, "{selectall}{del}testColor");
    
        const colorHex = await screen.findByTestId("colorHex");
        userEvent.type(colorHex, "{selectall}{del}#000000");
    
        let saveButton = await screen.findByTestId("submit_button");
        userEvent.click(saveButton);
        saveButton = await screen.findByTestId("submit_button");
        saveButton = await screen.findByTestId("submit_button");

        await waitFor( ()=>{
            colors = screen.queryAllByTestId(/color/i);
            const firstColor = colors[0];
            expect(firstColor.textContent).toMatch(/testColor/);
    
            const colorBox = firstColor.children[1];
            expect(colorBox.style.backgroundColor).toBe('rgb(0, 0, 0)');
        });
    });
    
    test("When the delete icon is clicked, that color is removed from the colors list", async ()=>{
        render(<App />);
        
        const colors = await screen.findAllByTestId(/color/i);
        const firstColor = colors[0];
        const firstColorName = firstColor.textContent;
    
        userEvent.click(firstColor);
    
        let deleteLink;
    
        await waitFor(()=>{
            deleteLink = firstColor.firstChild;
        });
    
        userEvent.click(deleteLink);
    
        await waitFor(()=>{
            const missingColor = screen.queryByText(firstColorName);
            expect(missingColor).toBeNull();
        });
    });
});
