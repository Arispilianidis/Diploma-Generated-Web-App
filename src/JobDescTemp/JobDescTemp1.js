import React from 'react'
import FormikControl from '../components/FormikControl'
import { Formik, Form } from 'formik'
import Proof from '../components/Proof'


function JobDescTemp1(props) {

  const handleSumbit = (values) => {
    props.onSubmit(values, false)
  }

const radioOption1 = [
    {key: 'English', value: 'English'},
    {key: 'German', value: 'German'},
    {key: 'Armenina', value: 'Armenina'},
  ]

  const dropOptions1 = [
    {key: 'red', value: 'red'},
    {key: 'green', value: 'green'},
    {key: 'blue', value: 'blue'},
    {key: 'cyan', value: 'cyan'},
  ]



 return (

    <Formik initialValues={props.initialValues} validationSchema={props.validationSchema} onSubmit={handleSumbit} >
      {

        formik => <Form id="regForm">
          <h1> JobDescTemp Overview </h1>
          <span>

            <h3> Record details</h3>

            <p> First things first record the details of your business that is hiring. Do this by using the form fields below.</p>

						<FormikControl control='input' type='text' label='Business name' name='bussinessName' placeholder="Name" />
						<input style={{ marginLeft: 20 }} name='bussinessNameProof' type='file' id='bussinessNameProof'  onChange={(event) => {
						  formik.setFieldValue("bussinessNameProof",event.currentTarget.files[0])
						  props.postProof("bussinessNameProof")
						}} />
						
						<Proof file={formik.values.bussinessNameProof} />

						<FormikControl control ='radio' label='Which language do you prefer?' name='radio1' options={radioOption1}/>

						<FormikControl control ='select' label='Choose favorite color:' name='drop1' options={dropOptions1} />
						<input style={{ marginLeft: 20 }} name='drop1Proof' type='file' id='drop1Proof'  onChange={(event) => {
						  formik.setFieldValue("drop1Proof",event.currentTarget.files[0])
						  props.postProof("drop1Proof")
						}} />
						
						<Proof file={formik.values.drop1Proof} />
			
            <button type="submit"> Next</button>

          </span>

        </Form>
      }

    </Formik >
  )
}

export default JobDescTemp1

