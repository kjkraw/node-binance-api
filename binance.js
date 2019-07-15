const axios = require('axios');
const crypto = require('crypto');
const qs = require('qs');
const Account = require('./account');
const Data = require('./data');

module.exports.Binance = class Binance {

  constructor(apiKey, secretKey, testMode = true) {
    this.secretKey = secretKey;
    this.testMode = testMode;
    this.axios = axios.create({
      baseURL: 'https://api.binance.com',
      headers: {
        'X-MBX-APIKEY': apiKey
      }
    });
    this.Account = new Account(this);
    this.Data = new Data(this);
  }

  get(endpt, params) {
    params.symbol = params.symbol.toUpperCase();
    return this.axios({
      method: 'get',
      url: endpt,
      params: params
    }).catch((error) => {
      console.log(error.message);
    });
  }

  sign(params) {
    return crypto.createHmac('sha256', this.secretKey).update(qs.stringify(params)).digest('hex');
  }

  signed_get(endpt, params) {
    params = Object.assign({recvWindow: 5000, timeInForce: 'GTC'}, params);
    params.symbol = params.symbol.toUpperCase();
    params.timestamp = Date.now();
    params.signature = this.sign(params);
    return this.get(endpt, params);
  }

  post(endpt, headers, params) {
    params = Object.assign({recvWindow: 5000, timeInForce: 'GTC'}, params);
    params.symbol = params.symbol.toUpperCase();
    params.timestamp = Date.now();
    params.signature = this.sign(params);
    return this.axios({
      method: 'post',
      url: endpt,
      headers: headers,
      params: params
    }).catch((error) => {
      console.log(error.message);
    });
  }

  delete(endpt, params) {
    params = Object.assign({recvWindow: 5000, timeInForce: 'GTC'}, params);
    params.symbol = params.symbol.toUpperCase();
    params.timestamp = Date.now();
    params.signature = this.sign(params);
    return this.axios({
      method: 'delete',
      url: endpt,
      params: params
    }).catch((error) => {
      console.log(error.message);
    });
  }

};