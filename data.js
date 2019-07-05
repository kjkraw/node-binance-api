const binance = require('./binance');
const Order = binance.Order;

module.exports = class Data {

  constructor(binance) {
    this.binance = binance;
  }

  /**
   *
   * @param symbol
   * @param interval
   * @param startTime
   * @param endTime
   * @param limit
   * @returns {PromiseLike<T | never> | Promise<T | never>}
   */
  klines(symbol, {interval = '5m', startTime = null, endTime = null, limit = 500} = {}) {
    if (!INTERVALS.includes(interval))
      throw Error("The interval '" + interval + "' is not a valid kline interval!");
    let params = {
      symbol: symbol,
      interval: interval,
      startTime: startTime,
      endTime: endTime,
      limit: limit
    };
    return this.binance.get('/api/v1/klines', params).then((res) => {
      return res.data;
    });
  }

  price(symbol) {
    return this.binance.get('/api/v3/ticker/price', {symbol: symbol}).then((res) => {
      return res.data;
    });
  }

  avgPrice(symbol) {
    return this.binance.get('/api/v3/avgPrice', {symbol: symbol}).then((res) => {
      return res.data;
    });
  }


};