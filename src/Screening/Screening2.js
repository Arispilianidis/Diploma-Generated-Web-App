import React from 'react'
import FormikControl from '../components/FormikControl'
import { Formik, Form } from 'formik'
import Proof from '../components/Proof'
import { Rating } from 'react-simple-star-rating'
import {useState, useEffect } from 'react'
import axios from 'axios'

const JobDescTempQuestionsURL = "http://localhost:3000/JobDescTemp"
const ProgrammingLanguageQuestions = [
	"How much experience with ",
	"How many projects with ",
]
const EducationQuestions = [
	"Biggest degree of ",
]
const SpokenLanguageQuestions = [
	"What kind of diploma with ",
]


function Screening2(props) {

  const handleSumbit = (values) => {
	props.onSubmit(values, true)
  }


  function toArray(aVar){

    if(typeof(aVar)==='string'){
      aVar = [aVar]
    }
    return aVar
  }

  const [answers, setAnswers] = useState(null);
  const [loading, setLoading] = useState(false);

  var allProgrammingLanguageQuestions = []
  var allEducationQuestions = []
  var allSpokenLanguageQuestions = []

  useEffect(() => {
	setLoading(true)
	axios.get(JobDescTempQuestionsURL, {
	    method: 'GET',
	    headers: {
	        'Access-Control-Allow-Origin': '*',
	        'Content-Type': 'application/json',
	    }
	})
	 .then(response => {
	      setAnswers(response.data.data)
	  })
	    .then(() => setLoading(false))
	    .catch(error => console.log("Error at get Job Description Questions " + error.message))
  }, [])

  if (loading) return <h1>Loading...</h1>;

  if (!answers) {
        return null
    }
    else {

		let temp1 = answers.check1
		temp1 = toArray(temp1)

		for (let a of temp1) {
		    for (let q of ProgrammingLanguageQuestions ) {
		        allProgrammingLanguageQuestions.push(q + a)
		    }
		}

		let temp2 = []
		temp2 = toArray(temp2)

		for (let a of temp2) {
		    for (let q of EducationQuestions ) {
		        allEducationQuestions.push(q + a)
		    }
		}

		let temp3 = answers.radio1
		temp3 = toArray(temp3)

		for (let a of temp3) {
		    for (let q of SpokenLanguageQuestions ) {
		        allSpokenLanguageQuestions.push(q + a)
		    }
		}

	}


	function getProgrammingLanguageAnswerQuestions(qArray) {

        return qArray.map((Item, index) => {
            return (
                <FormikControl key={Item} control='textarea' label={Item} name={`ProgrammingLanguageAnswer[${index}]`} required placeholder="Enter text here" />
            );
        })
    }



	function getEducationAnswerQuestions(qArray) {

        return qArray.map((Item, index) => {
            return (
                <FormikControl key={Item} control='textarea' label={Item} name={`EducationAnswer[${index}]`} required placeholder="Enter text here" />
            );
        })
    }



	function getSpokenLanguageAnswerQuestions(qArray) {

        return qArray.map((Item, index) => {
            return (
                <FormikControl key={Item} control='textarea' label={Item} name={`SpokenLanguageAnswer[${index}]`} required placeholder="Enter text here" />
            );
        })
    }



const checkOptions2 = [
    {key: '1', value: '1'},
    {key: '2', value: '2'},
    {key: '3', value: '3'},
  ]


  const { prevStep } = props


 return (

    <Formik initialValues={props.initialValues} validationSchema={props.validationSchema} onSubmit={handleSumbit} >
      {

        formik => <Form id="regForm">
          <h1> Screening Overview </h1>
          <span>

            <h3> Header 2</h3>

            <p> Some Decription here</p>

			<FormikControl control='checkbox' label="Sth Else" name='check2' id="checkOptions2" options={checkOptions2}/>

						{getProgrammingLanguageAnswerQuestions(allProgrammingLanguageQuestions)}
						{getEducationAnswerQuestions(allEducationQuestions)}
						{getSpokenLanguageAnswerQuestions(allSpokenLanguageQuestions)}


			
            <button type="submit"> Next</button>
						<button type="button" className="PrevBtn" onClick={prevStep}> Back</button>

          </span>

        </Form>
      }

    </Formik >

  )
}

export default Screening2

