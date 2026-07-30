import React, { useEffect, useState } from "react";

import AdminLayout from "../components/AdminLayout";
import CategoryTable from "../components/CategoryTable";
import CategoryForm from "../components/CategoryForm";

import {

    getCategories,

    addCategory,

    updateCategory,

    deleteCategory

} from "../../services/categoryService";

import "../styles/admin.css";

const Categories=()=>{

    const [categories,setCategories]=useState([]);

    const [search,setSearch]=useState("");

    const [showForm,setShowForm]=useState(false);

    const [selectedCategory,setSelectedCategory]=useState(null);

    useEffect(()=>{

        loadCategories();

    },[]);

    const loadCategories=async()=>{

        const data=await getCategories();

        setCategories(data);

    };

    const handleSave=async(category)=>{

        if(selectedCategory){

            await updateCategory(

                selectedCategory.id,

                category

            );

        }

        else{

            await addCategory(category);

        }

        setShowForm(false);

        loadCategories();

    };

    const handleDelete=async(id)=>{

        if(window.confirm("Delete Category?")){

            await deleteCategory(id);

            loadCategories();

        }

    };

    const filtered=categories.filter(category=>

        category.name

        .toLowerCase()

        .includes(search.toLowerCase())

    );

    return(

        <AdminLayout>

            <div className="page-header">

                <h2>

                    Category Management

                </h2>

                <button

                    className="add-btn"

                    onClick={()=>{

                        setSelectedCategory(null);

                        setShowForm(true);

                    }}

                >

                    + Add Category

                </button>

            </div>

            <input

                className="search-box table-search-box"

                placeholder="Search Category"

                value={search}

                onChange={(e)=>

                    setSearch(e.target.value)

                }

            />

            <div className="table-wrapper">

                <CategoryTable

                    categories={filtered}

                    onEdit={(category)=>{

                    setSelectedCategory(category);

                    setShowForm(true);

                }}

                onDelete={handleDelete}

                />

            </div>

            {

                showForm &&

                <CategoryForm

                    category={selectedCategory}

                    onSave={handleSave}

                    onCancel={()=>setShowForm(false)}

                />

            }

        </AdminLayout>

    );

};

export default Categories;