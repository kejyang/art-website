import React, {useState} from "react";
import axios from "axios";

const addtagdrawingtest = () =>{


    function handleSubmit(event){
        event.preventDefault();
        axios
        .post("http://localhost:3001/api/v1/tag_drawings", {tag_drawing:{
            tag_id: 3,
            drawing_id: 9,
            title: "test"
          }
        })
        .then((response) =>{
            console.log(response);
        })
        .catch((error) => console.log(error)); 
    }

    return (
        <div className="AddTag">
            <form onSubmit={handleSubmit}> 
                <h1>Test tagdrawings</h1>

                <button type="submit">Upload</button>
            </form> 


        </div>
    );

} 
export default addtagdrawingtest