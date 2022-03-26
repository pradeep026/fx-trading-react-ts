import React from 'react';
import { render } from '@testing-library/react';
import { Button } from './index';

describe(`Tests Button component`, () => {

    it(`renders Button component`, () => {
        render(<Button label='Button' />);
    });
    
    it(`Button component renders with label`, () => {
        const { getByText } = render(<Button label='Button' />);
        expect(getByText(`Button`)).toBeInTheDocument();
        expect(getByText(`Button`)).toBeEnabled();
    });
    
    it(`Button component when it is disabled`, () => {
        const { getByText } = render(<Button label='Button' disabled={true} />);
        expect(getByText(`Button`)).toBeDisabled();
        expect(getByText(`Button`)).toHaveClass(`button__disabled`);
    });
})