import React from 'react';
import { render } from '@testing-library/react';
import { CurrencyInput } from './index';

describe(`Tests CurrencyInput component`, () => {

    it(`CurrencyInput component renders`, () => {
        render(<CurrencyInput value="" onChange={() => {}} />);
    });

    it(`Component renders input field with value`, () => {
        const { getByTestId } = render(<CurrencyInput value="1000" onChange={() => {}} />);
        getByTestId(`currency--input`);
        expect(getByTestId(`currency--input`)).toHaveAttribute(`value`, `1000`);
    });
});
