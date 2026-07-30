// ==========================================
// Orders Page
// ==========================================

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getOrders,
  cancelOrder
} from "../services/orderService";

import "../styles/orders.css";

const Orders = () => {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    loadOrders();

  }, []);

  const loadOrders = async () => {

    try {

      const data = await getOrders();

      setOrders(data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleCancel = async (id) => {

    const confirmCancel = window.confirm(
      "Cancel this order?"
    );

    if (!confirmCancel) return;

    await cancelOrder(id);

    loadOrders();

  };

  return (

    <section className="orders-page">

      <div className="container">

        <h2 className="orders-title">

          📦 My Orders

        </h2>

        {

          orders.length === 0 ?

          (

            <div className="empty-orders">

              <h3>

                No Orders Found

              </h3>

              <p>

                You haven't placed any orders yet.

              </p>

            </div>

          )

          :

          (

            orders.map(order => (

              <div
                className="order-card"
                key={order.id}
              >

                <div className="order-header">

                  <div>

                    <h4>

                      Order #{order.id}

                    </h4>

                    <p>

                      {order.orderDate}

                    </p>

                  </div>

                  <span className={`status ${order.status.toLowerCase()}`}>

                    {order.status}

                  </span>

                </div>

                <div className="order-products">

                  {

                    order.products.map(product => (

                      <div
                        className="product-row"
                        key={product.id}
                      >

                        <img
                          src={product.image}
                          alt={product.name}
                        />

                        <div>

                          <h5>

                            {product.name}

                          </h5>

                          <p>

                            Qty : {product.quantity}

                          </p>

                        </div>

                        <h4>

                          ₹{product.price}

                        </h4>

                      </div>

                    ))

                  }

                </div>

                <div className="order-footer">

                  <div>

                    <strong>

                      Payment

                    </strong>

                    <p>

                      {order.paymentMethod}

                    </p>

                  </div>

                  <div>

                    <strong>

                      Total

                    </strong>

                    <h4>

                      ₹{order.total.toFixed(2)}

                    </h4>

                  </div>

                  <div className="buttons">

                    <button

                      className="details-btn"

                      onClick={() =>
                        navigate(`/orders/${order.id}`)
                      }

                    >

                      View Details

                    </button>

                    {

                      order.status === "Pending" && (

                        <button

                          className="cancel-btn"

                          onClick={() =>
                            handleCancel(order.id)
                          }

                        >

                          Cancel Order

                        </button>

                      )

                    }

                  </div>

                </div>

              </div>

            ))

          )

        }

      </div>

    </section>

  );

};

export default Orders;