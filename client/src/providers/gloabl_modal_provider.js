import GlobalModal from "@components/global_modal";
import { createContext, useState } from "react";

export const GlobalModalContext = createContext();

const GlobalModalProvider = ({ children }) => {
  const [open, setOpen] = useState({component: null, show: false, title: undefined});

  const modal = (component = null) => {
    if(component === null) return
    return <GlobalModal open={open} setOpen={setOpen}>
      {component}
    </GlobalModal>
  }

  return (
    <GlobalModalContext.Provider value={{open, setOpen}}>
      {children}
      {open.show ? modal(open.component) : null}
    </GlobalModalContext.Provider>
  );
};

export default GlobalModalProvider;
