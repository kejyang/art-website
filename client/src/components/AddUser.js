//do something with this later




import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";

const AddUser = () =>  {
 
    const [userExists, setUserExists] = useState(true);

    const queryParams = {
        limit: 1,
        sort: "artist",
      };

    const params = new URLSearchParams(queryParams);

    useEffect(() => {    
       axios
      .get(`/api/v1/users/?${params}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));

      setUserExists(prevCheck => !prevCheck)
      setTimeout(function_name, 2000);

      

    /* if (userExists === false){
      axios
      .post("api/v1/users", { user: { artist:"k.yang256@gmail.com", profile_pic:"", description:"" } })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    } */
    },[0]);

    function function_name(){
        console.log(userExists)
    }

  
    return (
        <div></div>
    );
  
}

export default AddUser;