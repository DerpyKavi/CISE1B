type RejectArticleProps = {
    id: string;
    update: (value: Array<any>) => void;
  };
  


export default function RejectArticle<RejectArticleProps>({ id, update }) {
    const reject = () => {
        update(prev => {
            prev.forEach(element => {
                if (element.id == id) {
                    element.reject = true;
                    element.display = false;
                }   
            });

            return [...prev];
        })
    }

    return (
        <div>
            <button onClick={reject}>Reject</button>
        </div>
    )
}