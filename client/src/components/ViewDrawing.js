import React, { Component, useState, useEffect } from "react"
import "./Image.css"
import { useParams, useLocation } from "react-router-dom"

export default function ViewDrawing(){

    const [clicked, setClicked] = useState(false);
    const location = useLocation();
    const { picture , title} = location.state

    function handleOnClick(){
      setClicked(prevState=>!prevState);
    }

    return(
      
        <div className = "drawing--container">
          <img src={picture} alt="View Drawing" className = {`${clicked ? "original":"image"}`} onClick={handleOnClick}/> 
          <div className="drawing--title">{title}</div>
        </div>
        
    )
}