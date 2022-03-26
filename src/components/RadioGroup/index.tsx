import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Radio } from './Radio';

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

    return (
        <div className='input__currency-component'>
            {
                props.options?.map((option, index: number) => {
                    return (
                        <Radio
                            key={index}
                            name={props.name}
                            label={option}
                            value={option}
                            defaultChecked={props?.selectedValue === option}
                            onChange={props?.onChange} />
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
