import React from "react";
import {Formik,Form,Field} from "formik"
import { useNavigate } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux";
import {login} from "../../appState/features/auth"
import jwtDecode from "jwt-decode";
import axios from "axios";
import Button from 'react-bootstrap/Button';

export default function Login(){
    const lang = useSelector((state) => state.customize.lang)
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
                            sessionStorage.setItem("token",res.data)
                            const decoded = jwtDecode(res.data)
                            const roles = []
                            if (decoded.roles.user === 1){
                                roles.push("user")
                            }
                            if (decoded.roles.admin === 1){
                                roles.push("admin")
                            }
                            dispatch(login({username:decoded.username,token:res.data,roles:roles}))
                            navigate("/kalambury")
                            
                        })
                        .catch((err) => {
                            navigate("/")
                        })
                    
                    // resetForm()
                }}            
            >
            {props =>( <Form className = {"LoginForm"}>
                <div className="mb-3">
                <label className="form-label">{lang ? "Nazwa użytkownika" :"Username"}</label>
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
                
                
                
                <label className="form-label">{lang ? "hasło" :"password"}</label>
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
                <Button className="loginBtn" variant="dark" size="lg" type={"submit"}>{lang ? "zaloguj" :"login"}</Button>
                
            </Form>)}
            </Formik>
        </div>
    )
}