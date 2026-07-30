import React from "react";

const ContactTable = ({
    contacts,
    onDelete
}) => {

    return (

        <table className="product-table">

            <thead>

                <tr>

                    <th>Name</th>

                    <th>Email</th>

                    <th>Subject</th>

                    <th>Message</th>

                    <th>Date</th>

                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

                {

                    contacts.length === 0 ?

                    (

                        <tr>

                            <td
                                colSpan="6"
                                style={{
                                    textAlign:"center"
                                }}
                            >

                                No Messages Found

                            </td>

                        </tr>

                    )

                    :

                    (

                        contacts.map(contact => (

                            <tr key={contact.id}>

                                <td>

                                    {contact.name}

                                </td>

                                <td>

                                    {contact.email}

                                </td>

                                <td>

                                    {contact.subject}

                                </td>

                                <td
                                    style={{
                                        maxWidth:"250px"
                                    }}
                                >

                                    {contact.message}

                                </td>

                                <td>

                                    {contact.date}

                                </td>

                                <td>

                                    <button

                                        className="delete-btn"

                                        onClick={()=>

                                            onDelete(contact.id)

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

export default ContactTable;