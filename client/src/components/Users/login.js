import React, { Component } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { loginUser } from '../../store/actions/user_actions'

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Neteisingas el.paštas')
    .required('El.paštą būtina nurodyti!'),
  password: Yup.string()
    .min(8, 'Jūsų slaptažodis per trumpas!')
    .required('Slaptažodis būtinas!'),
})

class Login extends Component {
  state = { success: false, validation: false }

  static getDerivedStateFromProps(props, state) {
    if (props.user.auth) {
      return {
        success: props.user.auth ? true : false,
      }
    }
    return null
  }

  componentDidUpdate() {
    if (this.state.success) {
      this.props.history.push('/admin')
    }
  }

  render() {
    return (
      <div className='container form_container'>
        <h1>PRISIJUNGIMAS</h1>
        <hr />
        <h4>Prisijunkite čia:</h4>
        <Formik
          initialValues={{ email: 'labas@gmail.com', password: 'labaskrabas' }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            this.props.dispatch(loginUser(values)).then((response) => {
              if (!this.props.user.auth) {
                this.setState({
                  validation: true,
                })
              }
            })
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='twelve columns'>
                    <input
                      type='email'
                      name='email'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder='Įveskite savo el.paštą'
                      className='u-full-width'
                    />
                    {errors.email && touched.email ? (
                      <div className='error_label'>{errors.email}</div>
                    ) : null}
                  </div>
                </div>

                <div className='row'>
                  <div className='twelve columns'>
                    <input
                      type='password'
                      name='password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder='Įveskite savo slaptažodį'
                      className='u-full-width'
                    />
                    {errors.password && touched.password ? (
                      <div className='error_label'>{errors.password}</div>
                    ) : null}
                  </div>
                </div>

                <button type='submit' className='u-full-width'>
                  Prisijungti
                </button>
                {this.state.validation ? (
                  <div className='error_label'>
                    Neteisingi prisijungimo duomenys
                  </div>
                ) : null}
              </form>
            )
          }}
        </Formik>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Login)
