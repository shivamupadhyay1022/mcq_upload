import { createContext, useState } from "react";

export const QContext = createContext(null)

export const QuestionProvider = (props) => {
    const [QuestItem,setquestitem] = useState("Quest");
    const [QList, setQList] = useState(["qlist"]);
    return (
        <QContext.Provider value={{QuestItem,setquestitem,QList,setQList}}>
            {props.children}
        </QContext.Provider>
    )
}