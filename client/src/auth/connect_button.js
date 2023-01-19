import { useSignIn, useSession } from "@auth/hooks";
import { Button } from "antd";

function ConnectButton({disabled}) {
  const signIn = useSignIn(window.ethereum);
  const { isConnected, disconnect, isConnecting } = useSession();

  return isConnected ? (
    <Button
      type="secondary"
      onClick={disconnect}>
      Disconnect
    </Button>
  ) : (
    <Button
      type="secondary"
      disabled={isConnecting || disabled}
      onClick={async () => {
        try {
          await signIn()
        } catch (e) {
          console.log(e)
        }
      }}
      loading={isConnecting}>
      Connect to Metamask
    </Button>
  )
}

export default ConnectButton;
