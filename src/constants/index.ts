/**
 * Constants
 */

import { CurrencyPairType } from '../stores/types';

export const TradeOptions: string[] = [`BUY`, `SELL`];

export const CurrencyPair: CurrencyPairType[] = [
    {
        label: `EUR / USD`,
        value: `eur,usd`,
    },
    {
        label: `EUR / CHF`,
        value: `eur,chf`,
    },
    {
        label: `USD / CHF`,
        value: `usd,chf`,
    },
];
