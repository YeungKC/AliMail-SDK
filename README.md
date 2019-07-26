# AliMail-SDK

阿里云邮件 SDK

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4b8c29d9480f44b387201a88233b9a36)](https://www.codacy.com/app/YeungKC/AliMail-SDK?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=YeungKC/AliMail-SDK&amp;utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/YeungKC/AliMail-SDK/branch/master/graph/badge.svg)](https://codecov.io/gh/YeungKC/AliMail-SDK)
[![Build Status](https://travis-ci.org/YeungKC/AliMail-SDK.svg?branch=master)](https://travis-ci.org/YeungKC/AliMail-SDK)
[![NPM version](https://img.shields.io/npm/v/alimail-sdk.svg?style=flat-square)](https://npmjs.org/package/alimail-sdk)
[![NPM download](https://img.shields.io/npm/dm/alimail-sdk.svg?style=flat-square)](https://npmjs.org/package/alimail-sdk)
[![Known Vulnerabilities](https://snyk.io/test/npm/alimail-sdk/badge.svg)](https://snyk.io/test/npm/alimail-sdk)
[![dependencies Status](https://david-dm.org/yeungkc/alimail-sdk/status.svg)](https://david-dm.org/yeungkc/alimail-sdk)
[![devDependencies Status](https://david-dm.org/yeungkc/alimail-sdk/dev-status.svg)](https://david-dm.org/yeungkc/alimail-sdk?type=dev)

## install

```bash
yarn add alimail-sdk
```

## Example

```js
const AliMailSDK = require('alimail-sdk');

!(async () => {
  const mailer = new AliMailSDK({
    AccessKeyId: 'AccessKeyId',
    AccessKeySecret: 'AccessKeySecret',
    Version: '2015-11-23', // RegionID 是 cn-hangzhou version 是 2015-11-23，其他一律 2017-06-22
    SignatureVersion: '1.0', // 默认并仅支持 1.0
    SignatureMethod: 'HMAC-SHA1', // 默认并仅支持 HMAC-SHA1
    RegionId: 'cn-hangzhou', // 可选
    Format: 'json' // 可选
  })

  const singleRes = await mailer.send(
    {
      Action: 'single',
      AccountName: 'admin@alimail.yeungkc.com',
      ReplyToAddress: false, // 默认 false
      AddressType: 0, // 默认 0
      ToAddress: 'alimail@YeungKC.com',
      FromAlias: 'alias', // 可选
      Subject: 'subject', // 可选
      TagName: 'test', // 可选
      HtmlBody: '<html>HtmlBody</html>', // 可选
      TextBody: 'TextBody', // 可选
      ClickTrace: '0' // 默认 0
      // Timestamp: new Date().toISOString(), // 默认 new Date().toISOString()
      // SignatureNonce: uuid() // 默认 UUID
    },
    {} // 传入 axios config 设置代理等
  )
  console.log(singleRes) // axios respone

  const batchRes = await mailer.send(
    {
      Action: 'batch',
      AccountName: 'admin@alimail.yeungkc.com',
      AddressType: 0, // 默认 0
      TemplateName: 'test',
      ReceiversName: 'listname',
      ClickTrace: '0' // 默认 0
      // Timestamp: new Date().toISOString(), // 默认 new Date().toISOString()
      // SignatureNonce: uuid() // 默认 UUID
    },
    {} // 传入 axios config 设置代理等
  )
  console.log(batchRes) // axios respone
})()
```
