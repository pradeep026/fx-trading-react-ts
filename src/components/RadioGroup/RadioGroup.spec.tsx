import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { RadioGroup } from './index';

describe(`Tests CurrencyInput component`, () => {

    it(`CurrencyInput component renders`, () => {
        render(
            <RadioGroup
                name={`test`}
                options={[]}
                selectedValue=''
                onChange={() => {}} />,
        );
    });

    it(`Component renders input field with value`, () => {
        const options = [`TestA`, `TestB`];
        const { getByText, getByTestId } = render(
            <RadioGroup
                name={`test`}
                options={options}
                selectedValue='TestA'
                onChange={() => {}} />,
        );
        options.forEach((option) => {
            // ensures radio button label
            expect(getByText(option)).toBeInTheDocument();
            // ensures radio button by id
            expect(getByTestId(option)).toBeInTheDocument();
        });
    });

    it(`When radio selection is changed / selected`, () => {
        const options = [`TestA`, `TestB`];
        const { getByLabelText } = render(
            <RadioGroup
                name={`test`}
                options={options}
                selectedValue='TestA'
                onChange={(_) => { }} />,
        );
        // Default `selectedValue` TestA radio component  is checked
        expect(getByLabelText(`TestA`)).toBeChecked();
        fireEvent.click(getByLabelText(`TestB`));
        //  TestA radio component is should changed to unchecked
        expect(getByLabelText(`TestA`)).not.toBeChecked();
        // TestB radio component is should changed to checked
        expect(getByLabelText(`TestB`)).toBeChecked();
    });
});
