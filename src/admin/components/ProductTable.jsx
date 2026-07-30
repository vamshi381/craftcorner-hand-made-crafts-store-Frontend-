import React from "react";

const ProductTable = ({
    products,
    onEdit,
    onDelete
}) => {

    return (

        <table className="product-table">

            <thead>

                <tr>

                    <th>Image</th>

                    <th>Name</th>

                    <th>Category</th>

                    <th>Price</th>

                    <th>Rating</th>

                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {
                    products.length === 0 ?

                        (

                            <tr>

                                <td
                                    colSpan="6"
                                    style={{
                                        textAlign: "center",
                                        padding: "20px"
                                    }}
                                >

                                    No Products Found

                                </td>

                            </tr>

                        )

                        :

                        (

                            products.map(product => (

                                <tr key={product.id}>

                                    <td>

                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="product-image"
                                        />

                                    </td>

                                    <td>

                                        {product.name}

                                    </td>

                                    <td>

                                        {product.category}

                                    </td>

                                    <td>

                                        ₹{product.price}

                                    </td>

                                    <td>

                                        ⭐ {product.rating}

                                    </td>

                                    <td>

                                        <div className="action-buttons">

                                            <button
                                                className="edit-btn"
                                                onClick={() => onEdit(product)}
                                            >

                                            Edit

                                        </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() => onDelete(product.id)}
                                            >

                                                Delete

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )
                }

            </tbody>

        </table>

    );

};

export default ProductTable;