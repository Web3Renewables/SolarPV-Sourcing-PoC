import { Result, Button } from "antd"
import { useRouter } from "next/router";

const Warning = ({ message, goToMessage, goTo }) => {

  const router = useRouter()

  return (
    <Result
      title={message}
      extra={
        <Button type="primary" key="dashboard" onClick={() => router.push(goTo)}>
          {goToMessage}
        </Button>
      }
    />
  )
}

export default Warning;