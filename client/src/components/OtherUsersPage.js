import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import { useParams, useLocation } from "react-router-dom"
import "./Card.css"
import { Link } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import { useAuth0 } from "@auth0/auth0-react";

const OtherUsersPage = () =>  {


    const [tempArr, setTempArr] = useState([]);
    const location = useLocation();
    const { artist } = location.state


    /* const queryParams = {
        artist: "test",
      }; 

    const params = new URLSearchParams(queryParams);*/
    
    useEffect(() => {

          axios
          .get(`/api/v1/drawings/?artist=${artist}`)
          .then((response) => {
              console.log(response);
              setTempArr(response.data);
          })
        .catch((error) => console.log(error));
      
    }, [0]);


  
    return (
        <div>
            <p className="works-class">{artist}'s Works</p>
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
    );
  
}

export default OtherUsersPage;