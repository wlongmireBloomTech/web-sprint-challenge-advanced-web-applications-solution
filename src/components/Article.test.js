import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';
import Article from './Article';

const article = {
    headline:"This headline",
    author:"This author",
    summary:"",
    body:"",
    image:0,
    createdOn: Date.now(),
    id:""
}

const articleNoAuthor = {
    headline:"This headline",
    author:"",
    summary:"",
    body:"",
    image:0,
    createdOn: Date.now(),
    id:""
}

test('renders component without errors', ()=> {
    render(<Article article={article}/>);
});

test('renders headline, author from the article when passed in through props. (Use Date.now for test createdOn date.)', ()=> {
    render(<Article article={article}/>);
    const headline = screen.queryByTestId(/headline/i);
    const author = screen.queryByTestId(/author/i);
    
    expect(headline).toHaveTextContent(/This headline/i);
    expect(author).toBeInTheDocument(/This author/i);
});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article={articleNoAuthor}/>);
    const author = screen.queryByTestId(/author/i);
    
    expect(author).toBeInTheDocument(/Associated Press/i);
});

test('executes handleDelete when the delete button is pressed', ()=> {
    const handleDelete = jest.fn();
    render(<Article article={articleNoAuthor} handleDelete={handleDelete}/>);
    
    const deleteButton = screen.queryByTestId('deleteButton');
    userEvent.click(deleteButton);
    
    expect(handleDelete.mock.calls).toHaveLength(1);
});

//Task List:
//1. Complete all above tests. Create test article data when needed.