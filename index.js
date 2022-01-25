const soapRequest = require('easy-soap-request');
const { XMLParser } = require('fast-xml-parser');
const format = require('xml-formatter');

(async () => {
  const url = 'https://idcard.bora.dopa.go.th/checkcardstatus/checkcardservice.asmx';
  const headersReq = {
    'Content-Type': 'application/soap+xml; charset=utf-8',
  };

  const xml = `
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
`;

  const { response } = await soapRequest({ url, headers: headersReq, xml, timeout: 1000});
  const { headers, body, statusCode } = response;
  const parser = new XMLParser();
  const result = parser.parse(body);

  var currentdate = new Date();
  var datetime = 'Time: ' + currentdate.getDate() + '/'
                        + (currentdate.getMonth()+1)  + '/'
                        + currentdate.getFullYear() + ' @ '
                        + (currentdate.getHours() + 7) + ':'
                        + currentdate.getMinutes() + ':'
                        + currentdate.getSeconds();
  console.log('======== Request Time ========\n', datetime);
  console.log('======== Response Headers ========\n', headers);
  console.log('======== Response Body ========\n', format(body));
  console.log('======== Response StatusCode ========\n', statusCode);
  console.log('======== Response Body ========');
  console.dir(result, { depth: null, colors: true });
})();