// ==========================================
// Checkout Page
// ==========================================

import React, { useEffect, useState } from "react";
import "../styles/checkout.css";

import { getCart, clearCart } from "../services/cartService";
import { placeOrder } from "../services/orderService";

import { useNavigate } from "react-router-dom";

const Checkout = () => {

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        email: "",
        house: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        payment: "Cash On Delivery",

        upiId: "",

        cardNumber: "",
        expiry: "",
        cvv: ""
    });

    useEffect(() => {

        loadCart();

        const user = JSON.parse(
            localStorage.getItem("currentUser")
        );

        if (user) {

            setForm((prev) => ({
                ...prev,
                fullName: user.name,
                phone: user.phone,
                email: user.email
            }));

        }

    }, []);

    const loadCart = async () => {

        const data = await getCart();

        setCart(data);

    };

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const subtotal = cart.reduce(

        (sum, item) => sum + item.price * item.quantity,

        0

    );

    const tax = subtotal * 0.05;

    const delivery = 0;

    const total = subtotal + tax + delivery;

    const handlePlaceOrder = async () => {

        if (
            !form.fullName ||
            !form.phone ||
            !form.email ||
            !form.house ||
            !form.street ||
            !form.city ||
            !form.state ||
            !form.pincode
        ) {

            alert("Please fill all address details.");

            return;

        }

        const storedUser = localStorage.getItem("currentUser") || localStorage.getItem("currentuser");
        const currentUser = storedUser ? JSON.parse(storedUser) : null;

        const order = {

            userId: currentUser?.id,

            customer: form,

            products: cart,

            subtotal,

            tax,

            delivery,

            total,

            paymentMethod: form.payment,

            orderDate: new Date().toLocaleString(),

            status: "Pending"

        };

        await placeOrder(order);

        await clearCart();

        alert("🎉 Order Placed Successfully!");

        navigate("/order-success");

    };

  return (

<section className="checkout-page">

<div className="container">

<h2 className="checkout-title">
Checkout
</h2>

<div className="checkout-layout">

{/* ================= Left ================= */}

<div className="checkout-form">

<h3>Shipping Address</h3>

<input
type="text"
name="fullName"
placeholder="Full Name"
value={form.fullName}
onChange={handleChange}
/>

<input
type="text"
name="phone"
placeholder="Phone Number"
value={form.phone}
onChange={handleChange}
/>

<input
type="email"
name="email"
placeholder="Email"
value={form.email}
onChange={handleChange}
/>

<input
type="text"
name="house"
placeholder="House No / Flat No"
value={form.house}
onChange={handleChange}
/>

<input
type="text"
name="street"
placeholder="Street / Area / Locality"
value={form.street}
onChange={handleChange}
/>

<input
type="text"
name="city"
placeholder="City"
value={form.city}
onChange={handleChange}
/>

<input
type="text"
name="state"
placeholder="State"
value={form.state}
onChange={handleChange}
/>

<input
type="text"
name="pincode"
placeholder="Pincode"
value={form.pincode}
onChange={handleChange}
/>

<h3 className="mt-4">
Payment Method
</h3>

<div className="payment-box">

<label>

<input
type="radio"
name="payment"
value="Cash On Delivery"
checked={form.payment==="Cash On Delivery"}
onChange={handleChange}
/>

Cash On Delivery

</label>

<label>

<input
type="radio"
name="payment"
value="UPI"
checked={form.payment==="UPI"}
onChange={handleChange}
/>

UPI

</label>

<label>

<input
type="radio"
name="payment"
value="Credit Card"
checked={form.payment==="Credit Card"}
onChange={handleChange}
/>

Credit Card

</label>

<label>

<input
type="radio"
name="payment"
value="Debit Card"
checked={form.payment==="Debit Card"}
onChange={handleChange}
/>

Debit Card

</label>

</div>

{/* UPI */}

{form.payment==="UPI" && (

<input

type="text"

name="upiId"

placeholder="Enter UPI ID"

value={form.upiId}

onChange={handleChange}

/>

)}

{/* Card */}

{(form.payment==="Credit Card" ||

form.payment==="Debit Card") && (

<>

<input

type="text"

name="cardNumber"

placeholder="Card Number"

value={form.cardNumber}

onChange={handleChange}

/>

<div className="card-row">

<input

type="text"

name="expiry"

placeholder="MM/YY"

value={form.expiry}

onChange={handleChange}

/>

<input

type="password"

name="cvv"

placeholder="CVV"

value={form.cvv}

onChange={handleChange}

/>

</div>

</>

)}

<div className="delivery-box">

<h4>🚚 Delivery</h4>

<p>

Estimated Delivery

<strong> 2 - 4 Business Days</strong>

</p>

<p>

Free Shipping Available

</p>

</div>

<div className="security-box">

🔒 Secure Checkout

<br/>

100% Secure Payment

</div>

</div>

{/* ================= Right ================= */}

<div className="checkout-summary">

<h3>

Order Summary

</h3>

{cart.map(item=>(

<div

className="summary-product"

key={item.id}

>

<img

src={item.image}

alt={item.name}

/>

<div>

<h5>

{item.name}

</h5>

<p>

Qty : {item.quantity}

</p>

<p>

₹{item.price}

</p>

</div>

</div>

))}

<hr/>

<p>

Subtotal

<span>

₹{subtotal.toFixed(2)}

</span>

</p>

<p>

Tax

<span>

₹{tax.toFixed(2)}

</span>

</p>

<p>

Delivery

<span>

FREE

</span>

</p>

<hr/>

<h2>

Total

<span>

₹{total.toFixed(2)}

</span>

</h2>

<button

className="place-order-btn"

onClick={handlePlaceOrder}

>

🛍 Place Secure Order

</button>

</div>

</div>

</div>

</section>

);

};

export default Checkout;