import React from 'react'
import FormikControl from '../components/FormikControl'
import { Formik, Form } from 'formik'
import Proof from '../components/Proof'
import axios from 'axios'



function JobDescTemp1(props) {

  const handleSumbit = (values) => {
    props.onSubmit(values, false)
  }


  function postProof(imagefileName) {

    var uploadsPostURL = "http://localhost:3000/uploads"

    var formData = new FormData();
    var imagefile = document.getElementById(imagefileName)
    console.log(imagefile)
    formData.append("file", imagefile.files[0]);
    axios.post(uploadsPostURL, formData, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type':'multipart/form-data',
      }
    })
    .catch(error => console.log("Error at postProof => " + error.message))

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

            
            <input style={{ marginLeft: 30 }} name='proofs[0]' type='file' id='proofs[0]'  onChange={(event) => {
              formik.setFieldValue("proofs[0]",event.currentTarget.files[0])
              postProof("proofs[0]")
            }} />

            <Proof file={formik.values.proofs[0]} />
            

            <button type="submit"> Next</button>

          </span>

        </Form>
      }

    </Formik >

  )
}

export default JobDescTemp1
