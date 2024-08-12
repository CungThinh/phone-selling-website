import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Space, Input } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderService";
import { formatPrice } from "../../utils";
import { useSelector } from "react-redux";

const OrderManager = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const user = useSelector((state) => state?.user);

  const getAllOrders = async () => {
    const res = await OrderService.getAllOrder();
    return res;
  };

  const queryOrder = useQuery({ queryKey: ["orders"], queryFn: getAllOrders });
  const { isLoading: isLoadingOrders, data: orders } = queryOrder;

  console.log(orders);

  const handleSearch = () => {
    setSearchedColumn("userName");
  };

  const handleReset = () => {
    setSearchText("");
    setSearchedColumn("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      const recordValue = record[dataIndex];
      return recordValue
        ? recordValue.toString().toLowerCase().includes(value.toLowerCase())
        : false;
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        console.log(`Dropdown open for ${dataIndex}`);
      }
    },
  });

  const columns = [
    {
      title: "User name",
      dataIndex: "userName",
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps("userName"),
      filteredValue: searchedColumn === "userName" ? [searchText] : null,
      onFilter: (value, record) => {
return record.userName
          ? record.userName.toString().toLowerCase().includes(value.toLowerCase())
          : "";
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Paided",
      dataIndex: "isPaid",
      sorter: (a, b) => a.isPaid.length - b.isPaid.length,
      ...getColumnSearchProps("isPaid"),
    },
    {
      title: "Shipped",
      dataIndex: "isDelivered",
      sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
      ...getColumnSearchProps("isDelivered"),
    },
    {
      title: "Total price",
      dataIndex: "totalPrice",
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      ...getColumnSearchProps("totalPrice"),
    },
  ];

  const dataTable = orders?.map((order) => ({
    key: order.id,
    userName: order.shipping_address.full_name || "",
    phone: order.shipping_address.phone || "",
    address: order.shipping_address.address || "",
    isPaid: order.isPaid ? "TRUE" : "FALSE",
    isDelivered: order.isDelivered ? "TRUE" : "FALSE",
    totalPrice: formatPrice(order.total_price) || "",
  })) || [];

  console.log('DataTable:', dataTable);

  return (
    <div>
      <h3>Order Management</h3>
      <div style={{ marginTop: "20px" }}>
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Search User Name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <Button
            type="primary"
            onClick={handleSearch}
            icon={<SearchOutlined />}
          >
            Search
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </Space>
        <TableComponent
          columns={columns}
          isLoading={isLoadingOrders}
          data={dataTable}
        />
      </div>
    </div>
  );
};

export default OrderManager;