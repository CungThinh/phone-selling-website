import React from "react";
import "./OrderList.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllOrderByUserID } from "../../services/OrderService";
import { Navbar } from "../../components/navbar";

const OrderList = () => {
    const { user_id } = useParams();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getAllOrderByUserID(user_id);
                setOrders(data); // Assuming the API returns an array of orders
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, [user_id]);

    return (
        <div>
            <Navbar/>
        <>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <title>Bootstrap Order Details Table with Search Filter</title>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round"
            />
            <link
                rel="stylesheet"
                href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <div className="container-xl">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-4">
                                    <h2>
                                        Order <b>Details</b>
                                    </h2>
                                </div>
                                <div className="col-sm-8">
                                    <a href="#" className="btn btn-primary">
                                        <i className="material-icons"></i> <span>Refresh List</span>
                                    </a>
                                    <a href="#" className="btn btn-secondary">
                                        <i className="material-icons"></i> <span>Export to Excel</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="table-filter">
                            <div className="row">
                                <div className="col-sm-3">
                                    <div className="show-entries">
                                        <span>Show</span>
                                        <select className="form-control">
                                            <option>5</option>
                                            <option>10</option>
                                            <option>15</option>
                                            <option>20</option>
                                        </select>
                                        <span>entries</span>
                                    </div>
                                </div>
                                <div className="col-sm-9">
                                    <button type="button" className="btn btn-primary">
                                        <i className="fa fa-search" />
                                    </button>
                                    <div className="filter-group">
                                        <label>Name</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="filter-group">
                                        <label>Location</label>
                                        <select className="form-control">
                                            <option>All</option>
                                            <option>Berlin</option>
                                            <option>London</option>
                                            <option>Madrid</option>
                                            <option>New York</option>
                                            <option>Paris</option>
                                        </select>
                                    </div>
                                    <div className="filter-group">
                                        <label>Status</label>
                                        <select className="form-control">
                                            <option>Any</option>
                                            <option>Delivered</option>
                                            <option>Shipped</option>
                                            <option>Pending</option>
                                            <option>Cancelled</option>
                                        </select>
                                    </div>
                                    <span className="filter-icon">
                                        <i className="fa fa-filter" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Order ID</th>
                                    <th>Payment Method</th>
                                    <th>Order Date</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={order.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <a href="#">
                                                {order.id}
                                            </a>
                                        </td>
                                        <td>{order.payment_method}</td>
                                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <span className={`status text-${order.is_delivered ? 'success' : 'danger'}`}>
                                                •
                                            </span> {order.is_delivered ? 'Delivered' : 'Not Delivered'}
                                        </td>
                                        <td>${order.total_price}</td>
                                        <td>
                                            <a
                                                href="#"
                                                className="view"
                                                title="View Details"
                                                data-toggle="tooltip"
                                            >
                                                <i className="material-icons"></i>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
        </div>
    );
};

export default OrderList;
