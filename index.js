'use strict'

const axios = require('axios')
const uuid = require('uuid/v4')

const { getParamsArray, signature } = require('./lib/Utils')

const url = 'https://dm.aliyuncs.com/'
const FORMAT_TYPE = ['json', 'xml']

function throwError(message) {
  throw Error(message)
}

class AliEmailSDK {
  constructor({
    AccessKeyId, AccessKeySecret, Version,
    SignatureVersion = '1.0', SignatureMethod = 'HMAC-SHA1', Format = 'json', RegionId
  }) {
    !AccessKeyId && throwError('config.AccessKeyId is required')
    !AccessKeySecret && throwError('config.AccessKeySecret is required')
    SignatureVersion !== '1.0' && throwError('config.SignatureVersion only support 1.0')
    SignatureMethod !== 'HMAC-SHA1' && throwError('config.SignatureMethod only support HMAC-SHA1')

    switch (Version) {
      case '2015-11-23':
        RegionId && RegionId !== 'cn-hangzhou' && throwError('if config.Version is 2015-11-23 regionId must be cn-hangzhou')
        break
      case '2017-06-22':
        RegionId === 'cn-hangzhou' && throwError('if config.Version is 2017-06-22 regionId must not be cn-hangzhou')
        break
      default:
        throwError('config.Version must be 2015-11-23 or 2017-06-22')
    }

    this.config = {
      AccessKeyId,
      SignatureVersion,
      SignatureMethod,
      Version,
      Format: Format.toLowerCase(),
      RegionId
    }
    this.AccessKeySecret = AccessKeySecret

    if (!FORMAT_TYPE.includes(this.config.Format)) throwError('config.Format must be json or xml')
  }

  async send({
    Timestamp = new Date().toISOString(), SignatureNonce = uuid(), Action, AccountName, AddressType = 0, TagName, ClickTrace = 0,
    ReplyToAddress = false, ToAddress, FromAlias, Subject, HtmlBody, TextBody,
    TemplateName, ReceiversName,
  }, requestConfig = {}) {
    !AccountName && throwError('config.AccountName is required')

    let params = {
      ...this.config,
      Timestamp,
      SignatureNonce,
      AccountName,
      AddressType,
      TagName,
      ClickTrace,
    }

    switch (Action.toLowerCase()) {
      case 'single':
        !ToAddress && throwError('config.ToAddress is required')
        params = {
          ...params,
          Action: 'SingleSendMail',
          ReplyToAddress: !!ReplyToAddress,
          ToAddress,
          FromAlias,
          Subject,
          HtmlBody,
          TextBody,
        }
        break
      case 'batch':
        !TemplateName && throwError('config.TemplateName is required')
        !ReceiversName && throwError('config.ReceiversName is required')

        params = {
          ...params,
          Action: 'BatchSendMail',
          TemplateName,
          ReceiversName,
        }
        break
      default:
        throwError('config.Action must be single or batch')
    }

    const paramsArray = getParamsArray(params)
    const sign = signature(paramsArray, this.AccessKeySecret)

    return axios({
      ...requestConfig,
      url,
      data: [...paramsArray, `Signature=${sign}`].join('&'),
      responseType: this.config.Format,
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  }
}

module.exports = AliEmailSDK
