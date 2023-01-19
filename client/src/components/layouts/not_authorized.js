import { Result, Button } from "antd";
import { useRouter } from "next/router";

const NotAuthorizedView = () => {

  const router = useRouter()

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button type="primary" onClick={() => router.push("/")}>Back Home</Button>}
    />
  )
}

export default NotAuthorizedView;

