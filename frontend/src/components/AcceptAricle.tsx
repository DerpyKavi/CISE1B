import axios from "axios";

type AcceptArticleProps = {
    id: string;
    update: (value: Array<any>) => void;
  };
  


export default function AcceptAricle<AcceptArticleProps>({ id, update }) {
    const reject = () => {
        update(prev => {
            prev.forEach(element => {
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

    return (
        <div>
            <button onClick={reject}>Accept</button>
        </div>
    )
}