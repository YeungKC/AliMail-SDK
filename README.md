# AliEmail-SDK

阿里云邮件 SDK

## install

yarn add alimail-sdk

## Example

```
const AliMailSDK = require('./index')

const mailer = new AliMailSDK({
  AccessKeyId: 'AccessKeyId',
  AccessKeySecret: 'AccessKeySecret',
  Version: '2015-11-23', // RegionID 是 cn-hangzhou version 是 2015-11-23，其他一律 2017-06-22
  SignatureVersion: '1.0', // 默认并仅支持 1.0
  SignatureMethod: 'HMAC-SHA1', // 默认并仅支持 HMAC-SHA1
  RegionId: 'cn-hangzhou', // 可选
  Format: 'json', // 可选
})

const singleRes = await mailer.send({
  Action: 'single',
  AccountName: 'admin@alimail.yeungkc.com',
  ReplyToAddress: false, // 默认 false
  AddressType: 0, // 默认 0
  ToAddress: 'alimail@YeungKC.com',
  FromAlias: 'alias',
  Subject: 'subject',
  TagName: 'test',
  HtmlBody: '<html>HtmlBody</html>',
  TextBody: 'TextBody',
  ClickTrace: '0', // 默认 0
  // Timestamp: new Date().toISOString(), // 默认 new Date().toISOString()
  // SignatureNonce: uuid() // 默认 UUID
}, requestConfig) // 传入 axios config 设置代理等
console.log(singleRes) // axios respone

const batchRes = await mailer.send({
  Action: 'batch',
  AccountName: 'admin@alimail.yeungkc.com',
  AddressType: 0, // 默认 0
  TemplateName: 'test',
  ReceiversName: 'listname',
  ClickTrace: '0', // 默认 0
  // Timestamp: new Date().toISOString(), // 默认 new Date().toISOString()
  // SignatureNonce: uuid() // 默认 UUID
}, requestConfig) // 传入 axios config 设置代理等
console.log(batchRes) // axios respone
```
