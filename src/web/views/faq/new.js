import React from 'react'
import _styled from 'styled-components'
import { match, map } from '@vikfroberg/func'
import {
  h2,
  div,
  h1,
  input,
  label,
  textarea,
  form,
  button,
} from '@content/web/helpers/dom'

const isChildren = x =>
  typeof x === 'string' || typeof x === 'number' || Array.isArray(x)

const tagWithClassName = (tag, className) =>
  (props, children) =>
    tag(
      {
        ...(isChildren(props) ? {} : props),
        className: (props.className || '').split(' ').concat([className]).join(' '),
      },
      isChildren(props) ? props : children
    )

const Constrained = tagWithClassName(div, 'constrained')
const PageTitle = tagWithClassName(h1)
const Title = tagWithClassName(h1)
const Button = tagWithClassName(button, 'button')
const Label = tagWithClassName(label, 'label')
const Input = tagWithClassName(input, 'input')
const Textarea = tagWithClassName(textarea, 'textarea')
const Margin1 = tagWithClassName(div, 'm1')
const Margin2 = tagWithClassName(div, 'm2')
const Margin4 = tagWithClassName(div, 'm4')
const Padding3 = tagWithClassName(div, 'p3')

const FieldCollection = ({ field }) =>
  Padding3([
    Margin2([
      Title(field.name),
    ]),
    Fields({ fields: field.fields }),
  ])

const FieldText = ({ field }) =>
  Margin2([
    Margin1([
      Label(field.name)
    ]),
    Input({ type: 'text' }),
  ])

const FieldTextArea = ({ field }) =>
  Margin2([
    Margin1([
      Label(field.name),
    ]),
    Textarea({ rows: field.rows }),
  ])

const Field = (props) => {
  switch (props.field.type) {
    case 'collection':
      return FieldCollection(props)
    case 'text':
      if (props.field.rows > 1) {
        return FieldTextArea(props)
      }
      return FieldText(props)
    default:
      return null
  }
}

const Fields = ({ fields, ...props }) =>
  div(props,
    map(
      field => Field({ field }),
      fields
    )
  )

export default ({ template }) => {
  return Constrained([
    PageTitle(template.name),
    form([
      Fields({ fields: template.fields }),
      Button({ type: 'submit' }, [
        `Create ${template.name}`
      ]),
    ])
  ])
}


