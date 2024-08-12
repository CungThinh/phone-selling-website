import { Table } from "antd";
import React, { useMemo, useState } from "react";
import Loading from "../Loading/Loading";

const TableComponent = (props) => {
  const {
    selectionType = "checkbox",
    data: dataSource = [],
    isLoading = false,
    columns = [],
    handleDeleteMany,
  } = props;
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

  const newColumnExport = useMemo(() => {
    const arr = columns?.filter((col) => col.dataIndex !== "action");
    return arr;
  }, [columns]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys);
    },
  };
  const handleDeleteAll = () => {
    handleDeleteMany(rowSelectedKeys);
  };

  return (
    <Loading isLoading={isLoading}>
      {rowSelectedKeys.length > 0 && (
        <div
          style={{
            background: "red",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "10px",
            width: "11%",
            marginBottom: "30px",
          }}
          onClick={handleDeleteAll}
        >
          Delete selected
        </div>
      )}
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        {...props}
      />
    </Loading>
  );
};

export default TableComponent;
