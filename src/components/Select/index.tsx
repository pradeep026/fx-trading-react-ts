import React from 'react';
// import PropTypes from 'prop-types';
import './style.scss';

type SelectOption = {
    /**
     * label of the select option
     */
    label: string;

     /**
     * value of the select option
     */
    value: string;
}

type Props =
    & React.ComponentPropsWithRef<'select'>
    & {
        /**
         * options - Array of SelectOption
         */
        options: SelectOption[];

        /**
         * Default select option
         */
        defaultOption: string

        /**
         * Label - string
         */
        label: string;
    };

export const Select: React.FC<Props> = (props) => {

    return (
        <div className='select__component'>
            <label>{props.label}</label>
            <select data-testid={`select--component`}>
              <option value="">{props.defaultOption}</option>
              {props.options?.map((option, index) => {
                  return (
                    <option value={option.value} key={index}>
                        {option.label}
                    </option>
                  );
              })}
            </select>
        </div>
    );
};
