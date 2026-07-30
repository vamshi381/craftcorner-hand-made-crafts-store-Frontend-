import React, { useEffect, useState } from "react";

import AdminLayout from "../components/AdminLayout";
import ContactTable from "../components/ContactTable";

import {

    getAllContacts,

    deleteContact

} from "../../services/adminContactService";

import "../styles/admin.css";

const Contacts = () => {

    const [contacts, setContacts] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadContacts();

    }, []);

    const loadContacts = async () => {

        const data = await getAllContacts();

        setContacts(data);

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(

            "Delete this message?"

        );

        if (!confirmDelete) return;

        await deleteContact(id);

        loadContacts();

    };

    const filteredContacts = contacts.filter(contact =>

        contact.name

            .toLowerCase()

            .includes(search.toLowerCase())

        ||

        contact.email

            .toLowerCase()

            .includes(search.toLowerCase())

    );

    return (

        <AdminLayout>

            <div className="page-header">

                <h2>

                    Contact Messages

                </h2>

            </div>

            <input

                className="search-box table-search-box"

                placeholder="Search Messages..."

                value={search}

                onChange={(e)=>

                    setSearch(e.target.value)

                }

            />

            <div className="table-wrapper">

                <ContactTable

                    contacts={filteredContacts}

                    onDelete={handleDelete}

                />

            </div>

        </AdminLayout>

    );

};

export default Contacts;