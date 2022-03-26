import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

type Props = React.ComponentPropsWithRef<'input'>;

export const CurrencyInput: React.FC<Props> = React.memo((props) => {

    // const __onValueChange = (event: React.FocusEvent<HTMLInputElement>) => {
    //     const value = event.target.value;
    //     console.log(value);
    // };

    return (
        <div className='input__currency-component'>
            <label>Amount</label>
            <input
                data-testid="currency--input-testid"
                type={'type'}
                value={props.value}
                onChange={props.onChange}
                placeholder={'Example: 1000'} />
        </div>
    );
});

CurrencyInput.propTypes = {
    /**
     * User input value of the amount
    */
    value: PropTypes.string.isRequired,

    /**
     * On change event callback function
     */
    onChange: PropTypes.func.isRequired,
};
