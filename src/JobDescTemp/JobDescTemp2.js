import React from 'react'
import FormikControl from '../components/FormikControl'
import { Formik, Form } from 'formik'

function JobDescTemp2(props) {

  const handleSumbit = (values) => {
    props.onSubmit(values, false)
  }


  const { prevStep } = props

  return (

    <Formik initialValues={props.initialValues} validationSchema={props.validationSchema} onSubmit={handleSumbit} >
      {

        formik => <Form id="regForm">
          <h1> Job Desc Template </h1>
          <span>
            <h3>Gather job information</h3>
            <p>You will need to find out the information regarding the job role.
               You will have to speak to the manager of the hiring department (IT, sales, customer support)
               and gather the information you need to post the job. </p>

            <FormikControl control='input' type='text' label='Job Location' name='location' placeholder="Location" />
            <FormikControl control='input' type='number' label='Salary' name='salary' placeholder="Salary" />
            <FormikControl control='textarea' label='Summary Of The Job' name='description' placeholder="Summary" />

            <button type="submit"> Next</button>
            <button type="button" className="PrevBtn" onClick={prevStep}> Back</button>

          </span>

        </Form>
      }

    </Formik >
  )
}

export default JobDescTemp2