import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";

import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
} from "../../services/adminProductService";

import "../styles/admin.css";


const Products = () => {

    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {

        loadProducts();

    }, []);

    const loadProducts = async () => {

        try {

            const data = await getProducts();

            setProducts(data);

        }

        catch(error){

            console.log(error);

        }

    };

    // ============================
    // Add Product
    // ============================

    const handleAdd = () => {

        setSelectedProduct(null);

        setShowForm(true);

    };

    // ============================
    // Edit Product
    // ============================

    const handleEdit = (product) => {

        setSelectedProduct(product);

        setShowForm(true);

    };

    // ============================
    // Save Product
    // ============================

    const handleSave = async (product) => {

        try{

            if(selectedProduct){

                await updateProduct(

                    selectedProduct.id,

                    product

                );

            }

            else{

                await addProduct(product);

            }

            setShowForm(false);

            loadProducts();

        }

        catch(error){

            console.log(error);

        }

    };

    // ============================
    // Delete Product
    // ============================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(

            "Delete this product?"

        );

        if(!confirmDelete) return;

        await deleteProduct(id);

        loadProducts();

    };

    // ============================
    // Search
    // ============================

    const filteredProducts = products.filter(product =>

        product.name
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        product.category
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <AdminLayout>

            <div className="page-header">

                <h2>

                    Product Management

                </h2>

                <button

                    className="add-btn"

                    onClick={handleAdd}

                >

                    + Add Product

                </button>

            </div>

            <input

                type="text"

                className="search-box product-search-box"

                placeholder="Search Product..."

                value={search}

                onChange={(e)=>

                    setSearch(e.target.value)

                }

            />

            <div className="product-table-wrapper">

                <ProductTable

                    products={filteredProducts}

                    onEdit={handleEdit}

                    onDelete={handleDelete}

                />

            </div>

            {

                showForm &&

                <ProductForm

                    product={selectedProduct}

                    onSave={handleSave}

                    onCancel={()=>

                        setShowForm(false)

                    }

                />

            }

        </AdminLayout>

    );

};

export default Products;