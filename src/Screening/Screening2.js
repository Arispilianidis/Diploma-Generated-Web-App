import React from 'react'
import FormikControl from '../components/FormikControl'
import { Formik, Form } from 'formik'

function Screening2(props) {

    const handleSumbit = (values) => {
        props.onSubmit(values, true)
    }

    const PRogrammingLangQuestions = ['How much experience with', 'How many projects with']
    const SpokenLangQuestions = ['How fluent in']

    console.log(props.initialValues)

    const { prevStep } = props

    return (

        <Formik initialValues={props.initialValues} validationSchema={props.validationSchema} onSubmit={handleSumbit} >
            {

                formik => <Form id="regForm">
                    <h1> Screening </h1>
                    <span>
                        <h3> Pre-Screening Questions</h3>
                        <p>Now for a more in-depth examination of their resume and cover letter. Whilst the candidate should not be judged solely on these documents, this step forms a base to compare to the later phone, video or personal screening. </p>


                        <FormikControl control='textarea' label={PRogrammingLangQuestions[0] + " HTML"} name='progrLangAnswer[0]' placeholder="Enter text here" />
                        <button type="submit"> Next</button>
                        <button type="button" className="PrevBtn" onClick={prevStep}> Back</button>

                    </span>

                </Form>
            }

        </Formik >
    )
}

export default Screening2
