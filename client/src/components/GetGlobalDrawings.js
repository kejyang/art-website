import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import "./Card.css"
import { useAuth0 } from "@auth0/auth0-react";


const GetGlobalDrawings = () =>  {


    const [tempArr, setTempArr] = useState([]);
    const { user, isAuthenticated} = useAuth0();

    /* const queryParams = {
        artist: "test",
      }; 

    const params = new URLSearchParams(queryParams);*/
    
    useEffect(() => {
        axios
        .get(`https://art-website.onrender.com/api/v1/drawings/`)
        .then((response) => {
            console.log(response.data);
            setTempArr(response.data);
        })
      .catch((error) => console.log(error));
      if(isAuthenticated){
        axios
        .post("https://art-website.onrender.com/api/v1/users", { user: { artist:user.email, profile_pic:"", description:"" } })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      } 
    }, [isAuthenticated]);


  
    return (
        <div>
          <p className="works-class">Works</p>
          <section className="cards-list">
              {tempArr.map((x) => (
                  <Card 
                      key = {x.id}
                      id = {x.id}
                      picture = {x.picture}
                      title = {x.title}
                      artist = {x.artist}
                      description = {x.description}
                  />
              ))}  
          </section>
        </div>
    );
  
}

export default GetGlobalDrawings;