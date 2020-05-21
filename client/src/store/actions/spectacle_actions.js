import axios from 'axios'
import {
  SPECTACLE_ADD,
  SPECTACLE_CLEAR,
  SPECTACLE_GET,
  SPECTACLE_UPDATE,
  SPECTACLE_DELETE,
  SPECTACLES_ALL,
  SPECTACLE_COPY,
} from '../types'

export function spectacleAdd(spectacle) {
  const request = axios
    .post('/api/spectacles/spectacle', spectacle)
    .then((response) => response.data)
    .catch((err) => {
      return false
    })

  return {
    type: SPECTACLE_ADD,
    payload: request,
  }
}

export function spectacleClear(spectacle) {
  return {
    type: SPECTACLE_CLEAR,
    payload: null,
  }
}

export function spectacleGet(spectacleId) {
  const request = axios
    .get(`/api/spectacles/spectacle?id=${spectacleId}`)
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return false
    })

  return {
    type: SPECTACLE_GET,
    payload: request,
  }
}

export function spectacleUpdate(spectacle) {
  const request = axios
    .patch('/api/spectacles/spectacle', spectacle)
    .then((response) => response.data)
    .catch((err) => {
      return false
    })

  return {
    type: SPECTACLE_UPDATE,
    payload: request,
  }
}

export function spectacleCopy(spectacle) {
  const request = axios
    .post('/api/spectacles/spectacle', spectacle)
    .then((response) => response.data)
    .catch((err) => {
      return false
    })

  return {
    type: SPECTACLE_COPY,
    payload: request,
  }
}

export function spectacleDelete(spectacleId) {
  const request = axios
    .delete(`/api/spectacles/spectacle?id=${spectacleId}`)
    .then((response) => response.data)
    .catch((err) => {
      return false
    })

  return {
    type: SPECTACLE_DELETE,
    payload: request,
  }
}

export function spectaclesAll(order = 1) {
  const request = axios
    .get(`/api/spectacles/all_spectacles?order=${order}`)
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return false
    })

  return {
    type: SPECTACLES_ALL,
    payload: request,
  }
}
