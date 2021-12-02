import React from 'react';

import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                    name: props.name,
                    value: values.value,
                    },
                });
            }}
                thousandSeparator
                isNumericString
                prefix={props.name}
        />
    );
    });
    
    NumberFormatCustom.propTypes = {
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    };


export default NumberFormatCustom;