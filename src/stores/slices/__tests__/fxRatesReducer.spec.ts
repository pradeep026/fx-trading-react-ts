import { CurrencyPair } from '../../../constants';
import { fakeBidAsk } from '../../services/fxRateSubscriber';
import fxRatesReducer from '../fxRates';
import * as Action from '../fxRates';

const createFakeUpdate = () => {
    return {
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
    };
};

describe(`Test fxRates slice`, () => {

    it(`initial state returns`, () => {
        const action = { type: undefined };
        const state = fxRatesReducer(undefined, action);

        //assert currency pair length
        expect(state).toBe(Action.initialState);
    });

    it(`State updates when latest fx prices are received`, () => {
        const fakeFxRate = createFakeUpdate();
        const selectedCurrency = CurrencyPair[0];
        let state = fxRatesReducer(undefined, Action.selectCurrencyPair(selectedCurrency.value));
        state = fxRatesReducer(state, Action.setLatestFxRates(fakeFxRate));

        //assert currency pair length
        expect(state.currencyPair).toHaveLength(CurrencyPair.length);
        expect(Object.keys(state.fxRates).length > 0).toBeTruthy();
        expect(state.buyOrSell).toBe(`BUY`);
        expect(state.investmentCcy).toBe(`eur`);
        expect(state.ccyKey).toBe(`eurusd`);
        expect(state.ccyPair.ccy1).toBe(`eur`);
        expect(state.ccyPair.ccy2).toBe(`usd`);
        expect(state.priceOfSelectedCurrencyPair).toBe(fakeFxRate[`eurusd`]);
        expect(state.confirmationMessage).toBeNull();
        expect(state.canTrade).toBeFalsy();
    });

    it(`Perform submit trade action`, () => {
        const fakeFxRate = createFakeUpdate();
        const selectedCurrency = CurrencyPair[0];
        let state = fxRatesReducer(undefined, Action.selectCurrencyPair(selectedCurrency.value));
        state = fxRatesReducer(state, Action.setLatestFxRates(fakeFxRate));
        state = fxRatesReducer(state, Action.setAmount(`1000`));

        //assert currency pair length
        expect(state.currencyPair).toHaveLength(CurrencyPair.length);
        expect(state.amount).toBe(`1000`);
        expect(state.buyOrSell).toBe(`BUY`);
        expect(state.investmentCcy).toBe(`eur`);
        expect(state.ccyKey).toBe(`eurusd`);
        expect(state.ccyPair.ccy1).toBe(`eur`);
        expect(state.ccyPair.ccy2).toBe(`usd`);
        expect(state.priceOfSelectedCurrencyPair).toBe(fakeFxRate[`eurusd`]);
        expect(state.confirmationMessage).toBeNull();
        expect(state.canTrade).toBeTruthy();

        // perform submit trade action
        state = fxRatesReducer(state, Action.submitTradeRequest());
        expect(state.confirmationMessage).toContain(`Bought 1000 EUR for`);

        // switch buyOrSell value to SELL and dispatch `submitTradeRequest`
        state = fxRatesReducer(state, Action.setBuyOrSell(`SELL`));
        state = fxRatesReducer(state, Action.submitTradeRequest());
        expect(state.confirmationMessage).toContain(`Sold 1000 EUR for`);

        // Switch currency radio option and dispatch `submitTradeRequest`
        state = fxRatesReducer(state, Action.setInvestmentCcy(`USD`));
        state = fxRatesReducer(state, Action.submitTradeRequest());
        expect(state.confirmationMessage).toContain(`Sold 1000 USD for`);

        // Reset CurrencyPair to empty which resets confirmation message, prices, canTrade and ccyPair values
        state = fxRatesReducer(undefined, Action.selectCurrencyPair(``));
        expect(state.priceOfSelectedCurrencyPair).toBeNull();
        expect(state.confirmationMessage).toBeNull();
        expect(state.ccyPair.ccy1).toBe(``);
        expect(state.canTrade).toBeFalsy();
    });
});
