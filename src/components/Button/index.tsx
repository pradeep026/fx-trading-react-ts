import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

type Props =
    & React.ComponentPropsWithRef<'button'>
    & {
        /**
         * Label or Text to Display on Button
         */
        label: string;
    };

export const Button: React.FC<Props> = (props) => {

  return (
    <button
        data-testid
        className={`button__component
            ${props.disabled ? `button__disabled` : ``}`}
        onClick={props.onClick}
        disabled={props.disabled}>
        {props.label}
    </button>
  );
};

Button.propTypes = {
    /**
     * Button label
    */
    label: PropTypes.string.isRequired,

    /**
     * Callback function which will be called when button is clicked
     */
    onClick: PropTypes.func,

    /**
     * disabled prop to set button disabled / enabled
     */
     disabled: PropTypes.bool,
};
