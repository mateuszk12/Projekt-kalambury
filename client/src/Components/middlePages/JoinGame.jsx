import React from "react";
import Card from "react-bootstrap/Card"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button";
export default function JoinGame(){
    const onSubmit = (e) => {
        e.preventDefault()
    }   
    return(
        <Card className="JoinG">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Game Code</label>
                    <input className="form-control" placeholder="enter game code" />
                        <Link to="game" className="d-grid gap-2">
                            <Button variant="primary" size="lg">
                                Join
                            </Button>
                        </Link>                
                </div>
            </form>
        </Card>
    )
}