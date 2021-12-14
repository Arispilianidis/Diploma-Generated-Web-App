import React, { useState, useEffect } from 'react';
import FormikControl from '../components/FormikControl'
import { Formik, Form } from 'formik'
import axios from 'axios';

const JobDescTempQuestionsURL = "http://localhost:3000/JobDescTemp" //dimiourgite analoga to JobDescTemp poy exei to Screening
const PRogrammingLangQuestions = ['How much experience with ', 'How many projects with ']


function Screening2(props) {

    console.log(props.initialValues)

    const handleSumbit = (values) => {
        props.onSubmit(values, true)
    }

    const [answers, setAnswers] = useState(null);
    const [loading, setLoading] = useState(false);
    var allprogrQuestions = []

    useEffect(() => {
        setLoading(true)
        axios.get(JobDescTempQuestionsURL, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                setAnswers(response.data.data)
            })
            .then(() => setLoading(false))
            .catch(error => console.log("Error at get Job Description Questions " + error.message))
    }, [])

    const { prevStep } = props

    if (loading) return <h1>Loading...</h1>;

    if (!answers) {
        return null
    }
    else {

        let progLangResponsibilities = answers.progLangResponsibilities
        // console.log(progLangResponsibilities)
        for (let a of progLangResponsibilities) {
            for (let q of PRogrammingLangQuestions) {
                allprogrQuestions.push(q + a)
            }
        }

    }

    function getQuestions(qArray) {

        return qArray.map((Item, index) => {
            return (
                <FormikControl key={Item} control='textarea' label={Item} name={`progrLangAnswer[${index}]`} required placeholder="Enter text here" />
            );
        })
    }

    return (

        <Formik initialValues={props.initialValues} validationSchema={props.validationSchema} onSubmit={handleSumbit} >
            {

                formik => <Form id="regForm">
                    <h1> Screening Overview </h1>
                    <span>
                        <h3> Pre-Screening Questions</h3>
                        <p>Now for a more in-depth examination of their resume and cover letter. Whilst the candidate should not be judged solely on these documents, this step forms a base to compare to the later phone, video or personal screening. </p>

                        {getQuestions(allprogrQuestions)}

                        <button type="submit"> Next</button>
                        <button type="button" className="PrevBtn" onClick={prevStep}> Back</button>

                    </span>

                </Form>
            }

        </Formik >
    )
}

export default Screening2
