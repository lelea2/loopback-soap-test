'use strict';

var loopback = require('loopback');

var parseString = require('xml2js').parseString;

var ds = loopback.createDataSource('soap', {
    connector: require('loopback-connector-soap'),
    wsdl: 'http://webservices.lantraxrd.com/ppws3/profitpowerws.asmx?WSDL', // The url to WSDL
    url: 'http://webservices.lantraxrd.com/ppws3/profitpowerws.asmx', // The service endpoint

    // Map SOAP service/port/operation to Node.js methods
    operations: {

    }
  });

// Unfortunately, the methods from the connector are mixed in asynchronously
// This is a hack to wait for the methods to be injected
ds.once('connected', function () {

});
