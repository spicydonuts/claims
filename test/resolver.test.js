'use strict';

var helpers           = require('./test.helpers')
, expect              = helpers.expectToBe
, ok                  = helpers.ok
, expectErr           = helpers.expectErr
, encryptionConfig    = helpers.encryptionConfig
, httpSignatureConfig = helpers.httpSignatureConfig
, ticket              = helpers.ticket
, claims              = require('../')({
		encryption: encryptionConfig, 
		claimsAuth: {
			host: 'http://localhost:3000',
			httpSignature: {
				key: httpSignatureConfig.keys.trustedClientExampleKey.priv,
				keyId: 'trustedClientExampleKeyId'
			}
		}
	})
;

claims(ticket.string, function (err, claims) {
	if (err) throw err;
	
	describe('claims resolver', function() {

		/**
			* passes when a claims-service is running at the address configured above
			*/
		it('expands claims', function(done) {
			claims.uid = '0';
			debugger;
			claims.get('12.2', expect('resolved value', done));
		});
	});
});