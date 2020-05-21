import React, { Component } from 'react'
import { Formik } from 'formik'
import { Link } from 'react-router-dom'
import PanelLayout from '../../../../hoc/panelLayout'
import { FormTemplate, SpectacleSchema } from './utils/postsHelper'

import { EditorState, ContentState } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'
import { stateToHTML } from 'draft-js-export-html'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { connect } from 'react-redux'
import {
  spectacleAdd,
  spectacleUpdate,
  spectacleClear,
  spectacleGet,
  spectacleDelete,
} from '../../../../store/actions/spectacle_actions'

class PublishSpectacle extends Component {
  state = {
    editorState: '',
    editorContentHtml: '',
    success: false,
    loading: true,
    spectacleToEdit: {},
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    })
  }

  deletePost = () => {
    this.props.dispatch(spectacleDelete(this.props.match.params.id))
    setTimeout(() => {
      this.props.history.push('/admin/posts')
    }, 1000)
  }

  onSpectacleEdit = (values) => {
    this.props.dispatch(spectacleUpdate(values))
  }

  onSpectacleSubmit = (values) => {
    this.props.dispatch(spectacleAdd(values))
  }

  componentDidUpdate(prevProps) {
    const hasChanged = this.props.spectacles.edit !== prevProps.spectacles.edit
    const hasUpdated =
      this.props.spectacles.update !== prevProps.spectacles.update
    const edit = this.props.spectacles.edit

    if (hasUpdated) {
      this.setState({ success: true })
    }

    if (hasChanged) {
      if (edit !== false) {
        const blocksFromHtml = htmlToDraft(edit.content)
        const { contentBlocks, entityMap } = blocksFromHtml
        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        )
        this.setState({
          loading: false,
          editorState: EditorState.createWithContent(contentState),
          spectacleToEdit: {
            _id: edit._id,
            name: edit.name,
            date: edit.date,
            time: edit.time,
            venue: edit.venue,
          },
        })
      } else {
        this.props.history.push('/')
      }
    }
  }

  componentWillUnmount() {
    this.props.dispatch(spectacleClear())
  }

  componentDidMount() {
    this.props.dispatch(spectacleGet(this.props.match.params.id))
  }

  render() {
    return this.state.loading ? (
      <>Kraunasi informacija...</>
    ) : (
      <PanelLayout>
        <h4>Redaguoti spektaklį</h4>
        <Formik
          enableReinitialize={true}
          initialValues={this.state.spectacleToEdit}
          validationSchema={SpectacleSchema}
          onSubmit={(values, { resetForm }) => {
            this.onSpectacleSubmit({
              ...values,
              content: this.state.editorContentHtml,
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
          }) => (
            <form onSubmit={handleSubmit}>
              <input type='hidden' name='_id' value={values._id} />

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

              <button type='submit'>Kopijuoti</button>
              <div className='button' onClick={this.deletePost}>
                Trinti
              </div>
              {this.state.success ? (
                <div className='success_entry'>
                  <div>Atnaujintas sėkmingai!</div>
                  <Link to={`/`}>Peržiūrėti repertuarą</Link>
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
