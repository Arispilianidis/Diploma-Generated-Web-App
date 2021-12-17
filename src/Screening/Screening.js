import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import * as Yup from 'yup'
import axios from 'axios'


import Screening1 from './Screening1'
import Screening2 from './Screening2'

const ratingsMap = new Map([
  ["input3Rating", 0],
  ["input4Rating", 0],
  ["date1Rating", 0],
  ["input5Rating", 0],
]);

function Screening() {

  let { state } = useLocation();
  let serverUserInfo = state[0] 
  let processName = state[1] 

  // Catch Rating value
  const handleRating = (rate, name) => {
    ratingsMap.set(name, rate)
  }

  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [initialValues, setInitialValues] = useState({
 	input3: "",
 	input4: "",
 	date1: null,
 	input5: "",
 	check2: [],
 	ProgrammingLanguageAnswer: ["", "", "", "", "", "", ""],
 	EducationAnswer: [],
 	SpokenLanguageAnswer: ["", "", "", "", ""],
  })

  function postProof(imagefileName) {

    var uploadsPostURL = "http://localhost:3000/uploadeFiles"

    var formData = new FormData();
    var imagefile = document.getElementById(imagefileName)
    console.log(imagefile)
    formData.append("file", imagefile.files[0]);
    axios.post(uploadsPostURL, formData, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data',
      }
    })
      .catch(error => console.log("Error at postProof => " + error.message))
  }

  const validationSchema1 = Yup.object({
    input3: Yup.string().required('Required'),
    input4: Yup.string().email('Invalid email').required('Required'),
    date1: Yup.date().required('Required').nullable(),
    input5: Yup.string().required('Required'),
  })

  const validationSchema2 = Yup.object({
    check2: Yup.array().required('Required').min(1, 'Required'),
  })


  // Proceed to next step
  const onSubmit = (formValues, final) => {

    setInitialValues((prev) => ({ ...prev, ...formValues }))

    if (final) {
      console.log("Form submitted", formValues)
      console.log(ratingsMap)
      navigate("/" + processName + "Final", { state: [ratingsMap, serverUserInfo, processName] });
    }
    else {
      setStep(step => step + 1)
    }

  }

  // Proceed to prev step
  function prevStep() {
    setStep(step => step - 1)
  }

  const pages = [

    <Screening1 initialValues={initialValues} validationSchema={validationSchema1} onSubmit={onSubmit} postProof={postProof} handleRating={handleRating}/>,
	 <Screening2 prevStep={prevStep} initialValues={initialValues} validationSchema={validationSchema2} onSubmit={onSubmit} postProof={postProof} handleRating={handleRating} />,
	]

  return (
    <div>
      {pages[step]}
    </div>
  )
}

export default Screening
