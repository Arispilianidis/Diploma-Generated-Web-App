import React from 'react'
import FormikControl from '../components/FormikControl'
import { Formik, Form } from 'formik'
import Proof from '../components/Proof'
import { Rating } from 'react-simple-star-rating'
import {useState, useEffect } from 'react'
import axios from 'axios'

const JobDescTempQuestionsURL = "http://localhost:3000/JobDescTemp"
const check1Questions = [
	"How much experience with ",
	"How many projects with ",
]
const radio1Questions = [
	"What kind of diploma with ",
]

function toArray(aVar){

  if(typeof(aVar)==='string'){
    aVar = [aVar]
  }
  return aVar
}

function Screening2(props) {


  const handleSumbit = (values) => {
	props.onSubmit(values, true)
  }



  const [answers, setAnswers] = useState(null);
  const [loading, setLoading] = useState(false);

  var allcheck1Questions = []
  var allradio1Questions = []

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

  function getAnswers(answersItem, questionsArray, allQuestionsArray){

    let temp = toArray(answersItem)

    for (let a of temp) {
      for (let q of questionsArray) {
        allQuestionsArray.push(q + a)
      }
    }
  }

  if (loading) return <h1>Loading...</h1>;

  if (!answers) {
        return null
    }
    else {

	  getAnswers(answers.check1,check1Questions,allcheck1Questions)
	  getAnswers(answers.radio1,radio1Questions,allradio1Questions)
	}


	function getcheck1AnswerQuestions(qArray) {

        return qArray.map((Item, index) => {
            return (
                <FormikControl key={Item} control='textarea' label={Item} name={`check1Answer[${index}]`} required placeholder="Enter text here" />
            );
        })
    }

	function getradio1AnswerQuestions(qArray) {

        return qArray.map((Item, index) => {
            return (
                <FormikControl key={Item} control='textarea' label={Item} name={`radio1Answer[${index}]`} required placeholder="Enter text here" />
            );
        })
    }




  const { prevStep } = props


 return (

    <Formik initialValues={props.initialValues} validationSchema={props.validationSchema} onSubmit={handleSumbit} >
      {

        formik => <Form id="regForm">
          <h1> Screening Overview </h1>
          <span>

            <h3> Header 2</h3>

            <p> Some Decription here</p>


						{getcheck1AnswerQuestions(allcheck1Questions)}
						{getradio1AnswerQuestions(allradio1Questions)}


			
            <button type="submit"> Next</button>
						<button type="button" className="PrevBtn" onClick={prevStep}> Back</button>

          </span>

        </Form>
      }

    </Formik >

  )
}

export default Screening2

