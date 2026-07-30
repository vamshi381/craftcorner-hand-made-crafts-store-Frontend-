import React from "react";

const OrderTable = ({
    orders,
    onStatusChange,
    onDelete
}) => {

    return (

        <table className="product-table">

            <thead>

                <tr>

                    <th>Order ID</th>

                    <th>Customer</th>

                    <th>Date</th>

                    <th>Total</th>

                    <th>Status</th>

                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {

                    orders.length === 0 ?

                    (

                        <tr>

                            <td
                                colSpan="6"
                                style={{
                                    textAlign:"center",
                                    padding:"20px"
                                }}
                            >

                                No Orders Found

                            </td>

                        </tr>

                    )

                    :

                    (

                        orders.map(order=>(

                            <tr key={order.id}>

                                <td>{order.id}</td>

                                <td>{order.customer.fullName}</td>

                                <td>{order.orderDate}</td>

                                <td>₹{order.total.toFixed(2)}</td>

                                <td>

                                    <select

                                        className="admin-select order-status-select"

                                        value={order.status}

                                        onChange={(e)=>

                                            onStatusChange(

                                                order.id,

                                                e.target.value

                                            )

                                        }

                                    >

                                        <option>Pending</option>

                                        <option>Processing</option>

                                        <option>Shipped</option>

                                        <option>Delivered</option>

                                        <option>Cancelled</option>

                                    </select>

                                </td>

                                <td>

                                    <button

                                        className="delete-btn"

                                        onClick={()=>

                                            onDelete(order.id)

                                        }

                                    >

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))

                    )

                }

            </tbody>

        </table>

    );

};

export default OrderTable;