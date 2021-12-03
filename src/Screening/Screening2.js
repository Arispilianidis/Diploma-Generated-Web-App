import React, { useState, useEffect } from 'react';
import FormikControl from '../components/FormikControl'
import { Formik, Form } from 'formik'
import axios from 'axios';

function Screening2(props) {

    var counter = 0
    var secondCounter = 0
    const handleSumbit = (values) => {
        counter = 0
        secondCounter = 0
        props.onSubmit(values, true)
    }

    const [answers, setAnswers] = useState(null);
    const [loading, setLoading] = useState(false);



    var lengthOfQuestionType = 2
    const JobDescTempQuestionsURL = "http://localhost:3000/JobDescTemp" //TODO: 8a dimiourgite analoga to JobDescTemp poy exei to Screening


    // const answers = ["HTML", "CSS", "JS", "STH"]
    useEffect(() => {
        setLoading(true)
        axios.get(JobDescTempQuestionsURL, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
            .then(response => { setAnswers(response.data.data) })
            .then(() => setLoading(false))
            .catch(error => console.log("Error at get Job Description Questions " + error.message))
    }, [])


    function getprogLangResponsibilitiesAnswer() {
        //TODO: get the users answer for progrraming lang e.g HTML, CSS with axios

        var progLangResponsibilities = answers.progLangResponsibilities

        if (counter === (lengthOfQuestionType * progLangResponsibilities.length)) 
        {
            counter = 0
            secondCounter = 0
        }
        // console.log(counter)

        if (counter % (lengthOfQuestionType) === 0) {
            secondCounter++
        }
        // console.log(secondCounter)

        counter++
        return progLangResponsibilities[secondCounter - 1]

    }

    const PRogrammingLangQuestions = ['How much experience with\t', 'How many projects with\t']
    // const SpokenLangQuestions = ['How fluent in']

    const { prevStep } = props

    if (loading) return <h1>Loading...</h1>;

    if (!answers) return null;

    return (

        <Formik initialValues={props.initialValues} validationSchema={props.validationSchema} onSubmit={handleSumbit} >
            {

                formik => <Form id="regForm">
                    <h1> Screening Overview </h1>
                    <span>
                        <h3> Pre-Screening Questions</h3>
                        <p>Now for a more in-depth examination of their resume and cover letter. Whilst the candidate should not be judged solely on these documents, this step forms a base to compare to the later phone, video or personal screening. </p>


                        <FormikControl control='textarea' label={PRogrammingLangQuestions[0] + getprogLangResponsibilitiesAnswer()} name='progrLangAnswer[0]' placeholder="Enter text here" />
                        <FormikControl control='textarea' label={PRogrammingLangQuestions[1] + getprogLangResponsibilitiesAnswer()} name='progrLangAnswer[1]' placeholder="Enter text here" />
                        <FormikControl control='textarea' label={PRogrammingLangQuestions[0] + getprogLangResponsibilitiesAnswer()} name='progrLangAnswer[2]' placeholder="Enter text here" />
                        <FormikControl control='textarea' label={PRogrammingLangQuestions[1] + getprogLangResponsibilitiesAnswer()} name='progrLangAnswer[3]' placeholder="Enter text here" />
                        <FormikControl control='textarea' label={PRogrammingLangQuestions[0] + getprogLangResponsibilitiesAnswer()} name='progrLangAnswer[4]' placeholder="Enter text here" />
                        <FormikControl control='textarea' label={PRogrammingLangQuestions[1] + getprogLangResponsibilitiesAnswer()} name='progrLangAnswer[5]' placeholder="Enter text here" />
                        <button type="submit"> Next</button>
                        <button type="button" className="PrevBtn" onClick={prevStep}> Back</button>

                    </span>

                </Form>
            }

        </Formik >
    )
}

export default Screening2
