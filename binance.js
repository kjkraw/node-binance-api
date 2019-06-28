const axios = require('axios');
const crypto = require('crypto');
const qs = require('qs');
const Account = require('./account');
const Data = require('./data');

const INTERVALS = ['1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M'];

const api_key = "skJ7jTlgjoss6OmVF4E9lKfit9TVfIrYcQ1h07ZxNff8BSv6L0Oy7mOXjmsjJbCG";
const secret_key = "BHSRAYTfprCgeWhHofM8UmArXdKc7m4lm5d02NrnuORLmI0TiUYBMG0LuPyf6ffX";

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


module.exports.Order = class Order {

  /**
   *
   * @param symbol: String
   * @param side: EnumTradeSide
   * @param quantity: Float
   * @param price: Float
   */
  constructor(symbol, side, quantity, price) {
    this.symbol = symbol.toUpperCase();
    this.side = side;
    this.quantity = quantity;
    this.price = price;
    this.type = EnumTradeType.limit;
  }

  get params() {
    return {
      symbol: this.symbol,
      side: this.side,
      type: this.type,
      quantity: this.quantity,
      price: this.price
    };
  }

  toPostgres() { //todo

  }
};