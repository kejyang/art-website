import React, {useState} from "react";
import axios from "axios";

const AddTag = () =>{

    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);

    function handleChange(event) {
        setTag(event.target.value);
        console.log("hi");
    }

    function handleTagSubmit(event) {
        event.preventDefault();
        setTags([...tags, tag]);
 
    }

    function handleSubmit(event){
        event.preventDefault();
        for(let i = 0; i < tags.length; i++){
            axios
            .post("/api/v1/tags", {tag:{
                tag: tags[i],
                picture: "testpicture"
              }
            })
            .then((response) => {
              console.log(response.data.id);
            })
            .catch((error) => console.log(error));  
        }
    }

    return (
        <div className="AddTag">
            <form onSubmit={handleSubmit}> 
                <h1>React Tag Upload</h1>
                <input name="tag" placeholder="type tag here" onChange={handleChange}/>
                <button  onClick={handleTagSubmit}>Add Tag</button>

                <button type="submit">Upload</button>
            </form> 
            <div>
                {tags.map((x)=>(
                    <li key={x}>{x}</li>
                ))}
            </div>

        </div>
    );

} 
export default AddTag