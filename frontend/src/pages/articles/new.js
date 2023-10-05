import { FormEvent, useState } from "react";

import formStyles from "../../../styles/Form.module.scss";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

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

    const onSubmit = async (event) => {
        try {
            
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
                
                //navigate('/');
            });
        } catch (error) {
          window.alert(error);
            console.log("Cannot add book");
        }
            
    };

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
    

/*
const NewDiscussion = () => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [source, setSource] = useState("");
  const [pubYear, setPubYear] = useState<number>(0);
  const [doi, setDoi] = useState("");
  const [summary, setSummary] = useState("");
  const [linkedDiscussion, setLinkedDiscussion] = useState("");

  const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();


console.log(
          JSON.stringify({
            title,
            authors,
            source,
            publication_year: pubYear,
            doi,
            summary,
            linked_discussion: linkedDiscussion,
          })
        );
      };
    
      // Some helper methods for the authors array
    
      const addAuthor = () => {
        setAuthors(authors.concat([""]));
      };
    
      const removeAuthor = (index: number) => {
        setAuthors(authors.filter((_, i) => i !== index));
      };
    
      const changeAuthor = (index: number, value: string) => {
        setAuthors(
          authors.map((oldValue, i) => {
            return index === i ? value : oldValue;
          })
        );
      };
    */
    
    

    /*
    // Return the full form
    
      return (
        <div className="container">
          <h1>New Article</h1>
          <form className={formStyles.form} onSubmit={onSubmit}>
            <label htmlFor="title">Title:</label>
            <input
              className={formStyles.formItem}
              type="text"
              name="title"
              id="title"
              value={book.title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
    
            <label htmlFor="author">Authors:</label>
            {authors.map((author, index) => {
              return (
                <div key={`author ${index}`} className={formStyles.arrayItem}>
    
    <input
                type="text"
                name="author"
                value={author}
                onChange={(event) => changeAuthor(index, event.target.value)}
                className={formStyles.formItem}
              />
              <button
                onClick={() => removeAuthor(index)}
                className={formStyles.buttonItem}
                style={{ marginLeft: "3rem" }}
                type="button"
              >
                -
              </button>
            </div>
          );
        })}
        <button
          onClick={() => addAuthor()}
          className={formStyles.buttonItem}
          style={{ marginLeft: "auto" }}
          type="button"
        >
          +
        </button>

        <label htmlFor="source">Source:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="source"
          id="source"
          value={source}
          onChange={(event) => {
            setSource(event.target.value);
          }}
        />

        <label htmlFor="pubYear">Publication Year:</label>
        <input
          className={formStyles.formItem}
          type="number"
          name="pubYear"
          id="pubYear"
          value={pubYear}
          onChange={(event) => {
            const val = event.target.value;
            if (val === "") {
              setPubYear(0);
            } else {
              setPubYear(parseInt(val));
            }
          }}
/>

        <label htmlFor="doi">DOI:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="doi"
          id="doi"
          value={doi}
          onChange={(event) => {
            setDoi(event.target.value);
          }}
        />

        <label htmlFor="summary">Summary:</label>
        <textarea
          className={formStyles.formTextArea}
          name="summary"
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
        />

        <button className={formStyles.formItem} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
*/




/*

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
        setNewBook({ ...book, [event.target.name]: e.target.value});
    };

    const onSubmit = async (event) => {
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

     //           navigate('/');
            });
            
            
    };

    
    //code containing the form for the site
    return (
        
        <div className='CreateNewBook'>
          <div className='container'>
            <div className='row'>
              <div className={formStyles.form}>
                <br />
                <Link to='/' className='btn btn-outline-warning float-left'>
                  Show BooK List
                </Link>
              </div>
              <div className='col-md-8 m-auto'>
                <h1 className='display-4 text-center'>Add Book</h1>
                <p className='lead text-center'>Create new book</p>
    
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
                  <br />
    
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Authors'
                      name='Authors'
                      className={formStyles.formItem}
                      value={book.authors}
                      onChange={onChange}
                    />
                  </div>
    
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Journal Name'
                      name='Journal Name'
                      className={formStyles.formItem}
                      value={book.journal_name}
                      onChange={onChange}
                    />
                  </div>
    
                  <div className='form-group'>
                    <input
                      type='date'
                      placeholder='Year of Publication'
                      name='Year of Publication'
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
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      );

      */