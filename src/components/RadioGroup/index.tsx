import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from './Radio';

import './style.scss';

export type RadioGroupProps = {
    /**
     * Radio group options
     */
    options?: string[];

    /**
     * name of the radio group
     */
    name: string;

    /**
     * selected value
     */
    selectedValue: string;

    /**
     * callback funtion to pass the selected radio option when there is a change
     */
    onChange?: (selectedValue: string) => void
};

export const RadioGroup: React.FC<RadioGroupProps> = React.memo((props) => {

    const __onSelectRadioItem = (event: any) => {
        if (typeof props?.onChange === `function`) {
            props?.onChange(event.target?.value ?? ``);
        }
    };

    return (
        <div className='radio__group-component'>
            {
                props.options?.map((option, index: number) => {
                    return (
                        <Radio
                            key={index}
                            name={props.name}
                            label={option}
                            value={option}
                            onChange={__onSelectRadioItem}
                            defaultChecked={props?.selectedValue === option} />
                    );
                })
            }
        </div>
    );
});

RadioGroup.propTypes = {

    options: PropTypes.arrayOf(PropTypes.string.isRequired),

    name: PropTypes.string.isRequired,

    selectedValue: PropTypes.string.isRequired,

    onChange: PropTypes.func.isRequired,
};
