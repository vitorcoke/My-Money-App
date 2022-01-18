import React, { useState } from "react";

interface ContextType  {
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>
    openSucesso: boolean,
    setOpenSucesso: React.Dispatch<React.SetStateAction<boolean>>,
    handleChange: (event: React.ChangeEvent<{}>, newValue: number) => void,
    editValues: IEditValues | null,
    setEditValues: React.Dispatch<React.SetStateAction<IEditValues | null>>,
    credits: ICredtisValues[],
    setCredits: React.Dispatch<React.SetStateAction<ICredtisValues[]>>
    debts: IDebts[],
    setDebts: React.Dispatch<React.SetStateAction<IDebts[]>>
}

interface IEditValues {
    id: any,
    name: string;
    month: number;
    year: number;
    credits: [
        {
            name: string,
            value: number,
            _id: string
        }
    ],
    debts: [
        {
            name: string,
            value: number,
            status: string,
            _id: string
        },
    ]
}

interface ICredtisValues {
    name: string;
    value: number;
    _id?: string;
}
type IDebts = {
    name: string,
    value: number,
    _id?: string
}

const ContextProps = React.createContext<ContextType>({} as ContextType)

export const ContextProvider: React.FC = ({ children }) => {

    const [value, setValue] = useState(0);
    const [openSucesso, setOpenSucesso] = useState(false);
    const [editValues, setEditValues] = useState<IEditValues | null>(null);
    const [credits, setCredits] = useState<ICredtisValues[]>([])
    const [debts, setDebts] = useState<IDebts[]>([])
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    }
   
    return (
        <ContextProps.Provider value={{
            value,
            setValue,
            openSucesso,
            setOpenSucesso,
            handleChange,
            editValues,
            setEditValues,
            credits,
            setCredits,
            debts,
            setDebts
        
        }}>
            {children}
        </ContextProps.Provider>
    )
}

export default ContextProps