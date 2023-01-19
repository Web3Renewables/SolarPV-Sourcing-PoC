import Link from "next/link";
import { Table } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Namespace",
    dataIndex: "namespace",
    key: "namespace",
  },
  {
    title: "",
    dataIndex: "",
    key: "x",
    render: (record) => (
      <Link href={record.href}>
        <a>View</a>
      </Link>
    ),
  },
];

const dataSource = (projects) => {
  return projects.map((project) => {
    const { id, name, namehash, namespace, owner } = project;
    return {
      id,
      key: id,
      name,
      namehash,
      namespace,
      owner,
      href: `/projects/${id}`,
    };
  });
};

const ProjectsTable = ({ projects, isLoading = false }) => {
  return (
    <Table
      dataSource={dataSource(projects)}
      columns={columns}
      bordered
      title={() => <h1>View All Projects</h1>}
      loading={isLoading}
    />
  );
};

export default ProjectsTable;
