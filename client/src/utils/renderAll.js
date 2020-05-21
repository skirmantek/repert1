//repertuaro rodymas HOME skiltyje

import React from 'react'
import { Link } from 'react-router-dom'

export const listRows = (list, cols) => {
  const rows = [...Array(Math.ceil(list.length / cols))]
  const spectaclesRow = rows.map((row, i) =>
    list.slice(i * cols, i * cols + cols)
  )
  return spectaclesRow
}

export const listAll = (rows, type) =>
  rows.map((row, i) => (
    <div className='row' key={i}>
      {row.map((spectacle) => (
        <div key={spectacle._id} className={`${type} columns article_block`}>
          <div>{spectacle.name}</div>
          <div>{spectacle.date}</div>
          <div>{spectacle.time}</div>
          <div>{spectacle.venue}</div>
        </div>
      ))}
    </div>
  ))
