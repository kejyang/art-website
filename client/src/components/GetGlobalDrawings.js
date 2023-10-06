import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import "./Card.css"
import { withAuth0 } from "@auth0/auth0-react";


const GetGlobalDrawings = () =>  {


    const [tempArr, setTempArr] = useState([]);

    /* const queryParams = {
        artist: "test",
      }; 

    const params = new URLSearchParams(queryParams);*/
    
    useEffect(() => {
        axios
        .get(`/api/v1/drawings/`)
        .then((response) => {
            console.log(response);
            setTempArr(response.data);
        })
      .catch((error) => console.log(error));
    }, []);


  
    return (
        <section className="cards-list">
            {tempArr.map((x) => (
                <Card 
                    key = {x.id}
                    id = {x.id}
                    picture = {x.picture}
                    title = {x.title}
                    artist = {x.artist}
                />
            ))}
        </section>
    );
  
}

export default GetGlobalDrawings;