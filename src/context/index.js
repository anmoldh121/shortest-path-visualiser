import React from 'react';

const initialState = {
    data: [],
    start: {},
    end: {},
    gridResetFlag: false,
};

const store = React.createContext(initialState);

const StateProvider = ({children}) => {
    const [state, dispatch] = React.useReducer((state, action) => {
        switch (action.type) {
            case "SETDATA":
                return {...state, data: action.payload};
            case "GETDATA":
                return {...state};
            case "SETSTART":
                return {...state, start: action.payload};
            case "SETEND":
                return {...state, end: action.payload};
            case "RESET_GRID":
                return {...state, gridResetFlag: action.payload};
            default:
                return {...state};
        }
    }, initialState);

    return <store.Provider value={{state, dispatch}}>{children}</store.Provider>
};

export {store, StateProvider}
