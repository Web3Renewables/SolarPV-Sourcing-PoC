import { Table, Tabs, Typography } from "antd";
import {DateTime} from 'luxon'

const GCTable = ({ isLoading = false, clicked, gcDatas, selected }) => {

  const columns = [
    {
      title: "Start Date (In System's Timezone)",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "File Name",
      dataIndex: "fileName",
      key: "fileName",
    },
  ];

  const rowSelectionDaily = {
    onChange: (selectedRowKeys, selectedRows) => {
      clicked({ type: "daily", dailyIndex: selectedRowKeys[0], monthlyIndex: selected.monthlyIndex })
    },
  };

  const rowSelectionMonthly = {
    onChange: (selectedRowKeys, selectedRows) => {
      clicked({ type: "monthly", monthlyIndex: selectedRowKeys[0], dailyIndex: selected.dailyIndex })
    },
  };

  const dataSource = (gcDatas) => {
    return gcDatas.map((gcData, index) => {
      let date;
      if(selected.type === "daily") {
        date = gcData.fileName.split("_")[0].slice(0,10)
      } else {
        const tokens = gcData.production_interval_start.split("-")
        const year = tokens[0]
        const month = tokens[1].length === 1 ? `0${tokens[1]}` : tokens[1]
        const day = tokens[2].length === 1 ? `0${tokens[2]}` : tokens[2]
        date = DateTime.fromISO(`${year}-${month}-${day}`).toUTC().toFormat("yyyy-MM-dd")
      }
      return {
        index,
        key: index,
        fileName: gcData.fileName,
        date,
      };
    });
  };

  return (
    <Tabs defaultActiveKey="1" onChange={key => clicked({ type: key, dailyIndex: selected.dailyIndex, monthlyIndex: selected.monthlyIndex })}>
    <Tabs.TabPane tab="Daily" key="daily">
      <Table style={{ padding: '0px' }}
        rowSelection={{
          type: "radio",
          ...rowSelectionDaily,
          defaultSelectedRowKeys: [0]
        }}
        scroll={{ x: 100 }}
        dataSource={dataSource(gcDatas.daily ?? [])}
        columns={columns}
        bordered
        isLoading={isLoading}
      />
    </Tabs.TabPane>
    <Tabs.TabPane tab="Monthly" key="monthly">
      <Table style={{ padding: '0px' }}
        rowSelection={{
          type: "radio",
          ...rowSelectionMonthly,
          defaultSelectedRowKeys: [0]
        }}
        scroll={{ x: 100 }}
        dataSource={dataSource(gcDatas.monthly ?? [])}
        columns={columns}
        bordered
        isLoading={isLoading}
      />
    </Tabs.TabPane>
  </Tabs>
  )
}

export default GCTable;