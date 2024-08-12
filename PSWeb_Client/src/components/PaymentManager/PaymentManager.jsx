// import React, { useEffect, useRef, useState } from "react";
// import {
//   PlusOutlined,
//   DeleteOutlined,
//   EditOutlined,
//   SearchOutlined,
// } from "@ant-design/icons";
// import { Button, Form, Space, Input, DatePicker, Select } from "antd";
// import TableComponent from "../TableComponent/TableComponent";
// import * as PaymentService from "../../services/PaymentService";
// import { useMutationHooks } from "../../hooks/useMutationHook";
// import * as message from "../../components/Message/Message";
// import { useQuery } from "@tanstack/react-query";
// import DrawerComponent from "../DrawerComponent/DrawerComponent";
// import { useSelector } from "react-redux";
// import ModalComponent from "../ModalComponent/ModalComponent";

// const PaymentManager = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [rowSelected, setRowSelected] = useState("");
//   const [isOpenDrawer, setIsOpenDrawer] = useState(false);
//   const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
//   const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
//   const user = useSelector((state) => state?.user);
//   const searchInput = useRef(null);

//   const initial = () => ({
//     id: "",
//     orderId: "",
//     total: "",
//     paymentMethod: "",
//     paymentDate: "",
//   });

//   const [statePayment, setStatePayment] = useState(initial());

//   const [statePaymentDetails, setStatePaymentDetails] = useState(initial());

//   const [form] = Form.useForm();

//   const mutation = useMutationHooks((data) => {
//     const { id, orderId, total, paymentMethod, paymentDate } = data;
//     const res = PaymentService.processPayment({
//       id,
//       orderId,
//       total,
//       paymentMethod,
//       paymentDate,
//     });
//     return res;
//   });

//   const mutationUpdate = useMutationHooks((data) => {
//     const { id, ...rests } = data;
//     const res = PaymentService.processPayment({ id, ...rests });
//     return res;
//   });

//   const mutationDelete = useMutationHooks((data) => {
//     const { id } = data;
//     const res = PaymentService.deletePayment(id);
//     return res;
//   });

//   const getAllPayments = async () => {
//     const res = await PaymentService.getPayments();
//     return res;
//   };

//   const fetchGetDetailsPayment = async (rowSelected) => {
//     const res = await PaymentService.getPaymentById(rowSelected);
//     if (res?.id) {
//       setStatePaymentDetails({
//         id: res?.id,
//         orderId: res?.orderId,
//         total: res?.total,
//         paymentMethod: res?.paymentMethod,
//         paymentDate: res?.paymentDate,
//       });
//     }
//     setIsLoadingUpdate(false);
//   };

//   useEffect(() => {
//     if (!isModalOpen) {
//       form.setFieldsValue(statePaymentDetails);
//     } else {
//       form.setFieldsValue(initial());
//     }
//   }, [form, statePaymentDetails, isModalOpen]);

//   useEffect(() => {
//     if (rowSelected && isOpenDrawer) {
//       setIsLoadingUpdate(true);
//       fetchGetDetailsPayment(rowSelected);
//     }
//   }, [rowSelected, isOpenDrawer]);

//   const handleDetailsPayment = () => {
//     setIsOpenDrawer(true);
//   };

//   const { data, isLoading, isSuccess, isError } = mutation;
//   const {
//     data: dataUpdated,
//     isLoading: isLoadingUpdated,
//     isSuccess: isSuccessUpdated,
//     isError: isErrorUpdated,
//   } = mutationUpdate;
//   const {
//     data: dataDeleted,
//     isLoading: isLoadingDeleted,
//     isSuccess: isSuccessDeleted,
//     isError: isErrorDeleted,
//   } = mutationDelete;

//   const queryPayment = useQuery({
//     queryKey: ["payments"],
//     queryFn: getAllPayments,
//   });
//   const { isLoading: isLoadingPayments, data: payments } = queryPayment;

//   const renderAction = () => (
//     <div>
//       <DeleteOutlined
//         style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
//         onClick={() => setIsModalOpenDelete(true)}
//       />
//       <EditOutlined
//         style={{ color: "blue", fontSize: "20px", cursor: "pointer" }}
//         onClick={handleDetailsPayment}
//       />
//     </div>
//   );

//   const handleSearch = (selectedKeys, confirm, dataIndex) => {
//     confirm();
//   };

//   const handleReset = (clearFilters) => {
//     clearFilters();
//   };

//   const getColumnSearchProps = (dataIndex) => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//     }) => (
//       <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
//         <Input
//           ref={searchInput}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) =>
//             setSelectedKeys(e.target.value ? [e.target.value] : [])
//           }
//           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{ marginBottom: 8, display: "block" }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => clearFilters && handleReset(clearFilters)}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Reset
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//     onFilterDropdownOpenChange: (visible) => {
//       if (visible) {
//         setTimeout(() => searchInput.current?.select(), 100);
//       }
//     },
//   });

//   const columns = [
//     {
//       title: "Order ID",
//       dataIndex: "orderId",
//       sorter: (a, b) => a.orderId.length - b.orderId.length,
//       ...getColumnSearchProps("orderId"),
//     },
//     {
//       title: "Total",
//       dataIndex: "total",
//       sorter: (a, b) => a.total - b.total,
//     },
//     {
//       title: "Payment Method",
//       dataIndex: "paymentMethod",
//     },
//     {
//       title: "Payment Date",
//       dataIndex: "paymentDate",
//       render: (paymentDate) => formatDate(paymentDate),
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       render: renderAction,
//     },
//   ];

//   const formatDate = (date) => {
//     const formattedDate = new Date(date);
//     const year = formattedDate.getFullYear();
//     const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
//     const day = String(formattedDate.getDate()).padStart(2, "0");
//     return `${day}-${month}-${year}`;
//   };

//   const dataTable =
//     payments?.length &&
//     payments?.map((payment) => ({
//       ...payment,
//       key: payment.id,
//     }));

//   useEffect(() => {
//     if (isSuccess) {
//       message.success();
//       handleCancel();
//     } else if (isError) {
//       message.error();
//     }
//   }, [isSuccess, isError]);

//   useEffect(() => {
//     if (isSuccessUpdated) {
//       message.success();
//       handleCloseDrawer();
//     } else if (isErrorUpdated) {
//       message.error();
//     }
//   }, [isSuccessUpdated, isErrorUpdated]);

//   useEffect(() => {
//     if (isSuccessDeleted) {
//       message.success();
//       handleCancelDelete();
//     } else if (isErrorDeleted) {
//       message.error();
//     }
//   }, [isSuccessDeleted, isErrorDeleted]);

//   const handleCloseDrawer = () => {
//     setIsOpenDrawer(false);
//     setStatePaymentDetails(initial());
//     form.resetFields();
//   };

//   const handleCancelDelete = () => {
//     setIsModalOpenDelete(false);
//   };

//   const handleDeletePayment = () => {
//     mutationDelete.mutate(
//       { id: rowSelected },
//       {
//         onSettled: () => {
//           queryPayment.refetch();
//         },
//       }
//     );
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setStatePayment(initial());
//     form.resetFields();
//   };

//   const onFinish = () => {
//     const params = {
//       ...statePayment,
//     };
//     mutation.mutate(params, {
//       onSettled: () => {
//         queryPayment.refetch();
//       },
//     });
//   };

//   const handleOnChange = (e) => {
//     setStatePayment({
//       ...statePayment,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleOnChangeDetails = (e) => {
//     setStatePaymentDetails({
//       ...statePaymentDetails,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const onUpdatePayment = () => {
//     mutationUpdate.mutate(
//       { id: rowSelected, ...statePaymentDetails },
//       {
//         onSettled: () => {
//           queryPayment.refetch();
//         },
//       }
//     );
//   };

//   const handleOnChangeSelect = (value) => {
//     setStatePayment({
//       ...statePayment,
//       paymentMethod: value,
//     });
//   };

//   return (
//     <div>
//       <h3>Payment Management</h3>
//       <div style={{ marginTop: "30px" }}>
//         <Button
//           style={{
//             height: "150px",
//             width: "150px",
//             borderRadius: "6px",
//             borderStyle: "dashed",
//           }}
//           onClick={() => setIsModalOpen(true)}
//         >
//           <PlusOutlined style={{ fontSize: "35px" }} />
//         </Button>
//       </div>

//       <div style={{ marginTop: "30px" }}>
//         <TableComponent
//           columns={columns}
//           isLoading={isLoadingPayments}
//           data={dataTable}
//           onRow={(record, rowIndex) => {
//             return {
//               onClick: (event) => {
//                 setRowSelected(record.id);
//               },
//             };
//           }}
//         />
//         <ModalComponent
//           forceRender
//           title="Create Payment"
//           open={isModalOpen}
//           onCancel={handleCancel}
//           footer={null}
//         >
//           <Form
//             name="basic"
//             labelCol={{ span: 6 }}
//             wrapperCol={{ span: 18 }}
//             style={{ maxWidth: 600 }}
//             onFinish={onFinish}
//             autoComplete="on"
//             form={form}
//           >
//             <Form.Item
//               label="Order ID"
//               name="orderId"
//               rules={[{ required: true, message: "Please input the order ID!" }]}
//             >
//               <Input
//                 value={statePayment.orderId}
//                 onChange={handleOnChange}
//                 name="orderId"
//               />
//             </Form.Item>

//             <Form.Item
//               label="Total"
//               name="total"
//               rules={[{ required: true, message: "Please input the total!" }]}
//             >
//               <Input
//                 value={statePayment.total}
//                 onChange={handleOnChange}
//                 name="total"
//               />
//             </Form.Item>

//             <Form.Item
//               label="Payment Method"
//               name="paymentMethod"
//               rules={[
//                 { required: true, message: "Please select a payment method!" },
//               ]}
//             >
//               <Select
//                 value={statePayment.paymentMethod}
//                 onChange={handleOnChangeSelect}
//                 options={[
//                   { value: "Credit Card", label: "Credit Card" },
//                   { value: "PayPal", label: "PayPal" },
//                   { value: "Bank Transfer", label: "Bank Transfer" },
//                 ]}
//               />
//             </Form.Item>

//             <Form.Item
//               label="Payment Date"
//               name="paymentDate"
//               rules={[{ required: true, message: "Please input the payment date!" }]}
//             >
//               <DatePicker
//                 style={{ width: "100%" }}
//                 value={statePayment.paymentDate}
//                 onChange={(date) =>
//                   setStatePayment({ ...statePayment, paymentDate: date })
//                 }
//               />
//             </Form.Item>

//             <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
//               <Button type="primary" htmlType="submit">
//                 Submit
//               </Button>
//             </Form.Item>
//           </Form>
//         </ModalComponent>

//         <DrawerComponent
//           title="Payment Details"
//           isOpen={isOpenDrawer}
//           onClose={() => setIsOpenDrawer(false)}
//           width="50%"
//         >
//           <Form
//             name="basic"
//             labelCol={{ span: 6 }}
//             wrapperCol={{ span: 18 }}
//             style={{ maxWidth: 600 }}
//             onFinish={onUpdatePayment}
//             autoComplete="off"
//             form={form}
//           >
//             <Form.Item
//               label="Order ID"
//               name="orderId"
//               rules={[{ required: true, message: "Please input the order ID!" }]}
//             >
//               <Input
//                 value={statePaymentDetails.orderId}
//                 onChange={handleOnChangeDetails}
//                 name="orderId"
//               />
//             </Form.Item>

//             <Form.Item
//               label="Total"
//               name="total"
//               rules={[{ required: true, message: "Please input the total!" }]}
//             >
//               <Input
//                 value={statePaymentDetails.total}
//                 onChange={handleOnChangeDetails}
//                 name="total"
//               />
//             </Form.Item>

//             <Form.Item
//               label="Payment Method"
//               name="paymentMethod"
//               rules={[
//                 { required: true, message: "Please select a payment method!" },
//               ]}
//             >
//               <Select
//                 value={statePaymentDetails.paymentMethod}
//                 onChange={handleOnChangeSelect}
//                 options={[
//                   { value: "Credit Card", label: "Credit Card" },
//                   { value: "PayPal", label: "PayPal" },
//                   { value: "Bank Transfer", label: "Bank Transfer" },
//                 ]}
//               />
//             </Form.Item>

//             <Form.Item
//               label="Payment Date"
//               name="paymentDate"
//               rules={[{ required: true, message: "Please input the payment date!" }]}
//             >
//               <DatePicker
//                 style={{ width: "100%" }}
//                 value={statePaymentDetails.paymentDate}
//                 onChange={(date) =>
//                   setStatePaymentDetails({ ...statePaymentDetails, paymentDate: date })
//                 }
//               />
//             </Form.Item>

//             <Form.Item wrapperCol={{ offset: 13, span: 16 }}>
//               <Button style={{ margin: "5px" }} type="primary" htmlType="submit">
//                 Apply
//               </Button>
//             </Form.Item>
//           </Form>
//         </DrawerComponent>
//         <ModalComponent
//           title="Xóa Thanh Toán"
//           open={isModalOpenDelete}
//           onCancel={handleCancelDelete}
//           onOk={handleDeletePayment}
//         >
//           <div>Bạn có chắc chắn muốn xóa thanh toán này?</div>
//         </ModalComponent>
//       </div>
//     </div>
//   );
// };

// export default PaymentManager;
