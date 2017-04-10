import React from "react"
import { connect } from "react-redux"

import Input from "./Input";
import SelectComponent from "./SelectComponent";

import { FormGroup, FormControl, Col, Button, Glyphicon } from 'react-bootstrap/lib';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';

import { getRates, getConversionResult, changeBaseCurrencies, deleteConversion, swapCurValues } from "../actions/ratesActions";

require('../../sass/style.scss');

@connect((store) => {
    return {
        rates: store.rates.rates,
        from: store.rates.from,
        to: store.rates.to,
        fetched: store.rates.fetched,
        conNumInput: store.rates.conNumInput,
        numInput: store.rates.numInput,
        result: store.rates.result,
        conFetched: store.rates.conFetched,
        conFromCurr: store.rates.conFromCurr,
        conToCurr: store.rates.conToCurr,
        history: store.rates.history
    };
})
export default class Layout extends React.Component {

    componentWillMount() {
        this.props.dispatch(getRates());
    }

    fromFormGroup() {
        bootstrapUtils.addStyle(FormGroup, "from");
        return  <FormGroup bsStyle="from">
                        <Input className="input--from" val={this.props.numInput} dispatch = { this.props.dispatch }/>
                        <SelectComponent
                            base={this.props.from}
                            rates={this.props.rates}
                            fetched={this.props.fetched}
                            forClass="select--from"
                            type="from"
                            dispatch = { this.props.dispatch }
                        />
                    </FormGroup>
    }

    toFormGroup() {
        bootstrapUtils.addStyle(FormGroup, "to");
        return  <FormGroup  bsStyle="to">
                        <SelectComponent
                            base={this.props.to}
                            rates={this.props.rates}
                            fetched={this.props.fetched} f
                            orClass="select--to"
                            type="to"
                            dispatch = { this.props.dispatch }
                        />
                    </FormGroup>
    }

    swapButton() {
        bootstrapUtils.addStyle(Button, "swap");
        return  <Button bsStyle="swap" onClick={this.swapValues.bind(this)}>
                        <Glyphicon glyph="transfer"/>
                    </Button>
    }

    swapValues() {
        if (this.props.from !== this.props.to) {
            this.props.dispatch(swapCurValues(this.props.from, this.props.to));
        }
    }

    submitButton() {
        bootstrapUtils.addStyle(Button, "convert");
        return  <Button bsStyle="convert" onClick={this.convertCurrencies.bind(this)}>
                        Convert
                    </Button>
    }

    conversionResult() {
        if (this.props.conFetched) {
            return  <div class="wrap--result">
                            <p class="result--from">{this.props.conNumInput} {this.props.conFromCurr} equals</p>
                            <p class="result--to">{this.props.result} {this.props.conToCurr}</p>
                        </div>
        }
    }

    closeHistoryButton() {
        bootstrapUtils.addStyle(Button, "history");
        return  <Button bsStyle="history" onClick={this.dropdownHistory.bind(this)}></Button>
    }

    convertCurrencies() {
        const fromValue = parseFloat(document.getElementsByClassName("input--from")[0].value);
        const fromCurrency = this.props.from
        const toCurrency = this.props.to
        if (fromCurrency !== toCurrency && fromValue != 0  && isNaN(fromValue) == false) {
            this.props.dispatch(getConversionResult(fromValue, fromCurrency, toCurrency));
        }
    }

    conversionHistory() {
        bootstrapUtils.addStyle(Glyphicon, "custom");
        const conversions = this.props.history;
        let PrevConversions;
        if (this.props.conFetched  && this.props.history.length != 0) {
            PrevConversions = conversions.map((conversion) => {
                return  <li key={conversion.id} data-id={conversion.id}>
                                <p>{conversion.fVal} {conversion.from} = <span class="to">{conversion.tVal} {conversion.to}</span><Glyphicon glyph="remove" bsStyle="custom" onClick={this.deleteOneConversion.bind(this)}/>
                                </p>
                            </li>;
            });
            return  <div class="content--history open">
                            <ul>
                                {PrevConversions}
                            </ul>
                            {this.closeHistoryButton()}
                        </div>
        }
    }

    dropdownHistory() {
        let historyDiv = document.getElementsByClassName('content--history')[0]
        let buttHistory = document.getElementsByClassName('btn-history')[0]
        if (!historyDiv.classList.contains('open')) {
            historyDiv.classList.add('open')
            buttHistory.classList.remove('closed-history')
        }
        else {
            historyDiv.classList.remove('open')
            buttHistory.classList.add('closed-history')
        }
    }

    deleteOneConversion(e) {
        let conId = e.target.parentElement.parentElement.getAttribute("data-id")
        this.props.dispatch(deleteConversion(conId))
    }

    render() {
        return (
            <div class="wrap--content">
                <div class="content--main">
                    <h1 class="title">Currency Converter</h1>
                    <form>
                        {this.fromFormGroup()}
                        {this.swapButton()}
                        {this.toFormGroup()}
                        {this.submitButton()}
                        {this.conversionResult()}
                    </form>
                </div>
                {this.conversionHistory()}
            </div>
        )
    }
}
