import { useState, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import Big from "big.js";
import { AppStateContext } from "../App";
import { NameAmountField } from "../models/interfaces";

const AccountPanel = ({isOpen, activityId, activityName}: {isOpen: boolean, activityId: string, activityName: string}) => {
  const context = useContext(AppStateContext);

  if (!context) {
      throw new Error('useContext must be used within an AppStateProvider');
  }

  const { appState, setAppState } = context;
  const [inputPairs, setInputPairs] = useState([{
    id: uuidv4(), 
    name: {id: uuidv4(), text: "", isFocused: false},
    amount: {id: uuidv4(), text: "", isFocused: false}
  }]);

  const addInputPair = () => {
    setInputPairs((prev) => [
      ...prev,
      {
        id: uuidv4(), 
        name: {id: uuidv4(), text: "", isFocused: false},
        amount: {id: uuidv4(), text: "", isFocused: false}
      },
    ]);
  };

  const handleChange = (id: string, field1: "name" | "amount", field2: keyof NameAmountField, value: boolean | string) => {
    setInputPairs((prev) =>
      prev.map((pair) =>
        pair.id === id ? { ...pair, [field1]: {...pair[field1], [field2]: value}} : pair
      )
    );
  };

  const handlePairDelete = (id: string) => {
    setInputPairs(inputPairs.filter((item) =>
      item.id !== id
    )
    )};

  const submitBalance = () => {
    if(!inputPairs.length) {
      setAppState({
        ...appState,
        items: appState.items.map((item) =>
          item.id === activityId ? { 
            ...item, 
            openPanel: false,
            totalPeople: 0,
            eachPay: "0",
            totalAmount: "0" 
          } : item
        ),
      });
      return
    }
    let totalPeople = inputPairs.length;
    let totalAmtActivity = new Big(0);
    for(let inputPair of inputPairs) {
      let activityAmt = inputPair.amount.text ? inputPair.amount.text : 0
      let amt = new Big(activityAmt);
      totalAmtActivity = totalAmtActivity.plus(amt);
    }
    let eachPay = new Big(0);
    eachPay = totalAmtActivity.div(totalPeople);
    setAppState({
      ...appState,
      items: appState.items.map((item) =>
        item.id === activityId ? { 
          ...item, 
          openPanel: false,
          totalPeople: totalPeople,
          eachPay: eachPay.toFixed(2).toString(),
          totalAmount: totalAmtActivity.toString() 
        } : item
      ),
    });
  };

  return (
    <>
    {/* Backdrop */}
    {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
        ></div>
      )}
    <div className="flex flex-col items-center z-50 font-light font-bold relative">
      {/* Panel */}
      <div
        className={`fixed top-0 right-0 w-full lg:w-6/12 h-full p-2 bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <h2 className="text-2xl text-gray-500 mb-4">{activityName}</h2>
          {/* Input Pairs */}
          {inputPairs.map((pair) => (
            <div key={pair.id} className="flex space-x-4 mb-4">
              <div className="relative w-full mx-auto">
                <input
                    type="text"
                    key={pair.name.id}
                    value={pair.name.text}
                    className="w-full border-b-2 border-gray-400 py-2 px-2 outline-none focus:border-indigo-500"
                    onFocus={() => handleChange(pair.id, "name", "isFocused", true)}
                    onBlur={(e) => handleChange(pair.id, "name", "isFocused", e.target.value !== "")}
                    onChange={(e) => handleChange(pair.id, "name", "text", e.target.value)}
                />
                <label
                    className={`absolute left-2 top-2 font-light font-bold text-gray-500 pointer-events-none transition-all duration-300 transform ${
                      pair.name.isFocused ? "text-xs -translate-y-4 scale-75" : "text-xs"
                    }`}
                >
                    Name
                </label>
            </div>
            <div className="relative mx-auto">
                <input
                    type="text"
                    key={pair.amount.id}
                    value={pair.amount.text}
                    className="w-full border-b-2 border-gray-400 py-2 px-2 outline-none focus:border-indigo-500"
                    onFocus={() => handleChange(pair.id, "amount", "isFocused", true)}
                    onBlur={(e) => handleChange(pair.id, "amount", "isFocused", e.target.value !== "")}
                    onChange={(e) => handleChange(pair.id, "amount", "text", e.target.value)}
                />
                <label
                    className={`absolute left-2 top-2 font-light font-bold text-gray-500 pointer-events-none transition-all duration-300 transform ${
                      pair.amount.isFocused ? "text-xs -translate-y-4 scale-75" : "text-xs"
                    }`}
                >
                    Amount
                </label>
            </div>
              <button className="text-red-500 items-center hover:text-red-700 text-xs"
              onClick={() => handlePairDelete(pair.id)}>Delete</button>
            </div>
          ))}

          {/* Add Input Pair Button */}
          <button
            onClick={addInputPair}
            className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-700"
          >
            +
          </button>

          {/* Bottom Button */}
          <div className="mt-6">
            <button className="bg-indigo-500 text-white w-full py-2 rounded hover:bg-indigo-700"
            onClick={() => submitBalance()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AccountPanel;