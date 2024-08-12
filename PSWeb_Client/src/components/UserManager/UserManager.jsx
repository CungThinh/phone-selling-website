import React, { useEffect, useRef, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Form, Space, Upload } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useQuery } from "@tanstack/react-query";
import * as UserService from "../../services/UserService";
import * as message from "../Message/Message";
import { getBase64 } from "../../utils";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";

const UserManager = () => {
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const user = useSelector((state) => state?.user);
  const searchInput = useRef(null);
  const fileInputRef = useRef(null);

  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
    address: "",
    city: "",
  });

  const [form] = Form.useForm();

  const mutationUpdate = useMutationHooks((data) => {
    const { id, ...rests } = data;
    console.log(rests);
    const res = UserService.updateUser(id, { ...rests });
    return res;
  });

  const mutationDelete = useMutationHooks((data) => {
    const { id } = data;
    const res = UserService.deleteUser(id);
    return res;
  });

  const mutationDeleteMany = useMutationHooks((data) => {
    const { ...ids } = data;
    const res = UserService.deleteManyUser(ids);
    return res;
  });

  const handleDeleteManyUser = (ids) => {
    mutationDeleteMany.mutate(
      { ids: ids },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  const getAllUsers = async () => {
    const res = await UserService.getAllUser();
    return res;
  };

  const fetchGetDetailsUser = async (id) => {
    setIsLoadingUpdate(true);
    try {
      const res = await UserService.getDetailsUser(id);
      if (res?.data) {
        setStateUserDetails({
          name: res?.data.name,
          email: res?.data.email,
          phone: res?.data.phone,
          address: res?.data.address,
          avatar: res?.data.avatar,
          city: res?.data.city,
        });
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      fetchGetDetailsUser(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  const handleDetailsUser = () => {
    setIsOpenDrawer(true);
  };

  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;

  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDelete;

  const {
    data: dataDeletedMany,
    isLoading: isLoadingDeletedMany,
    isSuccess: isSuccessDeletedMany,
    isError: isErrorDeletedMany,
  } = mutationDeleteMany;

  const queryUser = useQuery({ queryKey: ["users"], queryFn: getAllUsers });
  const { isLoading: isLoadingUsers, data: users } = queryUser;

  useEffect(() => {
    if (rowSelected !== null && users) {
      const userData = users.find((user) => user.id === rowSelected);
      if (userData) {
        setStateUserDetails({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
          avatar: userData.avatar,
          city: userData.city,
        });
        setIsOpenDrawer(true);
      }
    }
  }, [rowSelected, users]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success();
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success();
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error();
    }
  }, [isSuccessDeleted]);

  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === "OK") {
      message.success();
    } else if (isErrorDeletedMany) {
      message.error();
    }
  }, [isSuccessDeletedMany]);

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      avatar: "",
      address: "",
      city: "",
    });
    form.resetFields();
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteUser = () => {
    mutationDelete.mutate(
      { id: rowSelected },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetails({
      ...stateUserDetails,
      avatar: file.preview,
    });
  };

  const onUpdateUser = () => {
    const userDetailsToUpdate = { ...stateUserDetails };
    delete userDetailsToUpdate.email; // Giữ lại nếu không cần cập nhật email
    mutationUpdate.mutate(
      { id: rowSelected, ...userDetailsToUpdate },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
        <EditOutlined
          style={{ color: "blue", fontSize: "20px", cursor: "pointer" }}
          onClick={handleDetailsUser}
        />
      </div>
    );
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
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
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
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
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps("email"),
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
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const dataTable = Array.isArray(users) && users.length > 0
    ? users.map((user) => ({
      key: user.id,
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      address: user.address || "",
    }))
    : [];

  return (
    <div>
      <h3>User Management</h3>
      <div style={{ marginTop: "30px" }}>
        <TableComponent
          handleDeleteMany={handleDeleteManyUser}
          columns={columns}
          isLoading={isLoadingUsers}
          data={dataTable}
          onRow={(record) => {
            return {
              onClick: () => {
                setRowSelected(record.id);
              },
            };
          }}
        />
        <DrawerComponent
          title="User account details"
          isOpen={isOpenDrawer}
          onClose={handleCloseDrawer}
          width="50%"
        >
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600 }}
            onFinish={onUpdateUser}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="NAME"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <InputComponent
                value={stateUserDetails.name}
                onChange={handleOnChangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="EMAIL"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <InputComponent
                value={stateUserDetails.email}
                onChange={handleOnChangeDetails}
                name="email"
              />
            </Form.Item>

            <Form.Item
              label="PHONE"
              name="phone"
              rules={[{ required: true, message: "Please input your phone!" }]}
            >
              <InputComponent
                value={stateUserDetails.phone}
                onChange={handleOnChangeDetails}
                name="phone"
              />
            </Form.Item>

            <Form.Item
              label="ADDRESS"
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <InputComponent
                value={stateUserDetails.address}
                onChange={handleOnChangeDetails}
                name="address"
              />
            </Form.Item>

            <Form.Item
              label="CITY"
              name="city"
              rules={[
                { required: true, message: "Please input your city!" },
              ]}
            >
              <InputComponent
                value={stateUserDetails.city}
                onChange={handleOnChangeDetails}
                name="city"
              />
            </Form.Item>

            <Form.Item
              label="AVATAR"
              name="avatar"
              rules={[{ required: true, message: "Please input your avatar!" }]}
            >
              <Upload
                fileList={[]} // Sử dụng `fileList` thay vì `value`
                onChange={handleOnChangeAvatarDetails}
                maxCount={1}
              >
                <Button
                  style={{
                    marginLeft: "170px",
                    marginBottom: "10px",
                    display: "flex",
                  }}
                >
                  Select Avatar
                </Button>
                {stateUserDetails?.avatar && (
                  <img
                    src={stateUserDetails?.avatar}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "185px",
                      marginTop: "10px",
                    }}
                    alt="avatar"
                  />
                )}
              </Upload>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 13, span: 16 }}>
              <Button
                style={{ margin: "5px" }}
                type="primary"
                htmlType="submit"
              >
                Apply
              </Button>
            </Form.Item>
          </Form>
        </DrawerComponent>
        <ModalComponent
          forceRender
          title="Delete Account"
          open={isModalOpenDelete}
          onCancel={handleCancelDelete}
          onOk={handleDeleteUser}
        >
          <div>Are You Sure to Delete This Account?</div>
        </ModalComponent>
      </div>
    </div>
  );
};

export default UserManager;