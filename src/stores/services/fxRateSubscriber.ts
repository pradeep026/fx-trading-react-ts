import { getRandomInt } from './getRandomInt';
import type { FxRateSubscriber, FxRateSubscriberProps, Price } from '../types';

/**
 * Fake FX SPOT subscription.
 * This would otherwise open a websocket connection
 * @parameter param - { onReceive } - subscriber callback function
 *  to receive latest fx rates
 * @return { FxRateSubscriber } - returns an object of
 * functions for subscribe and unsubscribe
 */
export function fxRateSubscriber({ onReceive }: FxRateSubscriberProps)
  : FxRateSubscriber {
  let subscribed;

  const subscribe = () => {
    if (subscribed) {
      return;
    }

    const createFakeUpdate = () =>
      onReceive({
        eurusd: {
          ccyPair: { ccy1: `EUR`, ccy2: `USD` },
          ...fakeBidAsk(`1.16`, 0.00012),
        },
        eurchf: {
          ccyPair: { ccy1: `EUR`, ccy2: `CHF` },
          ...fakeBidAsk(`1.09`, 0.00006),
        },
        usdchf: {
          ccyPair: { ccy1: `USD`, ccy2: `CHF` },
          ...fakeBidAsk(`0.93`, 0.0001),
        },
      });

    /* initial data */
    setTimeout(() => {
      createFakeUpdate();
    }, 0);

    subscribed = setInterval(() => {
      createFakeUpdate();
    }, 1000);
  };

  const unsubscribe = () => {
    clearInterval(subscribed);
  };

  return {
    subscribe,
    unsubscribe,
  };
}

/**
 * Appends random generated pip value to price and returns it as string
 * @param price - price value with random generated fraction value
 * @return - s{ tring } ex. 1.09535
 */
function withFakePips(price: number): string {
  /* add 3 digits of pips */
  const pips =
    getRandomInt(1, 10) * 100 + getRandomInt(1, 10) * 10 + getRandomInt(1, 10);
  return `${price}${pips}`;
}

/**
 * Mock function to generate the values of Bid and Ask
 *
 * @param originalPrice
 * @param spread
 * @return - { Pick<Price, 'ask' | 'bid'> }returns bid and ask value
 */
export function fakeBidAsk(originalPrice: string, spread: number)
  : Pick<Price, 'ask' | 'bid'> {

  const price = Number(withFakePips(Number(originalPrice)));
  return {
    ask: ((price * 100000 + Math.ceil((spread * 100000) / 2)) / 100000)
      .toFixed(5),
    bid: (
      (price * 100000 - Math.floor((spread * 100000) / 2)) /
      100000
    ).toFixed(5),
  };
}
