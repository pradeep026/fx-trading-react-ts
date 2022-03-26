import React from 'react';
import type { RadioGroupProps } from './index';

type RadioProps =
  Pick<RadioGroupProps, 'name' | 'onChange'>
  & {
    /**
     * Label for Radio component
     */
     label: string;

     /**
      * Value of the Radio
      */
     value: string;

     /**
      * Default selected radio option
      */
    defaultChecked?: boolean
};

export const Radio: React.FC<RadioProps> = (props) => {

    return (
        <div className={'radio--component'}>
            <input
                type={'radio'}
                id={props.label}
                name={props.name}
                value={props.value}
                data-testid={props.label}
                defaultChecked={props?.defaultChecked} />
            <label htmlFor={props.label}>
                {props.label}
            </label>
        </div>
    );
};
