import React from 'react';

import './style.scss';

type Props = {
    /**
     * Ticker Label to display
     */
    label: string;

    /**
     * value of bid or ask
     */
    value?: string;
}

export const Ticker: React.FC<Props> = ({ label, value }) => {

    return (
        <div className="ticker__component">
            <label>{label}</label>
            <div className="spot" data-testid={`ticker--${label?.toLocaleLowerCase()}`}>
                {value}
            </div>
        </div>
    );
};
