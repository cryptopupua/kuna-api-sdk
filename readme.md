# Kuna API SDK

### Quick start
```js
// 1. init a keys
const keys = {
  publicKey: 'XXXXXXXXXXXXXXXXXXXXXXXXX',
  secretKey: 'XXXXXXXXXXXXXXXXXXXXXXXXX',
}

// 2. you can use api V2 or V3 
const kuna = require('kuna-api-sdk/v3')(keys)  // { public:..., private:... }
const kunaV2 = require('kuna-api-sdk/v2')(keys) // { public:..., private:... }

kuna.public.getTickers('btcuah')
  .then((data) => console.log(data))
  .catch(err => console.log('Error: ', err))

kuna.private.accountInfo()
  .then((data) => console.log(data))
  .catch(err => console.log('Error: ', err))
```

### API V2
#### kuna.public.
* `.getCurrency()` - Последние данные по рынку 
* `.getBirgaStakan()` - Биржевой стакан
* `.getHistoryTrades()` -  История торгов
* `.getUnixTime()` -  Забрать время Юникс
* `.request()` -  Сделать запрос

#### kuna.private.
* `.getOrders('btcuah')` - Активные ордера пользователя 
* `.getInfoUser()` -  Информация о пользователе и активах 
* `.cancelOrder(order_id)` - Отмена ордера
* `.makeOrder({side, volume, market, price})` - Выставить ордер 
* `.getTrades ('btcuah')` - История сделок пользователя 
* `.authedRequest()` -  Сделать запрос с авторизационными заголовками и подписью
* `.getSignature(method, url, queryParams)` - Создать подпись

### API V3
#### kuna.public.
* `.getUnixTime()` - Забрать время Юникс
* `.getCurrencies()` - Список доступных валют
* `.getMarkets()` - Рынки
* `.getTickers()` - Последние данные по рынку
* `.getOrderBook()` - Биржевой стакан
* `.getFees()` - Комиссии на ввод и вывод
* `.request()` - Сделать запрос

#### kuna.private.
* `.accountInfo()` - Данные аккаунта
* `.accountBalance()` -  Баланс аккаунта 
* `.createOrder({symbol, type, amount, price})` - Создать ордер
* `.getActiveOrders(market)` - Список активных ордеров
* `.cancelOrder(order_id)` - Отменить ордер
* `.getAssetsHistory(type)` -  Получить историю депозитов и выводов
* `.getExecutedOrders(market)` -  Список исполненных ордеров
* `.getTradesByOrderId(market, order_id)` -  Список сделок по ордеру
* `.cancelBuyOrders(market)` - Отменить ордера на покупку
* `.cancelSellOrders(market)` - Отменить ордера на продажу
* `.cancelOrderBySide(market, sign)` - Отменить ордера по знаку ("-1" - продажа, "1" - покупка)
* `.cancelAllOrders(market)` - Отменить все ордера 
* `.authedRequest()` -  Сделать запрос с авторизационными заголовками и подписью
* `.getSignature(url_api, nonce, body)` - Создать подпись

#### How to set environment

`$env:NODE_ENV = 'production'` - to turn on production configuration (Windows case) 

