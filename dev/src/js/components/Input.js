import React from 'react';

import { FormControl } from 'react-bootstrap/lib';

import NumericInput from 'react-numeric-input';

import { changeInput } from "../actions/ratesActions";

export default class Input extends React.Component {

    changeInputVal(val) {
        this.props.dispatch(changeInput(val));
    }

    render() {

        let { val, className } = this.props

        return (
            <NumericInput step={1} precision={2} value={val} className={"form-control " + className} onChange={this.changeInputVal.bind(this)}/>
        )

    }

}
