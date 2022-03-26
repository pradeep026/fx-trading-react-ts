import React, { useCallback, useEffect, useRef } from 'react';
import { Select, Ticker, TradeForm } from '../../components';
import {
    useAppDispatch,
    useAppSelector,
    selectCurrencyPair,
    setLatestFxRates,
} from '../../stores';
import {
    fxRateSubscriber,
} from '../../stores/services/fxRateSubscriber';
import type { FxRates, FxRateSubscriber } from '../../stores/types';


import './style.scss';

const FxSpot: React.FC = (props) => {
    const dispatch = useAppDispatch();
    const fxRatesStore = useAppSelector((state) => state.fxRates);
    const subscribeAndUnsubscribeRef = useRef<FxRateSubscriber | null>(null);

    useEffect(() => {
        subscribeAndUnsubscribeRef.current = fxRateSubscriber({
            onReceive: (fxRates: FxRates) => {
                dispatch(setLatestFxRates(fxRates));
            },
        });

        return () => {
            /* Clean up function - invokes unsubscribe for fx rates */
            subscribeAndUnsubscribeRef.current?.unsubscribe();
        };
    }, []);

    useEffect(() => {
        const { ccyPair } = fxRatesStore;
        if (!!ccyPair && !!ccyPair?.ccy1 && !!ccyPair?.ccy1) {
            subscribeAndUnsubscribeRef.current?.subscribe();
        } else {
            subscribeAndUnsubscribeRef.current?.unsubscribe();
        }
    }, [fxRatesStore.ccyPair]);

    const onSelectCurrencyPair = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch(selectCurrencyPair(event.target.value));
        }, [],
    );

    return (
        <div className={`fx__spot--page`}>
            <h1 className={`page__title row`}>FX Spot</h1>

            <div className={`row`}>
                <Select
                    label="Currency Pair"
                    options={fxRatesStore?.currencyPair}
                    defaultValue={fxRatesStore?.currencyPair[0].value}
                    defaultOption='No currency selected'
                    onChange={onSelectCurrencyPair} />
            </div>
            <div className={`ticker__container row`}>
                <Ticker
                    label='Bid'
                    value={fxRatesStore.priceOfSelectedCurrencyPair?.bid}/>
                <Ticker
                    label='Ask'
                    value={fxRatesStore.priceOfSelectedCurrencyPair?.ask}/>
            </div>
            <div className="trade__container">
                <TradeForm />
            </div>
        </div>
    );
};

export default FxSpot;
