import React from "react";
import {Formik,Form,Field} from "formik"
import { useNavigate } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux";
import {login} from "../../appState/features/auth"
import axios from "axios";
import Button from 'react-bootstrap/Button';

export default function Login(){
    const username = useSelector((state) => state.auth.username)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return(
        <div className="Login">
            <h1>Login</h1>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                onSubmit={(values) => {
                    const json = JSON.stringify(values)
                    axios.post("http://localhost:3001/login",
                    json,{
                        headers: {'Content-Type':'application/json'},
                    }
                    )
                        .then((res) => {
                            dispatch(login({username:res.data.username,token:res.data.Atoken}))
                            navigate("/kalambury")
                            
                        })
                        .catch((err) => {
                            navigate("/")
                            console.log(err)
                        })
                    
                    // resetForm()
                }}            
            >
            {props =>( <Form className = {"LoginForm"}>
                <div className="mb-3">
                <label className="form-label">Username</label>
                <Field
                    className="form-control"
                    placeholder="Enter Username"
                    type="text"
                    id="username"
                    name="username"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    values={props.values.username}
                />
                {props.errors.username && props.touched.username?(<div>{props.errors.username}</div>):null}
                
                
                
                <label className="form-label">Password</label>
                <Field
                    className="form-control"
                    placeholder="Enter Password"
                    type="password"
                    id="password"
                    name="password"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    values={props.values.password}
                />
                
                {props.errors.password && props.touched.password?(<div>{props.errors.password}</div>):null}
                </div>
                <Button className="loginBtn" variant="primary" size="lg" type={"submit"}>Login</Button>
                
            </Form>)}
            </Formik>
        </div>
    )
}