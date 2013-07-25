'use strict';

var util = require('util')
, extend = util._extend
, dbc = require('dbc.js')
, ClaimsClient = require('./claims_client')
;

function Resolver(options) {
	ClaimsClient.super_.call(this, options);
}
util.inherits(Resolver, ClaimsClient);

Object.defineProperties(Resolver.prototype, {

	expand: {
		enumerable: true,
		value: function expand(claims, csid, cid, callback) {
			dbc('object' === typeof claims, 'claims (argument 1) must be provided');
			callback = callback || cid || csid;
			dbc('function' === typeof callback, 'callback (last argument) must be provided');
			var path = '/'.concat(claims.userId);
			if ('undefined' === typeof csid) {
				path += '/'.concat(csid);
				if ('undefined' === typeof cid) {
					path += '/'.concat(cid);
					this._log('info', ''.concat('claims_client.expand -- arity3: expanding claim [', cid, ']', 'from claimset [', csid, ']'));
				} else {
					this._log('info', ''.concat('claims_client.expand -- arity2: expanding claimset [', csid, ']'));	
				}
			} else {
				this._log('info', 'claims_client.expand -- arity1: expanding all claims');
			}
			path += '/expand/';
			this.get({ path: path }, function(err, res) {
				if (!err) {
					extend(claims, res);
				}
				callback(err, claims);
			});
		}
	}

});

Object.defineProperties(Resolver, {
	create: {
		enumerable: true,
		value: function(options) {
			return new Resolver(options);
		}
	}
});
module.exports = Resolver;