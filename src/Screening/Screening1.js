import React from 'react'
import FormikControl from '../components/FormikControl'
import { Formik, Form } from 'formik'
import axios from 'axios'

function Screening1(props) {

    const handleSumbit = (values) => {
        props.onSubmit(values, false)
    }


    function postResume(fileName) {

        var ResumePostURL = "http://localhost:3000/resume"

        var formData = new FormData();
        var imagefile = document.getElementById(fileName)
        console.log(imagefile)
        formData.append("file", imagefile.files[0]);
        console.log(formData)
        axios.post(ResumePostURL, formData, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'multipart/form-data',
            }
        })
            .catch(error => console.log("Error at postResume => " + error.message))
    }

    return (

        <Formik initialValues={props.initialValues} validationSchema={props.validationSchema} onSubmit={handleSumbit} >
            {

                formik => <Form id="regForm">
                    <h1> Screening </h1>
                    <span>

                        <h3> Look for the minimum requirements</h3>

                        <p>Once the candidate has applied, you can begin to assess their suitability for the position. The first and most basic thing to look for in their resume is that they meet the minimum requirements for the position being filled.
                            Record the details of the candidate and application in general using the form fields below.</p>

                        <FormikControl control='input' type='text' label='Candidate Name ' name='candidateName' placeholder="Name" />
                        <FormikControl control='input' type='text' label='Candidate Email ' name='candidateEmail' />
                        <FormikControl control='date' label='Candidate Date Applied' name='dateApplied' />


                        <label htmlFor="candidateResume" style={{marginLeft:10}}><b>Candidate Resume</b></label>
                        <input style={{ marginLeft: 20 }} name='candidateResume' type='file' id='candidateResume' onChange={(event) => {
                            formik.setFieldValue("candidateResume", event.currentTarget.files[0])
                            postResume("candidateResume")
                        }} />

                        <button type="submit"> Next</button>

                    </span>

                </Form>
            }

        </Formik >
    )
}

export default Screening1
