import React, { useEffect, useState } from "react";

const ProductForm = ({
    product,
    onSave,
    onCancel
}) => {

    const [form, setForm] = useState({

        name: "",

        image: "",

        category: "Pottery",

        price: "",

        rating: "",

        description: ""

    });

    useEffect(() => {

        if (product) {

            setForm(product);

        }

    }, [product]);

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSave(form);

    };

    return (

        <div className="product-form-overlay">

            <div className="product-form">

                <h2>

                    {product ? "Edit Product" : "Add Product"}

                </h2>

                <form onSubmit={handleSubmit}>

                    <input

                        type="text"

                        name="name"

                        placeholder="Product Name"

                        value={form.name}

                        onChange={handleChange}

                        required

                    />

                    <input

                        type="text"

                        name="image"

                        placeholder="Image URL"

                        value={form.image}

                        onChange={handleChange}

                        required

                    />

                    {

                        form.image &&

                        <img

                            src={form.image}

                            alt="Preview"

                            className="preview-image"

                        />

                    }

                    <select

                        name="category"

                        value={form.category}

                        onChange={handleChange}

                    >

                        <option>Pottery</option>

                        <option>Jewelry</option>

                        <option>Candles</option>

                        <option>Crochet</option>

                        <option>Resin Art</option>

                        <option>Home Decor</option>

                    </select>

                    <input

                        type="number"

                        name="price"

                        placeholder="Price"

                        value={form.price}

                        onChange={handleChange}

                        required

                    />

                    <input

                        type="number"

                        step="0.1"

                        min="1"

                        max="5"

                        name="rating"

                        placeholder="Rating"

                        value={form.rating}

                        onChange={handleChange}

                        required

                    />

                    <textarea

                        rows="4"

                        name="description"

                        placeholder="Description"

                        value={form.description}

                        onChange={handleChange}

                    />

                    <div className="form-buttons">

                        <button

                            type="submit"

                            className="save-btn"

                        >

                            Save

                        </button>

                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={onCancel}

                        >

                            Cancel

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default ProductForm;