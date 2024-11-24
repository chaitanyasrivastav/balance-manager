import { useContext } from "react";
import {AddActivityFn} from '../types/types';
import { AppStateContext } from "../App";
import { v4 as uuidv4 } from 'uuid';

const Button = () => {
  const context = useContext(AppStateContext);

  if (!context) {
      throw new Error('useContext must be used within an AppStateProvider');
  }

  const { appState, setAppState } = context;
    
  const addActivity: AddActivityFn = () => {
      if(appState.activityName) {
        const generateId = uuidv4();
        setAppState({
            ...appState, 
            items: [
                ...appState.items, 
                {
                    "id": generateId, 
                    "text": appState.activityName,
                    "openPanel": false,
                    "totalPeople": 0,
                    "eachPay": "0",
                    "totalAmount": "0"
                }
              ],
            activityName: "",
            isFocused: false
          })
      }
    }

  return (
      <button
      className="bg-indigo-500 font-light font-bold text-white mx-8 rounded-lg hover:bg-indigo-700 max-w-40"
      onClick={() => addActivity()}
      >
          Add
      </button>
  )
}

export default Button;