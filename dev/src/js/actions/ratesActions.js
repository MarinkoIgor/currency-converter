import axios from "axios";

let fx = require("money");

export function getRates(base = "EUR") {
    let str = "?base=" + base;
    return {
        type: "GET_RATES",
        payload: axios.get("http://api.fixer.io/latest" + str)
    }
}

export function getConversionResult(fromVal, fromCur, toCur) {
    return function(dispatch) {
        axios.get("http://api.fixer.io/latest?base=" + fromCur)
            .then((data) => {
                fx.rates = data.data.rates
                let result = fx.convert(fromVal, {from: "", to: toCur})
                dispatch({
                    type: "GET_CONVERSION_FULFILLED", payload: {
                        conversionResult: result.toFixed(2),
                        fVal: fromVal,
                        conFetched: true,
                        conFromCurr: fromCur,
                        conToCurr: toCur,
                        history: {
                            from: fromCur,
                            fVal: fromVal,
                            to: toCur,
                            tVal: result.toFixed(2),
                            id: Date.now()
                        }
                    }
                })
            })
            .catch((err) => {
                dispatch({type: "GET_CONVERSION_REJECTED", payload: err})
            })
        }
}

export function changeToVal(val) {
    return {
        type: "CHANGE_TO",
        payload: val
    }
}

export function changeInput(val) {
    return {
        type: "CHANGE_INPUT",
        payload: val
    }
}

export function deleteConversion(id) {
    return {
        type: "DELETE_CONVERSION",
        payload: id
    }
}

export function swapCurValues(from, to) {
    return function(dispatch) {
        axios.get("http://api.fixer.io/latest?base=" + to)
            .then((data) => {
                dispatch({
                    type: "SWAP_CURRENCIES", payload: {
                        rates: data,
                        from: to,
                        to: from
                    }
                })
            })
            .catch((err) => {
                dispatch({type: "SWAP_CURRENCIES_REJECTED", payload: err})
            })
    }
}
