const mongoose = require('mongoose')
const Schema = mongoose.Schema

const spectacleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    venue: {
      type: String,
    },
    content: {
      type: String,
    },
    images: {
      type: Array,
      default: [],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

const Spectacle = mongoose.model('Spectacle', spectacleSchema)
module.exports = { Spectacle }
