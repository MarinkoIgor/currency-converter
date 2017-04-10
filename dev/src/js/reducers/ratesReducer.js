export default function reducer(state={
    from: "EUR",
    to: "USD",
    rates: {
        EUR: 1,
        GBP: 1.06
    },
    fetching: false,
    fetched: false,
    error: null,
    numInput: 1,
    conNumInput: 1,
    conFetched: false,
    result: 0.6,
    conFromCurr: "",
    conToCurr: "",
    history: []
  }, action) {
    switch (action.type) {
        case "GET_RATES_PENDING": {
            return {...state, fetching: true}
        }
        case "GET_RATES_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "GET_RATES_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                rates: action.payload,
                from: action.payload.data.base,
                error: null,
           }
        }
        case "GET_CONVERSION_FULFILLED": {
            return {
                ...state,
                result: action.payload.conversionResult,
                conNumInput: action.payload.fVal,
                numInput: action.payload.fVal,
                conFetched: action.payload.conFetched,
                conFromCurr: action.payload.conFromCurr,
                conToCurr: action.payload.conToCurr,
                history: [...state.history, action.payload.history]
           }
        }
        case "CHANGE_TO": {
            return {
                ...state,
                to: action.payload,
           }
        }
        case "CHANGE_INPUT": {
            return {
                ...state,
                numInput: action.payload,
           }
        }
        case "DELETE_CONVERSION": {
            return {
                ...state,
                history: state.history.filter(
                    conversion => conversion.id != action.payload
                )
           }
        }
        case "SWAP_CURRENCIES": {
            return {
                ...state,
                rates: action.payload.rates,
                from: action.payload.from,
                to: action.payload.to
           }
        }
    }
    return state
}
