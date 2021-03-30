import React from 'react';
import './Inventory.css';

const Inventory = () => {

    const handleBtnClick = () => {
        const products = {}
        const url = `https://tranquil-beyond-55017.herokuapp.com/addProduct`
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(products)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }




    return (
        <div className="container">

            <form action="" className="formInput">

                <p className="inputInfo">
                    <span>Name : </span>
                    <input type="text" />
                </p>

                <p className="inputInfo">
                    <span>Price : </span>
                    <input type="text" />
                </p>
                <p className="inputInfo">
                    <span>Quantity : </span>
                    <input type="text" />
                </p>
                <p className="inputInfo">
                    <span>Img : </span>
                    <input type="file" />
                </p>

                <button onClick={handleBtnClick}>Add All Products</button>
            </form>

        </div>
    );
};

export default Inventory;