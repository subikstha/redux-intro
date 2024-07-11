import {combineReducers, createStore} from 'redux'

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: ''
}

const initialStateCustomer = {
    fullName: '',
    nationalID: '',
    createdAt: ''
}

// Account reducer
function accountReducer(state = initialStateAccount, action) {
    switch(action.type){
        case "account/deposit":
            return {...state, balance: state.balance + action.payload}
        case "account/withdraw":
            return {...state, balance: state.balance - action.payload}
        case "account/requestLoan":
            if(state.loan > 0) return state
            // LATER
            return {...state, loan: action.payload}
        case "account/payloan":
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan
            }
        default:
            return state
    }
}

// Customer reducer
function customerReducer(state = initialStateCustomer, action){
    switch(action.type){
        case "customer/createCustomer":
            return {...state, fullName: action.payload.fullName, nationalID: action.payload.nationalID, createdAt: action.payLoad.createdAt}
        case "customer/updateCustomer":
            return {...state, fullName: action.payload}
        default:
            return state
    }
}

// Combining the two reducers into one rootReducer

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
})

const store = createStore(rootReducer)

// store.dispatch({type: 'account/deposit', payload: 600})
// console.log(store.getState())

// Action creators
function deposit(amount){
    return {type: 'account/deposit', payload: amount}
}

function withdraw(amount){
    return {type: 'account/withdraw', payload: amount}
}

function requestLoan(amount, purpose){
    return {
        type: 'account/requestLoan',
        payload: {amount, purpose}
    }
}

function payLoan(){
    return {type: 'account/payLoan'}
}

console.log('state before deposit', store.getState())
store.dispatch(deposit(600))
console.log('state after deposit', store.getState())
store.dispatch(withdraw(200))
console.log('state after withdraw', store.getState())
store.dispatch(requestLoan(1000, 'Buy a cheap car'))
console.log('state after requesting loan', store.getState())
store.dispatch(payLoan())
console.log('state after paying back loan', store.getState())

function createCustomer(fullName, nationalID){
    return {type: 'customer/createCustomer', payload: {fullName, nationalID, createdAt: new Date().toISOString()}}
}

function updateName(fullName){
    return {type: 'customer/updateName', payload: fullName }
}