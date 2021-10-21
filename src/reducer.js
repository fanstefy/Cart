
const reducer = (state, action) => {

    if (action.type === 'CLEAR_CART') {
        return {...state, cart: []};
    }
    if (action.type === 'REMOVE') {
        return {...state, cart: state.cart.filter((cartItem) => cartItem.id !== action.id)};
    }
    if (action.type === 'INCREASE') {
        return {
            ...state,
            cart: state.cart.map((item) => {
                if (item.id === action.id) {
                    return {...item, amount: item.amount + 1}
                }
                return item;
            })
        }
    }
    if (action.type === 'DECREASE') {
        return {
            ...state,
            cart: state.cart.map((item) => {
                if (item.id === action.id) {
                    return {...item, amount: item.amount - 1}
                }
                return item;
            }).filter((item) => item.amount < 0 ? {...item, amount: item.amount = 0} : item)
        }
    }
    if (action.type === 'TOTAL') {
// first parameter in reduce() function could be anything - number, array or object(but need to be single value)
        let {total, amount} = state.cart.reduce((total, currentItem) => {
            const {price, amount} = currentItem;
            const itemTotal = price * amount;
        
            total.total += itemTotal;
            total.amount += amount;
            return total;
        }, {
            total: 0,
            amount: 0
        })

        total = parseFloat(total.toFixed(2));
        return {...state, total, amount}
    }
    

    return state;
}

export default reducer;