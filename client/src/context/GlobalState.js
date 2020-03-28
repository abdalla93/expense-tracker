import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
const initialState = {
  transactions: [],
  error: null,
  loading: true
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getTransactions() {
    try {
      const res = await axios.get("/api/v1/transactions");

      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error
      });
    }
  }
  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error
      });
    }

    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id
    });
  }
  async function addTransaction(transaction) {
    const config = {
      headers: {
        "Conetent-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/v1/transactions", transaction, config);

      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error
      });
    }
  }
  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
