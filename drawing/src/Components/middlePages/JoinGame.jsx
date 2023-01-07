import React from "react";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button";
export default function JoinGame(){
    const onSubmit = (e) => {
        e.preventDefault()
    }   
    return(
        <div className="JoinG card">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Game Code</label>
                    <input className="form-control" placeholder="enter game code" />
                    <div className="d-grid gap-2">
                        <Button variant="primary" size="lg">
                            Join
                        </Button>
                    </div>
                    
                </div>
            </form>
        </div>
    )
}