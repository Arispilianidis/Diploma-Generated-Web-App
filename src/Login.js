import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './components/FormikControl'
import axios from 'axios';
import './css/Login.css';


const workersURL = "http://localhost:3000/users"


function Login() {

    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    const initialValues = {
        fname: '',
        lname: '',
        email: ''
    }

    const validationSchema = Yup.object({
        fname: Yup.string().required('Required'),
        lname: Yup.string().required('Required'),
        email: Yup.string().required('Required'),

    })

    const onSubmit = loginValues => {

        console.log('Form data', loginValues)
        // console.log('Post data', post.data)


        if (authorize(loginValues, post.data)) {
            alert("Welcome " + loginValues.fname + " " + loginValues.lname)
            setTimeout(function () {
                navigate("/Processes", {state: [loginValues,post.data]});
            }, 500);
        }
        else {
            alert("You dont have access to this page")
        }
    }

    function authorize(loginValues, data) {

        var result = false

        //Search if the person trying to enter the page is registered in the model
        data.forEach(myFunction)

        return result

        //test
        function myFunction(person) {


            //TODO: search by username and password

            if ((person.name.toLowerCase() === loginValues.fname.toLowerCase())) {
                result = true
                return result
            }

        }
    }

    useEffect(() => {
        axios.get(workersURL, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
            .then(response => { setPost(response.data) })
            .catch(error => console.log("Error at get users " + error.message))
    }, [])


    //Post method for later usage
    // function createPost() {
    //     axios
    //         .post(workersURL, {
    //             name: "arisre",
    //             age: 100
    //         }, {
    //             headers: {
    //                 'Access-Control-Allow-Origin': '*',
    //                 'Content-Type': 'application/json',
    //             }
    //         })
    //         .then((response) => {
    //             window.location.reload(true);
    //         }).catch(error => console.log("Error at post users => " + error.message))
    // }
    
    return (
        <div>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    formik => <Form className="form-container">
                        <div className="imgcontainer">
                            <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" />
                        </div>
                        <FormikControl control='input' type='text' label='First Name' name='fname' placeholder="Enter First Name" />
                        <FormikControl control='input' type='text' label='Last Name' name='lname' placeholder="Enter Last Name" />
                        <FormikControl control='input' type='email' label='Email' name='email' placeholder="Enter Email" />
                        <button type='submit' disabled={!formik.isValid}> Submit</button>
                    </Form>
                }
            </Formik>

        </div>
    )

}

export default Login


