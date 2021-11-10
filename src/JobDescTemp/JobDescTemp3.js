import React from 'react'
import FormikControl from '../components/FormikControl'
import { Formik, Form } from 'formik'

function JobDescTemp3(props) {

  const handleSumbit = (values) => {
    props.onSubmit(values, true)
  }

  const checkboxOptions1 =[
    {key: 'Accurately describe nature of job', value: 'Accurately describe nature of job'},
    {key: 'Is free of gender or age implications', value: 'Is free of gender or age implications'},
    {key: 'It is self explanatory for recruitment purposes', value: 'It is self explanatory for recruitment purposes'},
]

const checkboxOptions2 =[
  {key: 'Employee orientation and training logistics and recordkeeping', value: 'Employee orientation and training logistics and recordkeeping'},
  {key: 'Company-wide committee facilitation and participation', value: 'Company-wide committee facilitation and participation'},
  {key: 'Employee safety, welfare, wellness and health reporting', value: 'Employee safety, welfare, wellness and health reporting'},
  {key: 'Provide direct support to employees during implementation of HR services, policies and programs', value: 'Provide direct support to employees during implementation of HR services, policies and programs'},
]

const checkboxOptions3 =[
  {key: 'CSS', value: 'CSS'},
  {key: 'JavaScript', value: 'JavaScript'},
  {key: 'C/C++', value: 'C/C++'},
  {key: 'React', value: 'React'},
]


  const { prevStep } = props

  return (

    <Formik initialValues={props.initialValues} validationSchema={props.validationSchema} onSubmit={handleSumbit} >
      {

        formik => <Form id="regForm">
          <h1> Job Desc Template </h1>
          <span>
            <h3>Decide the position title</h3>
            
            <p>The first thing that catches a candidate's eye when they are job hunting is the job title. This will give them a rough idea of what the position's responsibilities will include and if they are able to fill it. Make sure that the title includes what the job will be. For example; a sales role should include 'sales' in the title. </p>

            <FormikControl control='checkbox' label="Use the sub-checklist and form field below:" name='checkboxOption' id="checkboxOptions1" options={checkboxOptions1}/>
            <FormikControl control='input' type='text' label='Job Title ' name='title' placeholder="Title" />
            <FormikControl control='checkbox' label="Jot down responsibilities" name='responsibilities' id="checkboxOptions2" options={checkboxOptions2}/>
            <FormikControl control='checkbox' label="Jot down language responsibilities" name='progLangResponsibilities' id="checkboxOptions3" options={checkboxOptions3}/>

            <button type="submit"> Next</button>
            <button type="button" className="PrevBtn" onClick={prevStep}> Back</button>

          </span>

        </Form>
      }

    </Formik >
  )
}

export default JobDescTemp3