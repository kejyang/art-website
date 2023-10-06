import React, { Component, useState, useEffect } from "react"
import "./Image.css"
import { useParams, useLocation } from "react-router-dom"

export default function ViewDrawing(){


    const location = useLocation();
    const { picture } = location.state



    return(
        <div className = "container">
          <img src={picture} alt="View Drawing" className = "image"/> 
        </div>
    )
}