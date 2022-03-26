/**
 * Types of stores and services
 */

 export type CCYPair = {
    /**
     * Currency name, parsed from the `CurrencyPairType` value
     */
    ccy1: string,

    /**
     * Currency name, parsed from the `CurrencyPairType` value
     */
    ccy2: string
}

export type Price = {
    /**
     * **Bid** is the price which the buyer,
     * usually a bank, is willing to pay for one unit of the first currency.
     */
    bid: string;
    /**
     * **Ask** is the price which the seller,
     * usually a bank, is willing to take for one unit of the first currency
     */
    ask: string;

    ccyPair: CCYPair;
}

/**
 * Fx rates -
 */
export type FxRates = {
    [key: string]: Price
}

/**
 * Fx rates subscribtion function
 */
export type OnReceiveFunction = (fxRates: FxRates) => void;

export type FxRateSubscriberProps = {
    /**
     * Subscriber function to receive fx rates on X interval period
     * @param fxRates - { FxRates }
     */
    onReceive: (fxRates: FxRates) => void;
};

export interface FxRateSubscriber {
    /**
     * Subscribe function to start listen for fx rates
     */
    subscribe: () => void;

    /**
     * Unsubscribe function to stop the fx rates
     */
    unsubscribe: () => void;
};

/**
 * Currency pair type
 */
export type CurrencyPairType = {
    /**
     * label of currency pair which to be displayed
     */
    label: string;

    /**
     * value of currency pair
     */
     value: string;
}


/**
 * Interface or type of FxRates reducer
 */

export type BuyOrSell = `BUY` | 'SELL';

export interface FxRatesReducerState {
    /**
     * Latest fx rates
     */
    fxRates: FxRates,

    /**
     * List of currency pair, which to be used to render the selection list
     */
    currencyPair: CurrencyPairType[],

    /*
    * Key to get the bid and ask value for selected currency
    * ccyKey - ex. eurusd
    */
    ccyKey: string;

    /**
     * Currency pair as object
     */
    ccyPair: CCYPair,

    investmentCcy: string;

    /**
     * Price of selected currency pair
     */
    priceOfSelectedCurrencyPair: Price | null;

    /**
      * Trade option - either buy or sell
      */
     buyOrSell: BuyOrSell;

    /**
      * Amount which is entered for trade / conversion
      */
      amount: string;

    /**
      * Validate buySell (trade option), selected currency and valid amount
      * This flag can be used to disable / enable Trade button
      */
     canTrade: boolean

    /**
      * Final result of the Trade, which to be displayed as outcome
      */
    confirmationMessage: string | null;
}
