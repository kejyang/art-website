import React from "react"
import {  Link } from "react-router-dom";
import ViewDrawing from "./ViewDrawing";
import './Card.css'

export default function Card(props) {
    return (
        <div className="card--global">
            <Link to={`/ViewDrawing/${props.id}`} state={{picture: props.picture, title: props.title}}>
                <img src={props.picture} className="card--image" />
            </Link>
            <Link to={`/ViewDrawing/${props.id}`} state={{picture: props.picture, title: props.title}}  className="my--card--title">
                <div>{props.title}</div>
            </Link>
            <Link to={`/OtherUsersPage/`} state={{artist: props.artist}}  className="card--artist">
                <div >{props.artist}</div>
            </Link>
        </div>
    )
}