import React, { Component } from 'react'
import { Formik } from 'formik'
import { Link } from 'react-router-dom'
import PanelLayout from '../../../../hoc/panelLayout'
import { FormTemplate, SpectacleSchema } from './utils/postsHelper'
import FileUpload from '../Posts/utils/fileupload'

import { EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { connect } from 'react-redux'
import {
  spectacleAdd,
  spectacleClear,
} from '../../../../store/actions/spectacle_actions'

class PublishSpectacle extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    editorContentHtml: '',
    success: false,
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
      editorContentHtml: stateToHTML(editorState.getCurrentContent()),
    })
  }

  onSpectacleSubmit = (values) => {
    this.props.dispatch(spectacleAdd(values))
  }

  componentDidUpdate(prevProps) {
    const hasChanged = this.props.spectacles !== prevProps.spectacles
    if (hasChanged) {
      this.setState({ success: true })
    }
  }

  componentWillUnmount() {
    this.props.dispatch(spectacleClear())
  }

  render() {
    return (
      <PanelLayout>
        <h4>Pridėti spektaklį</h4>
        <Formik
          initialValues={{
            name: '',
            date: '',
            time: '',
            venue: '',
          }}
          validationSchema={SpectacleSchema}
          onSubmit={(values, { resetForm }) => {
            this.onSpectacleSubmit({
              ...values,
              content: this.state.editorContentHtml,
            })
            this.setState({
              editorState: EditorState.createEmpty(),
              editorContentHtml: '',
            })
            resetForm({})
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <FormTemplate
                elementDesc={{
                  element: 'input',
                  type: 'text',
                  value: values.name,
                }}
                placeholder='Spektaklio pavadinimas'
                name='name'
                onHandleChange={(e) => handleChange(e)}
                onHandleBlur={(e) => handleBlur(e)}
                errors={errors.name}
                touched={touched.name}
              />

              <h4>Detali informacija</h4>

              <FormTemplate
                elementDesc={{
                  element: 'input',
                  type: 'date',
                  value: values.date,
                }}
                name='date'
                onHandleChange={(e) => handleChange(e)}
                onHandleBlur={(e) => handleBlur(e)}
                errors={errors.date}
                touched={touched.date}
              />

              <FormTemplate
                elementDesc={{
                  element: 'input',
                  type: 'time',
                  value: values.time,
                }}
                name='time'
                onHandleChange={(e) => handleChange(e)}
                onHandleBlur={(e) => handleBlur(e)}
                errors={errors.time}
                touched={touched.time}
              />

              <FormTemplate
                elementDesc={{
                  element: 'input',
                  type: 'text',
                  value: values.venue,
                }}
                placeholder='Spektaklio vieta'
                name='venue'
                onHandleChange={(e) => handleChange(e)}
                onHandleBlur={(e) => handleBlur(e)}
                errors={errors.venue}
                touched={touched.venue}
              />

              <Editor
                editorState={this.state.editorState}
                onEditorStateChange={this.onEditorStateChange}
                wrapperClassName='wrapperClassName'
                editorClassName='editorClassName'
              />

              <input
                id='file'
                name='file'
                type='file'
                onChange={(event) => {
                  setFieldValue('file', event.currentTarget.files[0])
                }}
              />

              <button type='submit'>Paskelbti spektaklį</button>
              {this.state.success ? (
                <div className='success_entry'>
                  <div>Spektaklis paskelbtas sėkmingai!</div>
                  <Link to={`/admin/posts`}>Peržiūrėti repertuarą...</Link>
                </div>
              ) : null}
            </form>
          )}
        </Formik>
      </PanelLayout>
    )
  }
}

function mapStateToProps(state) {
  return {
    spectacles: state.spectacles,
  }
}

export default connect(mapStateToProps)(PublishSpectacle)
