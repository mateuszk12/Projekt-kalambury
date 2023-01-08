import React from "react";

export default function Message(props){
    return(
        <div className="Message">
            <div>{props.user}</div>
            <div>{props.message}</div>
        </div>
    )
}