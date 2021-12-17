import React from 'react'
import FormikControl from '../components/FormikControl'
import { Formik, Form } from 'formik'
import Proof from '../components/Proof'


function JobDescTemp2(props) {

  const handleSumbit = (values) => {
    props.onSubmit(values, false)
  }




  const { prevStep } = props

 return (

    <Formik initialValues={props.initialValues} validationSchema={props.validationSchema} onSubmit={handleSumbit} >
      {

        formik => <Form id="regForm">
          <h1> JobDescTemp Overview </h1>
          <span>

            <h3> Gather job information</h3>

            <p> You will need to find out the information regarding the job role.</p>

						<FormikControl control='input' type='number' label='Salary' name='input2' placeholder="" />

						<FormikControl control ='textarea' label='Summary Of The Job' name='textarea1' placeholder="Enter text here..." />
			
            <button type="submit"> Next</button>
						<button type="button" className="PrevBtn" onClick={prevStep}> Back</button>

          </span>

        </Form>
      }

    </Formik >
  )
}

export default JobDescTemp2

