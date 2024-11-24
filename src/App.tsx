import './App.css'
import { createContext, useState } from "react";
import Navbar from './components/Navbar'
import Input from './components/Input'
import Button from './components/Button'
import EditableTable from './components/EditableTable';
import { AppState, AppStateContextType } from './models/interfaces';

// Initialize the context with null to allow type checking
export const AppStateContext = createContext<AppStateContextType | null>(null);


function App() {
  const [appState, setAppState] = useState<AppState>({items: [], activityName: "", isFocused: false});

  return (
    <AppStateContext.Provider value={{appState, setAppState}}>
      <Navbar />
      <div className="grid grid-cols-3 pt-10">
        <div className="text-base md:text-2xl mx-auto font-thin">Add Activity</div>
        <Input />
        <Button />
      </div>
      <div className="pt-4 mx-auto">
      {appState.items.length ? <EditableTable /> : <div className="text-center font-thin font-bold text-2xl">No activity to display</div>}
      </div>
    </AppStateContext.Provider>
  )
}

export default App
