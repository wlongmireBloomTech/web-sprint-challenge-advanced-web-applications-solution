import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, fireEvent, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from "./../App.js";

const correctUsername = "Lambda School";
const correctPassword = "i<3Lambd4";

const doLogin = (username, password)=> {
    const nameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    userEvent.type(nameInput, username);
    userEvent.type(passwordInput, password);

    const button = screen.getByRole("button", {name:/Login/i});
    fireEvent.click(button);
}

describe("Login Authentication", ()=>{
    test('App renders without errors', ()=> {
        render(<App />);
    });
    
    test("App does nothing when login incorrect username", async ()=>{
        render(<App />);
        
        doLogin('notFound', correctPassword);
        const errorMessage = await screen.findByText(/Username or Password not valid./i);
    
        expect(errorMessage).toBeTruthy();
    });
    
    test("App does nothing when login incorrect password", async ()=>{
        render(<App />);
        
        doLogin(correctUsername, 'notFound');
        const errorMessage = await screen.findByText(/Username or Password not valid./i);
    
        expect(errorMessage).toBeTruthy();
    });

    test("App navigates to /bubbles when correct username/password is given", async ()=>{
        render(<App />);
        
        doLogin(correctUsername, correctPassword);
        
        const colorTitle = await screen.findByText(/colors/i);
        const bubblesTitle = screen.findByText(/bubbles/i);
    
        expect(colorTitle).toBeTruthy();
        expect(bubblesTitle).toBeTruthy();
    });  
    
});

describe("Color Interface", ()=>{
    test("When navigating to /bubbles, all colors are loaded and displayed from server.", async ()=>{
        render(<App />);
    
        const colors = await screen.findAllByTestId(/color/i);
        expect(colors).toHaveLength(11);
    });
    
    test("When a color is clicked, delete icon appears.", async ()=>{
        render(<App />);
        
        const colors = await screen.findAllByTestId(/color/i);
        const firstColor = colors[0];
        userEvent.click(firstColor);
    
        await waitFor(()=>{
            expect(firstColor.firstChild.textContent[0]).toBe("x");
        });
    });
    
    test("When a color is clicked, edit menu appears.", async ()=>{
        render(<App />);
        
        const colors = await screen.findAllByTestId(/color/i);
        const firstColor = colors[0];
        userEvent.click(firstColor);
    
        const editMenuText = await screen.findByText('edit color');
        expect(editMenuText).toBeTruthy();
    });
    
    test("When the cancel button is clicked, edit mode is turned off.", async ()=>{
        render(<App />);
        
        let colors = await screen.findAllByTestId(/color/i);
        let firstColor = colors[0];
        userEvent.click(firstColor);
    
        const button = screen.getByRole("button", {name:/cancel/i});
        userEvent.click(button);
    
        colors = await screen.findAllByTestId(/color/i);
        firstColor = colors[0];
            
        await waitFor(()=>{
            expect(firstColor.firstChild.textContent[0]).not.toBe("x");
        });
    });
    
    test("When a new color name is entered and save is clicked, that name is replaced within the colors list", async ()=>{
        render(<App />);
        
        let colors = await screen.findAllByTestId(/color/i);
        let firstColor = colors[0];
        userEvent.click(firstColor);
    
        const colorName = await screen.findByLabelText(/color name:/i);
        userEvent.type(colorName, "{selectall}{del}testColor");
    
        const colorHex = await screen.findByLabelText(/hex code:/i);
        userEvent.type(colorHex, "{selectall}{del}#000000");
    
        const saveButton = await screen.getByRole("button", {name:"save"});
        userEvent.click(saveButton);
    
        colors = await screen.findAllByTestId(/color/i);
    
        await waitFor( async ()=>{
            colors = screen.queryAllByTestId(/color/i);
            firstColor = colors[0];
            expect(firstColor.textContent).toBe(" testColor");
    
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
