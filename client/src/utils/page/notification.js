import { notification } from "antd";

const openNotification = (title, description, key) => {
  const args = {
    key: key,
    message: title,
    description: description,
    duration: 0,
  };

  notification.open(args);
}

export {
  openNotification
}