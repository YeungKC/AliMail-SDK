const AliMailSDK = require('../index')

describe('AliMail-SDK', function () {
  let mailer

  test('init empty params fail', done => {
    try {
      new AliMailSDK({})
    } catch (e) {
      expect(e.message).toBe('config.AccessKeyId is required')

      done()
    }
  })

  test('init version is 2015-11-23 fail', done => {
    try {
      new AliMailSDK({
        AccessKeyId: process.env.AccessKeyId,
        AccessKeySecret: process.env.AccessKeySecret,
        Version: '2015-11-23',
        RegionId: 'ap-southeast-1'
      })
    } catch (e) {
      expect(e.message).toBe('if config.Version is 2015-11-23 regionId must be cn-hangzhou')

      done()
    }
  })

  test('init version is 2017-06-22 fail', done => {
    try {
      new AliMailSDK({
        AccessKeyId: process.env.AccessKeyId,
        AccessKeySecret: process.env.AccessKeySecret,
        Version: '2017-06-22',
        RegionId: 'cn-hangzhou'
      })
    } catch (e) {
      expect(e.message).toBe('if config.Version is 2017-06-22 regionId must not be cn-hangzhou')

      done()
    }
  })

  test('init version is error fail', done => {
    try {
      new AliMailSDK({
        AccessKeyId: process.env.AccessKeyId,
        AccessKeySecret: process.env.AccessKeySecret,
        Version: '2019-06-11'
      })
    } catch (e) {
      expect(e.message).toBe('config.Version must be 2015-11-23 or 2017-06-22')

      done()
    }
  })

  beforeAll(() => {
    mailer = new AliMailSDK({
      AccessKeyId: process.env.AccessKeyId,
      AccessKeySecret: process.env.AccessKeySecret,
      Version: '2015-11-23'
    })
  })

  test('send single param fail', async done => {
    try {
      await mailer.send({
        Action: 'single',
        AccountName: 'admin@alimail.yeungkc.com'
      })
    } catch (e) {
      expect(e.message).toBe('config.ToAddress is required')

      done()
    }
  })

  test('send single success', async done => {
    const res = await mailer.send({
      Action: 'single',
      AccountName: 'admin@alimail.yeungkc.com',
      ToAddress: 'foo@alimail.yeungkc.com',
      FromAlias: 'alias',
      Subject: 'subject',
      TagName: 'tagName',
      HtmlBody: '<html>HtmlBody</html>'
    })

    expect(res.status).toBe(200)

    done()
  })

  test('send batch param fail', async done => {
    try {
      await mailer.send({
        Action: 'batch',
        AccountName: 'admin@alimail.yeungkc.com'
      })
    } catch (e) {
      expect(e.message).toBe('config.TemplateName is required')

      done()
    }
  })

  test('send batch success', async done => {
    const res = await mailer.send({
      Action: 'batch',
      AccountName: 'admin@alimail.yeungkc.com',
      TemplateName: 'test',
      ReceiversName: 'listname'
    })

    expect(res.status).toBe(200)

    done()
  })
})
