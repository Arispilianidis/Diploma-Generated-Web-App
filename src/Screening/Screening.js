import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import * as Yup from 'yup'
import axios from 'axios'
import Screening1 from './Screening1';
import Screening2 from './Screening2';

function Screening() {

  let { state } = useLocation();
  let serverUserInfo = state[0]
  let processName = state[1]
  let loginUserInfo = state[2]

  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [initialValues, setInitialValues] = useState({
    candidateName: "",
    candidateEmail: " ",
    candidateResume: " ", //Since this is a custom variable i can choose whether or not to show it in the overview
    dateApplied: null,
    progrLangAnswer: ['', '','',''],
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
        'Content-Type':'multipart/form-data',
      }
    })
    .catch(error => console.log("Error at postProof => " + error.message))

  }

  const validationSchema1 = Yup.object({
    candidateName: Yup.string().required('Required'),
    candidateEmail: Yup.string().email('Invalid email').required('Required'),
    candidateResume: Yup.string().required('Required'),
    dateApplied: Yup.date().required('Required').nullable()
  })

  const validationSchema2 = Yup.object().shape({
    progrLangAnswer: Yup.array().of(Yup.string().required('Required'))
  })

  const onSubmit = (formValues, final) => {

    //TODO: bale to periexomeno tis next step edw. Kai sto Job DEsc

    console.log('Form data', formValues)

    nextStep(formValues, final)

  }

  // Proceed to next step
  function nextStep(newData, final = false) {

    setInitialValues((prev) => ({ ...prev, ...newData }))

    if (final) {
      console.log("Form submitted", newData)
      //TODO: fix this
      var processName = "Screening"
      navigate("/" + processName +"Final", { state: [newData,serverUserInfo,processName,loginUserInfo] });
    }
    else {
      setStep(step => step + 1)
    }

  }

  // Proceed to prev step
  function prevStep(newData) {

    setStep(step => step - 1)

  }


  const pages = [
    <Screening1 initialValues={initialValues} validationSchema={validationSchema1} onSubmit={onSubmit} postProof={postProof} />,
    <Screening2 prevStep={prevStep} initialValues={initialValues} validationSchema={validationSchema2} onSubmit={onSubmit} postProof={postProof} />,
  ]

  return (
    <div>
      {pages[step]}
    </div>
  )
}

export default Screening

