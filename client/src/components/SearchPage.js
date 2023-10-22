import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import "./Card.css"
import { useParams } from "react-router-dom"
import { withAuth0 } from "@auth0/auth0-react";


const SearchPage = () =>  {

    const [titleArray, setTitleArray] = useState([]);
    const [tempArr, setTempArr] = useState([]);
    let { searchParams } = useParams();

    /* const queryParams = {
        artist: "test",
      }; 

    const params = new URLSearchParams(queryParams);*/
    
    useEffect(() => {
      (async()=>{
        const [tag_arr, drawing_by_title_arr] = await Promise.all([
          tagGetId(),
          titleGet()
        ]);  
        if((tag_arr[0] !== undefined) && (drawing_by_title_arr[0] !== undefined)){
          const result = [...new Set([...tag_arr, ...drawing_by_title_arr])];
          setTempArr(result);
        }
        else if((tag_arr[0] !== undefined)){
          let drawing_id = await tagDrawingGet(tag_arr[0].id);
          let results_array = await drawingGet(drawing_id);
          setTempArr(results_array); 
        }
          
        else if((drawing_by_title_arr !== undefined)){
          setTempArr(drawing_by_title_arr); 
        }

        else{
          setTempArr([]);
        }
      })(); 
    },[0]);

    async function titleGet(){
      const response = await axios
      .get(`http://localhost:3001/api/v1/drawings/?title=${searchParams}`)
      .catch((error) => console.log(error));
      return response.data;
    }

    /* async function tagGetId () {
        axios
        .get(`/api/v1/tags/?tag=${searchParams}`)
        .then((response)=>{
          return response.data[0].id;
        })
        .catch((error) => console.log(error)); 
      }  */
      async function tagGetId () {
        const response = await axios
        .get(`http://localhost:3001/api/v1/tags/?tag=${searchParams}`)
        .catch((error) => console.log(error)); 
        return response.data;
      } 

    async function tagDrawingGet (id) {
        const response = await axios
        .get(`http://localhost:3001/api/v1/tag_drawings/?tag_id=${id}`)
        .catch((error) => console.log(error)); 
        return response.data[0].drawing_id;
    }   

    async function drawingGet (id) {
        const response = await axios
        .get(`http://localhost:3001/api/v1/drawings/${id}`)
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