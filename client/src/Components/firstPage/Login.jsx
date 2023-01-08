import React from "react";
import {Formik,Form,Field} from "formik"
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
export default function Login(){

    return(
        <div className="Login">
            <h1>Login</h1>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                onSubmit={(values,{resetForm,preventDefault}) => {
                    console.log(values)
                    resetForm()
                }}            
            >
            {props =>( <Form className = {"LoginForm"}>
                
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
                <Link to="kalambury">
                <Button className="loginBtn" size="lg" type={"submit"}>Login</Button>
                </Link>
                
            </Form>)}
            </Formik>
        </div>
    )
}