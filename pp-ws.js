'use strict';

var loopback = require('loopback');

var parseString = require('xml2js').parseString;

var ds = loopback.createDataSource('soap', {
    connector: require('loopback-connector-soap'),
    wsdl: 'http://webservices.lantraxrd.com/ppws3/profitpowerws.asmx?WSDL', // The url to WSDL
    url: 'http://webservices.lantraxrd.com/ppws3/profitpowerws.asmx', // The service endpoint

    // Map SOAP service/port/operation to Node.js methods
    operations: {
      soapPOST: {
        service: 'Generic',
        port: 'GenericSoap',
        operation: 'CallMethod'
      }
    }
  });

// Unfortunately, the methods from the connector are mixed in asynchronously
// This is a hack to wait for the methods to be injected
ds.once('connected', function () {
  var PP = ds.createModel('PP', {});
  //console.log(PP);
  /*PP.addClient({
    ClientID: 'PROFITPOWERDEMO825gpv',
    Method: 'AddClient',
    MethodXML: JSON.stringify({
      doc: {
        Client: {
          City: 'Buffalo',
          ClientUID: '0EB470AB-CAE2-4ABD-BE28-C4BD0B36A1B3',
          ClientType: 'Seller',
          EmailAddress: 'test@1234.com',
          FirstName: 'John',
          HomePhone: '7169290000',
          LastName: 'Maheson',
          MobilePhone: '1234567894',
          State: 'NY',
          StreetName: 'Wehrle',
          StreetNumber: '1967',
          Zip: '14221'
        }
      }
    })
  }, function(err, response) {
    console.log('err: ', err);
    console.log('response:', response);
  });*/

  PP.soapPOST({
    ClientID: 'PROFITPOWERDEMO825gpv',
    Method: 'GetClients',
    MethodXML: '<![CDATA[<doc><Clients><ClientGUID>0EB470AB-CAE2-4ABD-BE28-C4BD0B36A1B0</ClientGUID></Clients></doc>]]>'
  }, function(err, response) {
    console.log('err: ', err);
    console.log('response:', response);
  });

});
