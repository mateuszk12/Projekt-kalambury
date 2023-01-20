import React from "react";
// import { useState } from "react";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
export default function CreateGame(){
    const onSubmit = (e) => {
        e.preventDefault()
    } 
    return(
        <Card className="JoinG">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Create Game</label>
                        <input type="text" className="form-control" placeholder="how many people?" />
                        <Link to="game" className="d-grid gap-2">
                            <Button variant="primary" size="lg">
                                Create
                            </Button>
                        </Link>                
                </div>
                <div className="form-group">
                    tutaj pojawia się nazwa pokoju
                </div>
            </form>
        </Card>
    )
}