//imports
import axios from "axios";

//define variables
type AcceptArticleProps = {
    id: string;
    update: (value: Array<any>) => void;
  };

//Defines what to do with accepted articles
export default function AcceptAricle<AcceptArticleProps>({ id, update }) {
    const accept = () => {
        update(prev => {
            prev.forEach(element => {
                //post the accepted article to the database
                if (element.id == id) {
                    element.accept = true;
                    element.display = false;
                    axios
                    .post(`http://localhost:8082/api/books/`, {
                        title: element.title,
                        authors: element.authors,
                        journal_name: '',
                        pubYear: element.pubYear,
                        volume: '',
                        number: '',
                        pages: '',
                        DOI: element.doi,
                        
                    })
                    .then((res) => console.log(res))
                    console.log(element)
                }   
            });
            
            return [...prev];
        })
    }
    //display the accept button
    return (
        <div>
            <button onClick={accept}>Accept</button>
        </div>
    )
}