import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import "./Card.css"
import { Link } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import { useAuth0 } from "@auth0/auth0-react";

const UserPage = () =>  {


    const [tempArr, setTempArr] = useState([]);
    const { user, isAuthenticated} = useAuth0();

    /* const queryParams = {
        artist: "test",
      }; 

    const params = new URLSearchParams(queryParams);*/
    
    useEffect(() => {
      if(isAuthenticated){
          axios
          .get(`https://art-website.onrender.com/api/v1/drawings/?artist=${user.email}`)
          .then((response) => {
              console.log(response);
              setTempArr(response.data);
          })
        .catch((error) => console.log(error));
      }
    }, [isAuthenticated]);


  
    return (
        isAuthenticated && (
          <div>
            <Link to="/AddTagsDrawings" className="btn btn-primary upload-drawing">Add A Drawing</Link>
            <p className="works-class">Your Works</p>
              <section className="cards-list">
                  {tempArr.map((x) => (
                      <Card 
                          key = {x.id}
                          id = {x.id}
                          picture = {x.picture}
                          title = {x.title}
                      />
                  ))}
              </section>
          </div>
        )
    );
  
}

export default UserPage;