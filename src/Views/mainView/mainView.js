import React, { useState, useEffect, useContext } from "react";

import AmountSlider from "../../components/amountSlider/amountSlider";
import MonthInput from "../../components/monthInput/monthInput";
import GetButton from "../../components/getButton/getButton";

import callAPI, {
  getLocalStorage,
  setLocalStorage
} from "../../utils/apiModule";
import { AppContext } from "../appLayout";

const initialState = {
  // params: {
  //   amount: 500,
  //   numMonths: 6
  // },
  buttonState: {
    loading: false,
    disabled: true
  },
  responseData: {},
  error: null
};

const MainView = () => {
  const { reducerState, dispatch } = useContext(AppContext);
  const [state, setState] = useState(initialState);

  const onAmountChangeHandler = value => {
    dispatch({ type: "UPDATE_FIELD", data: { amount: value } });
  };
  const onMonthChangeHandler = value => {
    dispatch({ type: "UPDATE_FIELD", data: { numMonths: value } });
  };

  useEffect(() => {
    if (validateParams()) {
      setState({
        ...state,
        buttonState: { ...state.buttonState, disabled: false },
        responseData: {}
      });
    } else {
      setState({
        ...state,
        buttonState: { ...state.buttonState, disabled: true },
        responseData: {}
      });
    }
  }, [reducerState.params]);

  const validateParams = () => {
    const { amount, numMonths } = reducerState.params;
    if (amount >= 500 && amount <= 5000 && numMonths >= 6 && numMonths <= 24) {
      return true;
    }
    return false;
  };
  const getData = async () => {
    setState({
      ...state,
      buttonState: {
        ...state.buttonState,
        loading: true
      },
      error: null
    });

    await callAPI
      .get({ ...reducerState.params })
      .then(res => {
        setState({
          ...state,
          buttonState: {
            ...state.buttonState,
            loading: false
          },
          responseData: {
            ...state.responseData,
            ...res.data
          }
        });
        dispatch({ type: "ADD_DATA", data: [{ ...res.data }] });
        const localData = getLocalStorage("data");
        let updateData = localData
          ? [...JSON.parse(localData), { ...res.data }]
          : [{ ...res.data }];
        setLocalStorage("data", JSON.stringify(updateData));
      })
      .catch(err => {
        setState({
          ...state,
          buttonState: {
            ...state.buttonState,
            loading: false
          },
          error: "Something went wrong!!"
        });
      });
  };
  return (
    <div>
      <AmountSlider
        min={500}
        max={5000}
        value={reducerState.params.amount}
        onChange={onAmountChangeHandler}
      />
      <MonthInput
        min={6}
        max={24}
        value={reducerState.params.numMonths}
        onChange={onMonthChangeHandler}
      />

      <GetButton onClick={getData} {...state.buttonState} />
      {state.error ? <p style={{ color: "red" }}>{state.error}</p> : null}
      {Object.keys(state.responseData).length ? (
        <div style={{ marginTop: "30px" }}>
          <p>{`Interest Rate: ${
            state.responseData.interestRate
              ? (state.responseData.interestRate * 10).toFixed(1)
              : 0
          }%`}</p>
          <p>
            Monthly Payment:{" "}
            {state.responseData.monthlyPayment &&
            state.responseData.monthlyPayment.amount
              ? state.responseData.monthlyPayment.amount
              : 0}{" "}
            {state.responseData.monthlyPayment &&
            state.responseData.monthlyPayment.currency
              ? state.responseData.monthlyPayment.currency
              : "USD"}
          </p>
          {/* ) : null} */}
          <p>Number of Payments: {state.responseData.numPayments || 0} </p>
        </div>
      ) : null}
    </div>
  );
};

export default MainView;
