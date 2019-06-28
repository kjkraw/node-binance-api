const binance = require('./binance');

module.exports = class Account {

  constructor(binance) {
    this.binance = binance;
  }

  test_order(order) {
    return this.binance.post('/api/v3/order/test', {}, order.params).then((res) => {
      return res.data;
    });
  }

  place_order(order) {
    return this.binance.post('/api/v3/order', {}, order.params).then((res) => {
      return res.data;
    });
  }

  cancel_order(symbol, orderId) {
    return this.binance.delete('/api/v3/order', {symbol: symbol, orderId: orderId}).then((res) => {
      return res.data;
    });
  }

  order_status(symbol, orderId) {
    return this.binance.get('/api/v3/order', {symbol: symbol, orderId: orderId, timestamp: Date.now()}).then((res) => {
      return res.data;
    });
  }

  open_orders(symbol){
    return this.binance.signed_get('/api/v3/openOrders').then((res) => {
      return res.data;
    })
  }

  //Implement all_orders

  info(){
    return this.binance.signed_get('api/v3/account').then((res) => {
      return res.data;
    })
  }

  //Implement myTrades



};