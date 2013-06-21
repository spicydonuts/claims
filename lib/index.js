var signer = require('./signer')
, verifier = require('./verifier')
, parser = require('./parser')
;

function isConfigured() {
	return signer.isConfigured
		&& verifier.isConfigured
		&& parser.isConfigured
		;
}

function $init($config) {
	if (typeof $config !== 'undefined' && !isConfigured()) {
		signer($config);
		verifier($config);
		parser($config, verifier);
	}
}

Object.defineProperties($init, {

	signer: {
		value: signer,
		enumerable: true
	},

	verifier: {
		value: verifier,
		enumerable: true
	},

	parse: {
		value: function(claimsTicket, keyName) {
			return parser.decode(claimsTicket, keyName);
		},
		enumerable: true
	},

	isConfigured: {
		get: isConfigured,
		enumerable: true
	}

});

module.exports = $init;