import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyPair } from '../../constants';
import { BuyOrSell, CCYPair, FxRates, FxRatesReducerState, Price } from '../types';

const hasPrice = (ccyPair: CCYPair, price?: Price | null) => {
    return !!ccyPair && price !== null && Object.keys(price ?? {})?.length > 0;
};
const isValidAmount = (amount: string) => amount?.trim() !== `` && !isNaN(Number(amount));

const canTrade = (ccyPair: CCYPair, buyOrSell: BuyOrSell, amount: string, price?: Price | null ): boolean => {
    return hasPrice(ccyPair, price) && buyOrSell && isValidAmount(amount);
};

/**
 * Returns the counter rate against selected options
 *
 * @param state
 * @return - Returns the counter rate
 */
function getCounterRate(state: FxRatesReducerState): number {
    if (state.buyOrSell === 'BUY') {
      if (state.investmentCcy === state.ccyPair.ccy1) {
        return Number(state.priceOfSelectedCurrencyPair?.bid);
      } else {
        return 1 / Number(state.priceOfSelectedCurrencyPair?.bid);
      }
    } else {
      if (state.investmentCcy === state.ccyPair.ccy1) {
        return Number(state.priceOfSelectedCurrencyPair?.ask);
      } else {
        return 1 / Number(state.priceOfSelectedCurrencyPair?.ask);
      }
    }
}

/**
 *
 * @param param
 * @return
 */
function getCounterCcy({ ccyPair, investmentCcy}: FxRatesReducerState): string {
    return investmentCcy === ccyPair.ccy1 ? ccyPair?.ccy2 : ccyPair?.ccy1;
}


export const initialState: FxRatesReducerState = {
    fxRates: {},

    currencyPair: CurrencyPair,

    ccyKey: `eurusd`,

    ccyPair: {
        ccy1: `eur`,
        ccy2: `usd`,
    },

    investmentCcy: `eur`,

    priceOfSelectedCurrencyPair: null,

    buyOrSell: `BUY`,

    amount: ``,

    canTrade: false,

    confirmationMessage: null,

};

export const fxRatesSlice = createSlice({
    name: `fxRates`,
    initialState,
    reducers: {
        selectCurrencyPair(state, action: PayloadAction<string>) {
            const [ ccy1, ccy2 ] = action.payload?.split(`,`);
            state.ccyKey = `${ccy1}${ccy2}`;
            state.ccyPair = { ccy1, ccy2 };
            state.investmentCcy = ccy1;
            // Reset latest price to null when currency pair selection is empty
            if (!action.payload) {
                state.fxRates = {};
                state.priceOfSelectedCurrencyPair = null;
            }
            // Reset the confirmation message on currency pair value selection
            state.confirmationMessage = null;
            state.canTrade = canTrade(state.ccyPair, state.buyOrSell, state.amount, state.priceOfSelectedCurrencyPair);
        },
        setLatestFxRates(state, action: PayloadAction<FxRates>) {
            state.fxRates = action.payload;
            state.priceOfSelectedCurrencyPair = action.payload[state.ccyKey];
        },
        setBuyOrSell(state, action: PayloadAction<BuyOrSell>) {
            state.buyOrSell = action.payload;
        },
        setInvestmentCcy(state, action: PayloadAction<string>) {
            state.investmentCcy = action.payload;
        },
        setAmount(state, action: PayloadAction<string>) {
            state.amount = action.payload;
            // Validate amount, price and currency pair
            const isValid = canTrade(state.ccyPair, state.buyOrSell, state.amount, state.priceOfSelectedCurrencyPair);
            state.canTrade = isValid;
        },
        submitTradeRequest(state) {
            const confirmationMessage = `${state.buyOrSell === 'BUY' ? 'Bought' : 'Sold'} ${state.amount} ${
                state?.investmentCcy?.toUpperCase()} for ${
                    getCounterRate(state) * Number(state.amount)} ${
                        getCounterCcy(state)?.toUpperCase()}`;
            state.confirmationMessage = confirmationMessage;
        },
    },
});

export const { selectCurrencyPair, setLatestFxRates, setBuyOrSell, setInvestmentCcy, setAmount, submitTradeRequest } = fxRatesSlice.actions;

export default fxRatesSlice.reducer;
