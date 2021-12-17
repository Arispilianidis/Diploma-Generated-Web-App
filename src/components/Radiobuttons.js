import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Radiobuttons(props) {
    const { label, name, options, ...rest } = props
    return (
        <>
            <label style={{ textAlign: 'start' }}><b>{label}</b></label>
            <div>
                <Field name={name} {...rest}>
                    {
                        ({ field }) => {
                            return options.map(option => {
                                return (
                                    <React.Fragment key={option.key}>
                                        <div style={{ justifyContent: 'flex-start' }} className="flexBoxes">
                                            <input type='radio' style={{ marginTop: 28 }} id={option.value} {...field} value={option.value} checked={field.value === option.value} />
                                            <label htmlFor={option.value}>{option.key}</label>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                        }
                    }
                </Field>
                <ErrorMessage name={name} component={TextError} />
            </div>
        </>
    )

}

export default Radiobuttons
