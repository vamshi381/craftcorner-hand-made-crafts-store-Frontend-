import React from "react";

const CategoryTable = ({
    categories,
    onEdit,
    onDelete
}) => {

    return (

        <table className="product-table">

            <thead>

                <tr>

                    <th>Category Name</th>

                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {

                    categories.length === 0 ?

                    (

                        <tr>

                            <td
                                colSpan="2"
                                style={{
                                    textAlign:"center",
                                    padding:"20px"
                                }}
                            >

                                No Categories Found

                            </td>

                        </tr>

                    )

                    :

                    (

                        categories.map(category=>(

                            <tr key={category.id}>

                                <td>

                                    {category.name}

                                </td>

                                <td>

                                    <button
                                        className="edit-btn"
                                        onClick={()=>
                                            onEdit(category)
                                        }
                                    >

                                        Edit

                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={()=>
                                            onDelete(category.id)
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

export default CategoryTable;