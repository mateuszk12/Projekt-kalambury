import React from "react";
import {Formik,Field,Form} from "formik"
import {useState} from "react";
import { useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import axios from "axios"
import * as Yup from 'yup'

export default function Register(props){
    const [res,setRes] = useState("")
    const lang = useSelector((state) => state.customize.lang)
    const RegisterSchema = Yup.object().shape({
            username: Yup.string()
            .min(3,"min 3 characters expected")
            .max(20,"max 20 characters expected")
            .required('Username required'),
            password: Yup.string()
            .max(30,"30 character max")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            lang ? "Musi zawierać co najmniej 8 znaków, jedną dużą, jedna małą,jedną cyfrę i jeden znak specjalny" :"Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character")
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
                    role:'',
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
                <label className="form-label">{lang? "Nazwa uzytkownika":"Username"}</label>
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
                <label className="form-label">{lang? "Hasło":"Password"}</label>
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
                <Button className="registerBtn" size="lg" variant="dark" type={"submit"}>{lang? "Zarejestruj":"Register"}</Button>
            </Form>)}
            </Formik>
            <div>
                {res}
            </div>
        </div>
    )
}