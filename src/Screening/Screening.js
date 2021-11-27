import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import * as Yup from 'yup'

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
    dateApplied: "",
    progrLangAnswer: ['', ''],
  })

  const validationSchema1 = Yup.object({
    candidateName: Yup.string().required('Required'),
    //TODO: fix if its email on M2T
    candidateEmail: Yup.string().email('Invalid email').required('Required'),
    candidateResume: Yup.string().required('Required'),
    dateApplied: Yup.string().required('Required').nullable()
  })

  const validationSchema2 = Yup.object({
    progrLangAnswer: Yup.array().required('Required').min(1, 'Required'),
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
      navigate("/FinalComponent", { state: [newData,] });
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
    <Screening1 initialValues={initialValues} validationSchema={validationSchema1} onSubmit={onSubmit} />,
    <Screening2 prevStep={prevStep} initialValues={initialValues} validationSchema={validationSchema2} onSubmit={onSubmit} />,
  ]

  return (
    <div>
      {pages[step]}
    </div>
  )
}

export default Screening

