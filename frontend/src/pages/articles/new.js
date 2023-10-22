//imports
import { FormEvent, useState } from "react";

import formStyles from "../../../styles/Form.module.scss";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

//create new article and submit to the database
const CreateNewBook = (props) => {
    //const navigate = useNavigate();
    
    const [book, setNewBook] = useState({
        
        title: '',
        authors: '',
        journal_name: '',
        pubYear: '',
        volume: '',
        number: '', 
        pages: '',
        DOI: '',
    });

    const onChange = (event) => {
        setNewBook({ ...book, [event.target.name]: event.target.value});
        
    };

    //after submit button is clicked, submit to the database
    const onSubmit = async (event) => {
        try {
            console.log("success");
        event.preventDefault();
        
        //use axios to send the submitted book to mongodb
        axios
            .post('http://localhost:8082/api/books', book)
            .then((res) => {
              
                setNewBook({
                    title:'',
                    authors: '',
                    journal_name: '',
                    pubYear: '',
                    volume: '',
                    number: '',
                    pages: '',
                    DOI: '',
                });
                
            });
            //error handling
        } catch (error) {
          window.alert(error);
            console.log("Cannot add book");
        }
            
    };

    //return submission page UI
    return (

        <><div className="container">
          
            <h1>New Article</h1>
            <form noValidate onSubmit={onSubmit}>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Title'
                      name='title'
                      className={formStyles.formItem}
                      value={book.title}
                      onChange={onChange}
                    />
                  </div>

                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Authors'
                      name='authors'
                      className={formStyles.formItem}
                      value={book.authors}
                      onChange={onChange}
                    />
                  </div>
    
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Journal Name'
                      name='journal_name'
                      className={formStyles.formItem}
                      value={book.journal_name}
                      onChange={onChange}
                    />
                  </div>
    
                  <div className='form-group'>
                    <input
                      type='date'
                      placeholder='Year of Publication'
                      name='pubYear'
                      className={formStyles.formItem}
                      value={book.pubYear}
                      onChange={onChange}
                    />
                  </div>
    
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='volume'
                      name='volume'
                      className={formStyles.formItem}
                      value={book.volume}
                      onChange={onChange}
                    />
                  </div>

                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='number'
                      name='number'
                      className={formStyles.formItem}
                      value={book.number}
                      onChange={onChange}
                    />
                  </div>

                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='pages'
                      name='pages'
                      className={formStyles.formItem}
                      value={book.pages}
                      onChange={onChange}
                    />
                  </div>
    
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='DOI'
                      name='DOI'
                      className={formStyles.formItem}
                      value={book.DOI}
                      onChange={onChange}
                    />
                  </div>
                  <input
                type='submit'
                className={formStyles.buttonItem} 
                onClick={onSubmit}/>
            </form>
        </div>
        
        </>
    )

    };

export default CreateNewBook;