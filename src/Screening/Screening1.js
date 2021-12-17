import React from 'react'
import FormikControl from '../components/FormikControl'
import { Formik, Form } from 'formik'
import Proof from '../components/Proof'
import { Rating } from 'react-simple-star-rating'


function Screening1(props) {

  const handleSumbit = (values) => {
	props.onSubmit(values, false)
  }


  function toArray(aVar){

    if(typeof(aVar)==='string'){
      aVar = [aVar]
    }
    return aVar
  }







 return (

    <Formik initialValues={props.initialValues} validationSchema={props.validationSchema} onSubmit={handleSumbit} >
      {

        formik => <Form id="regForm">
          <h1> Screening Overview </h1>
          <span>

            <h3> Look for the minimum requirements</h3>

            <p> Once the candidate has applied, you can begin to assess their suitability for the position. The first and most basic thing to look for in their resume is that they meet the minimum requirements for the position being filled. Record the details of the candidate and application in general using the form fields below.</p>

			<FormikControl control='input' type='text' label='Candidate Name' name='input3' placeholder="Name" />
				<Rating
             	onClick={(rate) => { props.handleRating(rate, 'input3Rating'); }}
             	size={30}
             	/>
			<FormikControl control='input' type='email' label='Candidate Email' name='input4' placeholder="" />
				<Rating
             	onClick={(rate) => { props.handleRating(rate, 'input4Rating'); }}
             	size={30}
             	/>
			<FormikControl control ='date' label='Candidate Date Applied' name='date1'/>
				<Rating
             	onClick={(rate) => { props.handleRating(rate, 'date1Rating'); }}
             	size={30}
             	/>
			<label htmlFor="input5" style={{ marginLeft: 10 }}><b>Candidate Resume</b></label>
								<input style={{ marginLeft: 20 }} name='input5' type='file' id='input5' required onChange={(event) => {
				  	  		  	  formik.setFieldValue("input5",event.currentTarget.files[0])
				  	  		  	  props.postProof("input5")
								}} />
				<Rating
             	onClick={(rate) => { props.handleRating(rate, 'input5Rating'); }}
             	size={30}
             	/>


			
            <button type="submit"> Next</button>

          </span>

        </Form>
      }

    </Formik >

  )
}

export default Screening1

