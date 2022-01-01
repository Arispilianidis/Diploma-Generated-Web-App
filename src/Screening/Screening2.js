import React from 'react'
import FormikControl from '../components/FormikControl'
import { Formik, Form } from 'formik'
import Proof from '../components/Proof'
import Rating from 'react-rating-tooltip'
import '../css/Rating.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const JobDescTempQuestionsURL = "http://localhost:3000/JobDescTemp"
const JobDescTempOptionsRatingURL = "http://localhost:3000/JobDescTempOptionsRating"
const check1Questions0 = [
	"How much experience with ",
]
const radio1Questions1 = [
	"What kind of diploma with ",
]
const check1Questions2 = [
	"How many projects with ",
]

function toArray(aVar) {

	if (typeof (aVar) === 'string') {
		aVar = [aVar]
	}
	return aVar
}

function Screening2(props) {


	const handleSumbit = (values) => {
		props.onSubmit(values, true)
	}



	const [answers, setAnswers] = useState(null);
	const [optionsRating, setOptionsRating] = useState(null);


	useEffect(() => {
		let isMounted = true;

		axios.get(JobDescTempOptionsRatingURL, {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			}
		})
			.then(response => {
				if (isMounted) {
					console.log(response.data.data)
					setOptionsRating(response.data.data)
				}
			})
			.catch(error => {
				alert("You need to complete a Job Description Task first")
				console.log("Error at get Job Description Questions " + error.message)})

		axios.get(JobDescTempQuestionsURL, {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			}
		})
			.then(response => {
				if (isMounted) {
					setAnswers(response.data.data)
				}
			})
			.catch(error => console.log("Error at get Job Description Questions " + error.message))

			return () => { isMounted = false };
	}, [props])

	if (!answers) {
		return null
	}

	function getQuestions(answersItem, Item, QId, QArray, FormikArray) {

		return toArray(answersItem).map((element, index) => {
			let myOption = optionsRating.find(o => o.name === Item).options.find(v => v.optionValue === element).optionRating.find(r => r.isAbout === QId)
			return (
				<div key={index} style={{ margin: 0 }}>
					<FormikControl control='textarea' label={QArray + element} name={`${FormikArray}[${index}]`} required placeholder="Enter text here" />
					<Rating
						max={myOption.tooltipArray.length}
						disabled={false}
						counterPosition={"left"}
						textPosition={"right"}
						tooltipContent={myOption.tooltipArray}
						ratingValue={myOption.tooltipArray}
						onChange={(rate) => { props.handleRating(rate / myOption.tooltipArray.length * 100, element + `Rating${QId}`) }}
						ActiveComponent={
							<i className="fa fa-star starStyle" />
						}
						InActiveComponent={
							<i className="fa fa-star-o starStyle" />
						}
					/>
				</div>
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


						{getQuestions(answers.check1, "check1", 0, check1Questions0, "check1Answer0")}
						{getQuestions(answers.radio1, "radio1", 1, radio1Questions1, "radio1Answer1")}
						{getQuestions(answers.check1, "check1", 2, check1Questions2, "check1Answer2")}

						<button type="submit"> Next</button>
						<button type="button" className="PrevBtn" onClick={prevStep}> Back</button>

					</span>

				</Form>
			}

		</Formik >

	)
}

export default Screening2

