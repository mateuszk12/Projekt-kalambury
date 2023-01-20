import React from "react";
import {Formik,Field,Form} from "formik"
import { useEffect,useState,UseRef } from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios"
import * as Yup from 'yup'

export default function Register(props){
    const [res,setRes] = useState("")
    const RegisterSchema = Yup.object().shape({
            username: Yup.string()
            .min(3,"min 3 characters expected")
            .max(20,"max 20 characters expected")
            .required('Username required'),
            password: Yup.string()
            .max(30,"30 character max")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character")
            .required('Password required')
        });
    return(
        <div className="Register">
            <Button className = "btn-close text-end" aria-label="Close" onClick={props.handleClosing}></Button>
            <h1>Register</h1>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validationSchema={RegisterSchema}
                onSubmit={async (values,{resetForm}) => {
                    const json = JSON.stringify(values)
                    try{
                        const res = await axios.post('http://localhost:3001/register', 
                            json,
                            {
                                headers: {'Content-Type':'application/json'},
                                withCredentials:true
                            }
                        )
                    } catch (err){
                        if (err.response.status === 409){
                            setRes("konto o podanej nazwie użytkownika istnieje")
                        }
                    }
                    
                    resetForm()
                }}            
            >
            {props =>( <Form className = {"RegisterForm"}>
                <label className="form-label">Username</label>
                <Field
                    className="form-control"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter Username"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    values={props.values.username}
                />
                {props.errors.username && props.touched.username?(<div>{props.errors.username}</div>):null}
                <label className="form-label">Password</label>
                <Field
                    className="form-control"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    values={props.values.password}
                />
                {props.errors.password && props.touched.password?(<div>{props.errors.password}</div>):null}
                <Button className="registerBtn" size="lg" type={"submit"}>Register</Button>
                
            </Form>)}
            </Formik>
            <div>
                {res}
            </div>
        </div>
    )
}