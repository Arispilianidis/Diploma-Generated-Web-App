import React from 'react'
import FormikControl from '../components/FormikControl'
import { Formik, Form } from 'formik'
import Proof from '../components/Proof'


function JobDescTemp1(props) {

  const handleSumbit = (values) => {
    props.onSubmit(values, false)
  }


  return (

    <Formik initialValues={props.initialValues} validationSchema={props.validationSchema} onSubmit={handleSumbit} >
      {

        formik => <Form id="regForm">
          <h1> Job Desc Template </h1>
          <span>

            <h3> Record details</h3>

            <p>First things first record the details of your business that is hiring. Do this by using the form fields below. </p>

            <FormikControl control='input' type='text' label='Business name ' name='businessName' placeholder="Name" />

            
            <input style={{ marginLeft: 30 }} name='businessNameProof' type='file' id='businessNameProof'  onChange={(event) => {
              formik.setFieldValue("businessNameProof",event.currentTarget.files[0])
              props.postProof("businessNameProof")
            }} />

            <Proof file={formik.values.businessNameProof} />
            

            <button type="submit"> Next</button>

          </span>

        </Form>
      }

    </Formik >

  )
}

export default JobDescTemp1
