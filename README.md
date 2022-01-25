# Library

- Call SOAP API: [easy-soap-request](https://www.npmjs.com/package/easy-soap-request)
- Parse XML to JS Object: [fast-xml-parser](https://www.npmjs.com/package/fast-xml-parser)

# Request

SOAP Endpoint: `https://idcard.bora.dopa.go.th/checkcardstatus/checkcardservice.asmx`<br>
Method: `POST`<br>
Header: `'Content-Type': 'application/soap+xml; charset=utf-8'`<br>
Body:

```xml
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <CheckCardByLaser xmlns="http://tempuri.org/">
      <PID>{เลขบัตรประชาชน}</PID>
      <FirstName>{ชื่อจริง (ภาษาไทย)}</FirstName>
      <LastName>{นามสกุล (ภาษาไทย)}</LastName>
      <BirthDay>{วันเกิด YYYYMMDD (ใช้ พ.ศ.)}</BirthDay>
      <Laser>{เลขหลังบัตร}</Laser>
    </CheckCardByLaser>
  </soap12:Body>
</soap12:Envelope>
```


# Response

Header:
```js
 {
  'cache-control': 'private, max-age=0',
  'content-type': 'application/soap+xml; charset=utf-8',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  date: 'Tue, 25 Jan 2022 06:41:18 GMT',
  connection: 'close',
  'content-length': '468'
}
```

Body:
```xml
 <?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <soap:Body>
        <CheckCardByLaserResponse xmlns="http://tempuri.org/">
            <CheckCardByLaserResult>
                <IsError>
                    false
                </IsError>
                <ErrorMessage/>
                <Code>
                    0
                </Code>
                <Desc>
                    สถานะปกติ
                </Desc>
            </CheckCardByLaserResult>
        </CheckCardByLaserResponse>
    </soap:Body>
</soap:Envelope>
```

## Responses

### All correct

Code: `0`<br>
Description: `สถานะปกติ`

```js
{
  '?xml': '',
  'soap:Envelope': {
    'soap:Body': {
      CheckCardByLaserResponse: {
        CheckCardByLaserResult: {
          IsError: false,
          ErrorMessage: '',
          Code: 0,
          Desc: 'สถานะปกติ'
        }
      }
    }
  }
}
```

### Wrong PID or LaserID

Code: `4`<br>
Description: `สถานะไม่ปกติ => ไม่พบเลข Laser จาก PID นี้`

```js
{
  '?xml': '',
  'soap:Envelope': {
    'soap:Body': {
      CheckCardByLaserResponse: {
        CheckCardByLaserResult: {
          IsError: true,
          ErrorMessage: '',
          Code: 4,
          Desc: 'สถานะไม่ปกติ => ไม่พบเลข Laser จาก PID นี้'
        }
      }
    }
  }
}
```

### Wrong first name or last name or dob

Code: `4`<br>
Description: `สถานะไม่ปกติ => ข้อมูลไม่ตรง`

```js
{
  '?xml': '',
  'soap:Envelope': {
    'soap:Body': {
      CheckCardByLaserResponse: {
        CheckCardByLaserResult: {
          IsError: true,
          ErrorMessage: '',
          Code: 4,
          Desc: 'สถานะไม่ปกติ => ข้อมูลไม่ตรง'
        }
      }
    }
  }
}
```

### Contains empty field

Code: `5`<br>
Description: `ข้อมูลที่ใช้ในการตรวจสอบไม่ครบ`

```js
{
  '?xml': '',
  'soap:Envelope': {
    'soap:Body': {
      CheckCardByLaserResponse: {
        CheckCardByLaserResult: {
          IsError: true,
          ErrorMessage: '',
          Code: 5,
          Desc: 'ข้อมูลที่ใช้ในการตรวจสอบไม่ครบ'
        }
      }
    }
  }
}
```