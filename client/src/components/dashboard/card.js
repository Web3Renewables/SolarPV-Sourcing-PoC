import Link from "next/link";
import { Card } from "antd";

function DashboardCard({ title, href = null, url, children }) {
  const ClickableCard = (

      <Card title={title} hoverable>
        <Link href={href}>
          <a>{url}</a>
        </Link>
    </Card>
  );

  if (href) {
    return ClickableCard;
  }

  return <Card title={title}>{children}</Card>;
}

export default DashboardCard;
