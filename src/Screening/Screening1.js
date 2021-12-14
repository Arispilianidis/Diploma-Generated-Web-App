import React from 'react'
import FormikControl from '../components/FormikControl'
import { Formik, Form } from 'formik'
import { Rating } from 'react-simple-star-rating'


function Screening1(props) {

    console.log(props.initialValues)

    const handleSumbit = (values) => {
        props.onSubmit(values, false)
    }

    return (

        <Formik initialValues={props.initialValues} validationSchema={props.validationSchema} onSubmit={handleSumbit} >
            {

                formik => <Form id="regForm">
                    <h1> Screening Overview </h1>
                    <span>

                        <h3> Look for the minimum requirements</h3>

                        <p>Once the candidate has applied, you can begin to assess their suitability for the position. The first and most basic thing to look for in their resume is that they meet the minimum requirements for the position being filled.
                            Record the details of the candidate and application in general using the form fields below.</p>

                        <FormikControl control='input' type='text' label='Candidate Name ' name='candidateName' placeholder="Name" />
                        <Rating
                            onClick={(rate) => { props.handleRating(rate, 'candidateNameRating'); }}
                            size={30}
                        />
                        <FormikControl control='input' type='text' label='Candidate Email ' name='candidateEmail' />
                        <Rating
                            onClick={(rate) => { props.handleRating(rate, 'candidateEmailRating'); }}
                            size={30}
                        />
                        <FormikControl control='date' label='Candidate Date Applied' name='dateApplied' />

                        <label htmlFor="candidateResume" style={{ marginLeft: 10 }}><b>Candidate Resume</b></label>
                        <input style={{ marginLeft: 20 }} name='candidateResume' type='file' id='candidateResume' onChange={(event) => {
                            formik.setFieldValue("candidateResume", event.currentTarget.files[0])
                            props.postProof("candidateResume")
                        }} />

                        <button type="submit"> Next</button>

                    </span>

                </Form>
            }

        </Formik >
    )
}

export default Screening1
