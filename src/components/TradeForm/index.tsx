import React, { useCallback } from 'react';
import { setAmount, setBuyOrSell, setInvestmentCcy, submitTradeRequest, useAppDispatch, useAppSelector } from '../../stores';
import { BuyOrSell } from '../../stores/types';
import { Button, CurrencyInput, RadioGroup } from '../index';

import './style.scss';

export const TradeForm: React.FC = React.memo(() => {

    const dispatch = useAppDispatch();
    const fxRatesStore = useAppSelector((state) => state.fxRates);

    const __onAmountInput = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
            dispatch(setAmount(event.target.value));
        },
        [],
    );

    const __onSelectBuyORSell = useCallback(
        (selectedValue: string) => {
            dispatch(setBuyOrSell(selectedValue as BuyOrSell));
        },
        [],
    );

    const __onSelectCurrency = useCallback(
        (selectedValue: string) => {
            dispatch(setInvestmentCcy(selectedValue));
        },
        [],
    );

    const __submitTrade = useCallback(
        () => {
            dispatch(submitTradeRequest());
        },
        [],
    );

    return (
        <div className="trade__form">
            <div className="flex__row">
                <RadioGroup
                    name='buySell'
                    selectedValue={fxRatesStore.buyOrSell}
                    options={[`BUY`, `SELL`]}
                    onChange={__onSelectBuyORSell} />
            </div>

            {
                fxRatesStore.priceOfSelectedCurrencyPair &&
                <div className="flex__row">
                    <RadioGroup
                        name='investmentCcy'
                        selectedValue={fxRatesStore.ccyPair.ccy1}
                        options={[fxRatesStore.ccyPair?.ccy1, fxRatesStore.ccyPair?.ccy2]}
                        onChange={__onSelectCurrency} />
                </div>
            }

            <div className="flex__row">
                <CurrencyInput
                    value={fxRatesStore.amount}
                    onChange={__onAmountInput} />
            </div>
            <div className="flex__row btn__trade">
                <Button
                    label="Trade"
                    onClick={__submitTrade}
                    disabled={!fxRatesStore.canTrade} />
            </div>
            {
                fxRatesStore?.confirmationMessage &&
                <div className="flex__row confirmation__message" data-testid={'confirmation--message'}>
                    <span>{fxRatesStore?.confirmationMessage}</span>
                </div>
            }
        </div>
    );
});
