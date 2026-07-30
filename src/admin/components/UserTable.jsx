import React from "react";

const UserTable = ({
    users,
    onDelete
}) => {

    return (

        <table className="product-table">

            <thead>

                <tr>

                    <th>Profile</th>

                    <th>Name</th>

                    <th>Email</th>

                    <th>Phone</th>

                    <th>Role</th>

                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

                {

                    users.length === 0 ?

                    (

                        <tr>

                            <td colSpan="6">

                                No Users Found

                            </td>

                        </tr>

                    )

                    :

                    (

                        users.map(user => (

                            <tr key={user.id}>

                                <td>

                                    <img

                                        src={user.profileImage}

                                        alt={user.name}

                                        className="product-image"

                                    />

                                </td>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td>{user.phone}</td>

                                <td>{user.role}</td>

                                <td>

                                    {

                                        user.role === "admin"

                                        ?

                                        <button
                                            disabled
                                            className="edit-btn"
                                        >
                                            Admin
                                        </button>

                                        :

                                        <button

                                            className="delete-btn"

                                            onClick={() =>

                                                onDelete(user.id)

                                            }

                                        >

                                            Delete

                                        </button>

                                    }

                                </td>

                            </tr>

                        ))

                    )

                }

            </tbody>

        </table>

    );

};

export default UserTable;