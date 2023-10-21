import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateNewBook from '../src/pages/articles/new';

// Mock Axios (if needed)
jest.mock('axios');

describe('CreateNewBook Component', () => {
  test('renders the CreateNewBook component', () => {
    const { getByText, getByPlaceholderText } = render(<CreateNewBook />);
  
    // Ensure that certain elements are present on the page
    expect(getByText('Add Book')).toBeInTheDocument();
    expect(getByPlaceholderText('Title')).toBeInTheDocument();
    expect(getByPlaceholderText('Authors')).toBeInTheDocument();
    // Add more expectations as needed
  });

  test('submits the form', async () => {
    const { getByText, getByPlaceholderText } = render(<CreateNewBook />);
    const titleInput = getByPlaceholderText('Title');
    const authorsInput = getByPlaceholderText('Authors');
    const submitButton = getByText('Submit');
  
    // Simulate user input
    fireEvent.change(titleInput, { target: { value: 'Sample Title' } });
    fireEvent.change(authorsInput, { target: { value: 'Sample Author' } });
  
    // Trigger form submission
    fireEvent.click(submitButton);
  
    // You may want to add expectations for the form submission, e.g., Axios requests.
    // Ensure that Axios.post is called with the correct data
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8082/api/books', {
      title: 'Sample Title',
      authors: 'Sample Author',
      journal_name: '',
      pubYear: '',
      volume: '',
      number: '',
      pages: '',
      DOI: '',
    });
  });
});
