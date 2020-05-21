//functional component

import React, { useState, useEffect } from 'react'
import PanelLayout from '../../../../hoc/panelLayout'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { spectacleDelete } from '../../../../store/actions/spectacle_actions'
import { connect } from 'react-redux'

//import moment from 'moment'

//Table
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import FontAwesome from 'react-fontawesome'

const AdminPosts = (props) => {
  let [posts, setPosts] = useState([])

  useEffect(() => {
    axios
      .get(`/api/spectacles/all_spectacles`)
      .then((response) => {
        setPosts(response.data)
      })
      .catch((err) => {
        return false
      })
  }, [props])

  function noDuplicates(array, key, key1) {
    let lookup = new Set()
    return array.filter((obj) => !lookup.has(obj[key]) && lookup.add(obj[key]))
  }
  //console.log(noDuplicates(posts, 'name', 'date'))

  function test(array) {
    array.map((item, index) =>
      index === array.findIndex((item1) => item.name === item1.name)
        ? 'sutampa'
        : 'nesutampa'
    )
  }
  console.log(posts)
  console.log(test(posts))

  const deletePost = () => {}

  return (
    <PanelLayout>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pavadinimas</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Laikas</TableCell>
              <TableCell>Renginio vieta</TableCell>
              <TableCell>Redagavimas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link to={`/admin/posts/edit/${item._id}`}>{item.name}</Link>
                </TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.venue}</TableCell>
                <TableCell>
                  <Link to={`/admin/posts/edit/${item._id}`}>
                    <button>
                      <FontAwesome
                        name='edit'
                        style={{
                          color: 'green',
                          margin: '5px',
                          fontSize: '20px',
                        }}
                      />
                      Redaguoti
                    </button>
                  </Link>
                </TableCell>
                <TableCell>
                  <div className='button' onClick={deletePost}>
                    Trinti
                  </div>
                </TableCell>
                <TableCell>
                  <Link to={`/admin/posts/copy/${item._id}`}>
                    <button>
                      <FontAwesome
                        name='copy'
                        style={{
                          color: 'green',
                          margin: '5px',
                          fontSize: '20px',
                        }}
                      />
                      Kopijuoti
                    </button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PanelLayout>
  )
}

//export default AdminPosts
function mapStateToProps(state) {
  return {
    posts: state.posts,
  }
}

export default connect(mapStateToProps)(AdminPosts)
