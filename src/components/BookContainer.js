import React from 'react'
import cartIcon from '../cart-plus-solid.svg';

const BookContainer = ({ id, title, price, addToCart }) => {
    return (
        <>
            <td>{title}</td>
            <td className="text-center">${ price - 1 / 100 }</td>
            <td className="text-center">
                <button 
                    id={id} 
                    onClick={ (e) => {addToCart(id)} } 
                    className="btn-sm rounded-1">
                    <img className="add-btn" src={cartIcon} alt=""/>
                </button>
            </td>
        </>
    )
}

export default BookContainer;