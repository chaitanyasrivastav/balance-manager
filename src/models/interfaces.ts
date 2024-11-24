export interface AppState {
    items: Row[];
    activityName: string;
    isFocused: boolean;
}
  
export interface AppStateContextType {
    appState: AppState;
    setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

export interface Row {
    id: string;
    text: string;
    totalAmount: string;
    totalPeople: number;
    eachPay: string;
    openPanel: boolean;
};

export interface NameAmountField {
    id: string;
    text: string;
    isFocused: boolean;
};
  
export interface Item {
    id: string;
    name: NameAmountField;
    amount: NameAmountField;
};