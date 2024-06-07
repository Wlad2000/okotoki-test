/****************************************************************************
** GlobalStates
**
**
**
****************************************************************************/

import React, { createContext, useContext, useState } from "react";

const Context = createContext();

/* Create global states */
const GlobalStates = ({ children }) => {
    const [items, setItems] = useState([]);
    const [favorites, setFavorites] = useState([]);

    return (
        <Context.Provider
            value={{
                items, setItems,
                favorites, setFavorites
            }}
        >
            {children}
        </Context.Provider >
    );
};

const useGlobalState = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useGlobalState must be used within a GlobalStates");
    }
    return context;
};

export { GlobalStates, useGlobalState };
