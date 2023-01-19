import { Modal } from "antd";

const GlobalModal = ({open, setOpen, children}) => {

  return (
    <Modal 
      title={open.title ?? ""} 
      visible={open.show}
      cancelButtonProps={{style: {display: "none"}}}
      onOk={() => setOpen({show: false, component: null})}
      onCancel={() => setOpen({show: false, component: null})}>
      {children}
    </Modal>
  )
}

export default GlobalModal;