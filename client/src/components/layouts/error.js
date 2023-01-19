import { Result, Button } from "antd"
import { useRouter } from "next/router"

const ErrorView = () => {

  const router = useRouter()

  return (
    <Result
      status="500"
      title="Could not load Project"
      subTitle="Sorry, something went wrong. Please try refreshing or go back to the dashboard."
      extra={<Button type="primary" onClick={() => router.push("/")}>Back Home</Button>}
    />
  )

}

export default ErrorView