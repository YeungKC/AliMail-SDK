'use strict'

const crypto = require('crypto')

function getParamsArray (params) {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .sort()
}

function signature (paramArray, accessKeySecret) {
  const signStr = `POST&%2F&${encodeURIComponent(paramArray.join('&'))}`
  const sign = crypto.createHmac('sha1', accessKeySecret + '&')
    .update(signStr)
    .digest('base64')

  return encodeURIComponent(sign)
}

module.exports = { getParamsArray, signature }
