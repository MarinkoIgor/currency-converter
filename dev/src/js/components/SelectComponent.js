import React from 'react';

import Select from 'react-select';

import { FormControl } from 'react-bootstrap/lib';

import { getRates, changeToVal } from "../actions/ratesActions";

export default class SelectComponent extends React.Component {

    returnOptions(rates) {
        let arr = []
        for (var key in rates) {
            let obj = { value: key, label: key }
            arr.push(obj);
        }
        if (this.props.type == "from") {
            arr.push({ value: this.props.base, label: this.props.base })
        }
        return arr
    }

    optionsList() {
        let { rates } = this.props
        let fetchedRates;
        if (this.props.fetched) {
            rates = rates.data.rates
            fetchedRates = this.returnOptions(rates)
        }
        else {
            fetchedRates = this.returnOptions(rates)
        }
        return fetchedRates;
    }

    changeBaseVal(e) {
        let selectField = this.props.type
        if (selectField == "from") {
            this.changeFromVal(e.value)
        }
        else {
            this.changeToVal(e.value);
        }
    }

    changeFromVal(val) {
        this.props.dispatch(getRates(val));
    }

    changeToVal(val) {
        this.props.dispatch(changeToVal(val));
    }

    render() {
        let { base } = this.props
        let classVal = this.props.forClass
        let options = this.optionsList();
        let clearable = false
        return (
            <Select
                    name="form-field-name"
                    value={base}
                    options={options}
                    clearable={clearable}
                    className={classVal}
                    onChange={this.changeBaseVal.bind(this)}
            />
        )
    }

}
