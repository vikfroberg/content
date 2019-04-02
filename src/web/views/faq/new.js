import React from 'react'
import { map } from '@vikfroberg/func'
import { styled } from '@content/web/helpers/dom'
import { h2, div, h1, input, label, textarea, form, button } from '@content/web/helpers/dom'

const actions = [
  showModal,
  hideModal,
]

const model = {
  showModal: false,
}

const reducer = (state = model, action) => {
  if (action.type === actions.showModal) {
    return { showModal: true, ...state }
  }
  else if (action.type === actions.hideModal) {
    return { showModal: false, ...state }
  }
  return state
}

const Component = props => {
  // props.onShowModal === undefined
  return (
    <div>
      <Modal
        visible={props.showModal}
      />
      <input
        onFocus={props.showModal}
        onBlur={props.hideModal}
      />
    </div>
  )
}

// These are not sent down to the component
const Test = props => {
  return (
    <Component
      onShowModal={...}
      onHideModal={...}
    />
  )
}

const actions = {
  updateUser: createAction('UPDATE_USER'),
  updateUserSucceded: createAction('UPDATE_USER_SUCCEDED'),
  updateUserFailed: createAction('UPDATE_USER_FAILED'),
}

const reducer = combineReducers({
  loading: compose(
    handleAction(actions.updateUser, always(true)),
    handleAction(actions.updateUserSucceded, always(false)),
    handleAction(actions.updateUserFailed, always(false)),
  )
  user: handleAction(actions.updateUserSucceded, merge),
})

const epic = combineEpics({
  updateUserEpic: action$ =>
    action$
      .ofType(actions.updateUser)
      .mergeMap(action =>
        postJSON(`users/${action.payload.id}`, action.payload)
          .map(action.fetchUserFulfilled)
      ),
})

export default connectEventStream({ reducer, epic, actions })(Component)

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



const Constrained = styled('div', `
  ${clearfix}

  color: ${colors.primary},
  border: .1rem solid ${colors.primary},
  max-width: 600px,
  margin: auto,
  padding: 40px 30px,

  ${hover} {
  }

  ${tablet} {
  }
`)

const Button = styled('button', {
  ...clearfix,
  backgroundColor: colors.primary,
  border: `.1rem solid ${colors.primary}`,
  borderRadius: '.4rem',
  color: '#fff',
  cursor: 'pointer',
  display: 'inlineBlock',
  fontSize: '1.1rem',
  fontWeight: '700',
  height: '3.8rem',
  letterSpacing: '.1rem',
  lineHeight: '3.8rem',
  padding: '0 3.0rem',
  textAlign: 'center',
  textDecoration: 'none',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  [hover]: {
    backgroundColor: '#606c76',
    borderColor: '#606c76',
    outline: '0',
  },
  [tablet]: {
    fontSize: '2rem',
  },
})

const PageTitle = tagWithClassName(h1)
const FieldCollectionTitle = tagWithClassName(h2)
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
      FieldCollectionTitle(field.name),
    ]),
    Fields({ fields: field.fields }),
    div(`Add More ${field.name} +`),
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
    Margin4([
      PageTitle(template.name),
    ]),
    form([
      Fields({ fields: template.fields }),
      Button({ type: 'submit' }, [
        `Create ${template.name}`
      ]),
    ])
  ])
}


