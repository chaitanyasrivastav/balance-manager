import { useContext } from "react";
import { AppStateContext } from "../App";

const Input = ({type = "text"}: {type?: string}) => {
    const context = useContext(AppStateContext);

    if (!context) {
        throw new Error('useContext must be used within an AppStateProvider');
    }

    const { appState, setAppState } = context;

    const setIsFocused = (focus: boolean) => {
        setAppState({...appState, isFocused: focus})
    }

    return (
        <>
            <div className="relative w-full mx-auto font-light font-bold">
            <input
                type={type}
                value={appState.activityName}
                className="w-full border-b-2 border-gray-400 py-2 px-2 outline-none focus:border-indigo-500 bg-gray-100"
                onFocus={() => setIsFocused(true)}
                onBlur={(e) => setIsFocused(e.target.value !== "")}
                onChange={(e) => setAppState({...appState, activityName: e.target.value})}
            />
            <label
                className={`absolute left-2 top-2 font-light font-bold text-gray-500 pointer-events-none transition-all duration-300 transform ${
                    appState.isFocused ? "text-xs -translate-y-4 scale-75" : "text-xs"
                }`}
            >
                Activity Name
            </label>
            </div>
        </>
    )
}

export default Input;