import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import "./Card.css"
import { useParams } from "react-router-dom"
import { withAuth0 } from "@auth0/auth0-react";


const SearchPage = () =>  {


    const [tempArr, setTempArr] = useState([]);
    let { searchParams } = useParams();

    /* const queryParams = {
        artist: "test",
      }; 

    const params = new URLSearchParams(queryParams);*/
    
    useEffect(() => {
      (async()=>{
        
        let tag_id  = await tagGetId();
        debugger;
        let drawing_id = await tagDrawingGet(tag_id);
        let results_array = await drawingGet(drawing_id);
        setTempArr(results_array);
      })(); 
    },[0]);

    async function titleGet(){
        const response= axios
        .get(`/api/v1/drawings/?title=${searchParams}`)
        .then((response) => {
            console.log(response);
            setTempArr(response.data);
        })
      .catch((error) => console.log(error));
      return response.data;
    }

    async function tagGetId () {
        axios
        .get(`/api/v1/tags/?tag=${searchParams}`)
        .then((response)=>{
          return response.data[0].id;
        })
        .catch((error) => console.log(error)); 
      } 

    async function tagDrawingGet (id) {
        const response = await axios
        .get(`/api/v1/tag_drawings/?tag_id=${id}`)
        .catch((error) => console.log(error)); 
        return response.data[0].drawing_id;
    }   

    async function drawingGet (id) {
        const response = await axios
        .get(`/api/v1/drawings/${id}`)
        .catch((error) => console.log(error)); 
        let result = [response.data];
        return result;
    }   
  
    return (
      <div>
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
      </div>
    );
  
}

export default SearchPage;