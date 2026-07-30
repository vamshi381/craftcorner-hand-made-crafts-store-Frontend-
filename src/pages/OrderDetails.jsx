import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../services/orderService";
import "../styles/orderDetails.css";


const OrderDetails = () => {

    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        loadOrder();

    }, [id]);



    const loadOrder = async () => {

        try {

            const data = await getOrderById(id);

            setOrder(data);

        }

        catch (error) {

            console.log("Error loading order:", error);

        }

        finally {

            setLoading(false);

        }

    };



    if (loading) {

        return (

            <div className="loading">

                Loading Order Details...

            </div>

        );

    }



    if (!order) {

        return (

            <div className="loading">

                Order Not Found

            </div>

        );

    }



    return (

        <section className="order-details-page">

            <div className="container">


                <h2 className="details-title">

                    📦 Order Details

                </h2>



                {/* Order Information */}

                <div className="details-card">


                    <h3>
                        Order ID
                    </h3>

                    <p>
                        #{order.id}
                    </p>



                    <h3>
                        Order Date
                    </h3>

                    <p>
                        {order.orderDate}
                    </p>



                    <h3>
                        Status
                    </h3>


                    <span className={`status ${order.status?.toLowerCase()}`}>

                        {order.status}

                    </span>


                </div>





                {/* Customer Details */}


                <div className="details-card">


                    <h3>

                        🏠 Shipping Address

                    </h3>


                    <p>
                        <strong>Name :</strong>{" "}
                        {order.customer?.fullName}
                    </p>


                    <p>
                        <strong>Phone :</strong>{" "}
                        {order.customer?.phone}
                    </p>


                    <p>
                        <strong>Email :</strong>{" "}
                        {order.customer?.email}
                    </p>


                    <p>
                        <strong>House :</strong>{" "}
                        {order.customer?.house}
                    </p>


                    <p>
                        <strong>Street :</strong>{" "}
                        {order.customer?.street}
                    </p>


                    <p>
                        <strong>City :</strong>{" "}
                        {order.customer?.city}
                    </p>


                    <p>
                        <strong>State :</strong>{" "}
                        {order.customer?.state}
                    </p>


                    <p>
                        <strong>Pincode :</strong>{" "}
                        {order.customer?.pincode}
                    </p>


                </div>






                {/* Products */}


                <div className="details-card">


                    <h3>

                        🛍 Ordered Products

                    </h3>



                    {
                        order.products?.map(product => (

                            <div 
                                className="detail-product"
                                key={product.id}
                            >


                                <img
                                    src={product.image}
                                    alt={product.name}
                                />



                                <div>


                                    <h4>

                                        {product.name}

                                    </h4>


                                    <p>

                                        Quantity : {product.quantity}

                                    </p>


                                </div>



                                <h3>

                                    ₹{product.price}

                                </h3>



                            </div>


                        ))
                    }


                </div>






                {/* Payment Summary */}


                <div className="details-card">


                    <h3>

                        💳 Payment Summary

                    </h3>



                    <p>

                        Subtotal

                        <span>

                            ₹{order.subtotal?.toFixed(2)}

                        </span>

                    </p>



                    <p>

                        Tax

                        <span>

                            ₹{order.tax?.toFixed(2)}

                        </span>

                    </p>



                    <p>

                        Delivery

                        <span>

                            FREE

                        </span>

                    </p>



                    <hr />



                    <h2>

                        Total

                        <span>

                            ₹{order.total?.toFixed(2)}

                        </span>

                    </h2>




                    <p>

                        <strong>
                            Payment Method :
                        </strong>{" "}


                        {
                            order.paymentMethod ||
                            order.customer?.payment ||
                            "Not Available"
                        }


                    </p>


                </div>




            </div>


        </section>

    );

};


export default OrderDetails;