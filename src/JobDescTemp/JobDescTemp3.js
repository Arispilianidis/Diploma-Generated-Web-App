import React from 'react'
import FormikControl from '../components/FormikControl'
import { Formik, Form } from 'formik'
import Proof from '../components/Proof'


function JobDescTemp3(props) {

  const handleSumbit = (values) => {
    props.onSubmit(values, true)
  }

  const checkOptions1 = [
    {key: 'HTML', value: 'HTML'},
    {key: 'CSS', value: 'CSS'},
    {key: 'JavaScript', value: 'JavaScript'},
    {key: 'C/C++', value: 'C/C++'},
    {key: 'React', value: 'React'},
  ]



  const { prevStep } = props

 return (

    <Formik initialValues={props.initialValues} validationSchema={props.validationSchema} onSubmit={handleSumbit} >
      {

        formik => <Form id="regForm">
          <h1> JobDescTemp Overview </h1>
          <span>

            <h3> Decide the position title</h3>

            <p> The first thing that catches a candidate's eye when they are job hunting is the job title. This will give them a rough idea of what the position's responsibilities will include and if they are able to fill it. </p>

						<FormikControl control='checkbox' label="Jot down language responsibilities" name='check1' id="checkOptions1" options={checkOptions1}/>
			
            <button type="submit"> Next</button>
						<button type="button" className="PrevBtn" onClick={prevStep}> Back</button>

          </span>

        </Form>
      }

    </Formik >
  )
}

export default JobDescTemp3

