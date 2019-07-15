import React from 'react'
import cartIcon from '../trash-alt-solid.svg';

const Cart = ({ cartContent, totalPrice, removeFromCart }) => {

    return (
        <div>
            <h4>Checkout</h4>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">TITLE</th>
                        <th scope="col" className="text-center"><small>Total: </small>${ totalPrice - 1 / 100}</th>
                    </tr>
                </thead>
                <tbody>
                    {cartContent.map( book => (
                        <tr key={ book.id }>
                            <td>{ book.title }</td>
                            <td className="text-center">
                                <button 
                                    id={book.id} 
                                    onClick={ (e) => removeFromCart(book.id) } 
                                    className="btn-sm rounded-1">
                                    <img className="add-btn" src={cartIcon} alt="btn"/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Cart
