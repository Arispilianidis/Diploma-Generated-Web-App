import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'


function Select(props) {
    const { label, name, options, ...rest } = props
    return (
        <>
            <label htmlFor={name}><b>{label}</b></label>
            <div>

                <Field as='select' id={name} name={name} style={{marginTop:10, marginLeft:20, marginBottom:10 }} {...rest}>
                    {
                        options.map(option => {
                            return (
                                <option key={option.value} value={option.value}>
                                    {option.key}
                                </option>
                            )
                        })

                    }
                </Field>
                <ErrorMessage name={name} component={TextError} />
            </div>
        </>
    )
}

export default Select
