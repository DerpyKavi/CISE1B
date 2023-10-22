import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";

interface RatingProps {
    rating: number;
    id: string;
    update: (val: Array<any>) => void;
}

export default function Rating<RatingProps>({ rating, id, update}) {
    let stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(useState(true));
        } else {
            stars.push(useState(false))
        }
    }

    const click = (index : number) => {
        let rate = 0;
        stars.forEach((element, currIndex) => {
            if (currIndex <= index) {
                element[1](true);
                rate++;
                console.log(rate);
            } else {
                element[1](false);
            }
        })

        update(prev => {
            prev.forEach(element => {
                if (element.id == id) {
                    element.rating = rate;
                    
                    axios.put(`http://localhost:8082/api/books/${element.id}`, element)
                        .catch((err) => {
                            console.log(err)
                        });
                }
            })
            
            return [...prev];
        })
    }

    return (
      <>
        {stars.map((star, index) => {
          return (
            <button
              type="button"
              key={index}
              onClick={() => click(index)}
            >
                { star[0] ? <AiFillStar /> : <AiOutlineStar /> }
            </button>
          );
        })}
      </>
    );
  };