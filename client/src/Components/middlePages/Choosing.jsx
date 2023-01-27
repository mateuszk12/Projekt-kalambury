import React from "react";
import CreateGame from "./CreateGame";
import JoinGame from "./JoinGame";
import UserPanel from "./UserPanel";
import Col from 'react-bootstrap/Col';
export default function Choosing()  {
    return(
        <div className="Choosing">
            <Col className="col-md-7">
                <UserPanel/>
            </Col>
            <Col className="col-md-4">
                <JoinGame/>
                <CreateGame/>
            </Col> 
        </div>
    )
}