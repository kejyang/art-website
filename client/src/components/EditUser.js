import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";

const EditUser = () =>  {


    const queryParams = {
        limit: 1,
        sort: "artist",
      };

    const params = new URLSearchParams(queryParams);

    const [description, setDescription] = useState('')

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
    
        axios
        .put("http://localhost:3001/api/v1/users/1", {
          user: {
            artist: "k.yang256@gmail.com",
            profile_pic: "",
            description: description,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
        
      }

  
    return (
        <div>
            <form method="post" onSubmit={handleSubmit}>
                <hr/>
                <div>USER EDIT TEST STUFF</div>
                <label>
                    Description: <input name="description" 
                                 placeholder="Some initial value" 
                                 value={description} 
                                 onInput={e => setDescription(e.target.value)}/>
                </label>
                <div><button type="submit">Submit edits</button></div>
                
            </form>
        </div>
    );
  
}

export default EditUser;