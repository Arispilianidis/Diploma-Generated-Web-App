import React from 'react'
import FormikControl from '../components/FormikControl'
import { Formik, Form } from 'formik'
import Proof from '../components/Proof'
import Rating from 'react-rating-tooltip'
import '../css/Rating.css'

function Screening1(props) {


  const handleSumbit = (values) => {
	props.onSubmit(values, false)
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
				max = {3}
				tooltipContent={[ "1", "2", "3" ]}
				ratingValue={[ "1", "2", "3" ]}
				onChange={(rate) => { props.handleRating(rate/3 * 100, 'input3Rating') }}
				disabled={false}
				counterPosition={"left"}
				textPosition={"right"}
				ActiveComponent={
					<i className="fa fa-star starStyle"  />
				}
				InActiveComponent={
					<i className="fa fa-star-o starStyle" />
				}
             	/>
			<FormikControl control='input' type='text' label='Candidate Lastname' name='input6' placeholder="Lastname" />
			<FormikControl control='input' type='email' label='Candidate Email' name='input4' placeholder="Email" />
			<FormikControl control ='date' label='Candidate Date Applied' name='date1'/>
			<label htmlFor="input5" style={{ marginLeft: 10 }}><b>Candidate Resume</b></label>
							<input style={{ marginLeft: 20 }} name='input5' type='file' id='input5'  onChange={(event) => {
			  	  		  	  formik.setFieldValue("input5",event.currentTarget.files[0])
			  	  		  	  props.postProof("input5")
							}} />


            <button type="submit"> Next</button>

          </span>

        </Form>
      }

    </Formik >

  )
}

export default Screening1

