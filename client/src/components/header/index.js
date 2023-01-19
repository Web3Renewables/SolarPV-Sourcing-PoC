import { useCallback, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Layout, Menu, Badge, Avatar } from "antd";
import { useSession } from "@auth/hooks";
import CopyableDid from "./copyable_did";
import { usePublishableClaims } from "@utils/hooks";
import VCNotification from "./vc_notification";
import VCModal from "./publish_vc_modal";
import { BellOutlined } from "@ant-design/icons";

const StyledHeader = styled(Layout.Header)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledMenu = styled(Menu)`
  width: 30%;
  justify-content: flex-end;
`;

const Logo = styled.div`
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: red;
`;

const DashboardLink = (
  <Link href="/">
    <a>Dashboard</a>
  </Link>
);

const FormLink = (
  <Link href="/form">
    <a>Form</a>
  </Link>
);

const NotificationLabel = (counter) => (
  <Badge count={counter} size='small'>
    <Avatar style={{backgroundColor: 'transparent'}}>
      <BellOutlined />
    </Avatar>
  </Badge>
);

function Header({ selected }) {
  const { user, logout } = useSession();
  const [current, setCurrent] = useState(selected);
  const did = user?.did || "did";

  const [publishableClaims, modal, setModal] = usePublishableClaims(did)

  const LogoutLink = useCallback(
    () => <p onClick={logout}>Logout</p>,
    [logout]);

  const CopyDid = useCallback(
    () => <CopyableDid did={did} />,
    [did]);

  const onClick = (e) => {
    // Checks if the tab clicked is the notification or the VC
    if (e.key.includes("vc") && e.key !== "vc_notification") {
      // If publish VC, show the modal
      const key = e.key.substring(3)
      setModal({visibile: true, claim: publishableClaims.find((el) => el.id === key)})
      return;
    }

    // Checks to make sure not to select non-pages in dashboard highlighting
    switch (e.key) {
      case "vc_notification":
        break;
      default:
        setCurrent(e.key);
    }
  };

  const items = [
    {
      label: NotificationLabel(publishableClaims.length),
      key: "vc_notification",
      children: publishableClaims.map((claim) => ({ label: <VCNotification claim={claim} />, key: `vc_${claim.id}` }))
    },
    {
      label: DashboardLink,
      key: "dashboard",
    },
    {
      label: "Profile",
      key: "profile",
      children: [
        {
          label: <CopyDid />,
          key: "did",
        },
        {
          label: <LogoutLink />,
          key: "logout",
        },
      ],
    },
  ];

  return (
    <Layout>
      <StyledHeader>
        <Logo />
        <StyledMenu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          theme="dark"
          items={items}
        />
      </StyledHeader>
      <VCModal modal={modal} setModal={setModal} did={did} />
    </Layout>
  );
}

export default Header;
