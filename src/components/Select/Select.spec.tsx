import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Select } from './index';

const setSelectedValue = (component: HTMLElement, value: string) => {
    const event = {target: { value } };
    fireEvent.change(component, event);
};

describe(`Tests Select component`, () => {

    it(`Select component renders`, () => {
        render(<Select
                options={[]}
                label={`Select`}
                defaultOption={`Test`} />);
    });

    it(`Select component renders with options`, () => {
        const options = [
            { label: `A`, value: `a` },
            { label: `B`, value: `b` },
            { label: `c`, value: `c` },
        ];
        const label = `Select`;
        const defaultOption = `Select a value`;
        const { getByText } = render(
            <Select
                options={options}
                label={label}
                defaultOption={defaultOption} />,
        );
        expect(getByText(label)).toBeInTheDocument();
        expect(getByText(defaultOption)).toBeInTheDocument();
        expect((getByText(defaultOption) as HTMLOptionElement).selected).toBeTruthy();
        // assert all options are rendered
        options.forEach((option) => {
            expect(getByText(option.label)).toHaveAttribute(`value`, option.value);
        });
    });

    it(`Select component value changes when selecting an option`, () => {
        const options = [
            { label: `A`, value: `a` },
            { label: `B`, value: `b` },
            { label: `c`, value: `c` },
        ];
        const label = `Select`;
        const defaultOption = `Select a value`;
        const { getByTestId } = render(
            <Select
                options={options}
                label={label}
                defaultOption={defaultOption} />,
        );

        const selectComponent = getByTestId(`select--component`);
        expect(selectComponent).toHaveValue(``);
        // fire event to change select option
        setSelectedValue(selectComponent, `a`);
        // assert select value to be `a`
        expect(selectComponent).toHaveValue(`a`);
        // fire event to change select option
        setSelectedValue(selectComponent, `b`);
        expect(selectComponent).toHaveValue(`b`);
    });
});
