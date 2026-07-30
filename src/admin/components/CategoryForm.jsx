import React, { useEffect, useState } from "react";

const CategoryForm = ({
    category,
    onSave,
    onCancel
}) => {

    const [name,setName] = useState("");

    useEffect(()=>{

        if(category){

            setName(category.name);

        }

    },[category]);

    const handleSubmit=(e)=>{

        e.preventDefault();

        onSave({

            name

        });

    };

    return(

        <div className="product-form-overlay">

            <div className="product-form">

                <h2>

                    {

                        category ?

                        "Edit Category"

                        :

                        "Add Category"

                    }

                </h2>

                <form onSubmit={handleSubmit}>

                    <input

                        type="text"

                        placeholder="Category Name"

                        value={name}

                        onChange={(e)=>

                            setName(e.target.value)

                        }

                        required

                    />

                    <div className="form-buttons">

                        <button
                            className="save-btn"
                            type="submit"
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

export default CategoryForm;