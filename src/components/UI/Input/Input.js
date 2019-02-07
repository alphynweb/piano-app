import React from 'react';

import Wrapper from '../../../hoc/Wrapper/Wrapper';

const input = (props) => {

    let inputElement;

    switch (props.inputType) {
        case "input":
            inputElement = (
                <input
                    {...props.inputConfig}
                    value={props.inputValue}
                    onChange={props.changed} />
            );
            break;
        default:
            break;
    }

    return (
        <Wrapper>
            <label>{props.inputLabel}</label>
            {inputElement}
        </Wrapper>
    );
};

export default input;