import React from 'react';
import BookContainer from './BookContainer'

const Books = ({ books, addToCart, searchBooks, sortBookByAuthor, sortBookByTitle }) => {
    return (
        <div>
            <div className="mb-3">
                <h4>Flearn Book Store</h4>
                <div className="mt-4">
                    <form className="form-inline my-2 my-lg-0">
                        <input onChange={ e => searchBooks( e.target.value )} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <div className="form-check mx-3">
                            <small className="form-check mr-3"> Sort by:</small>
                            <input onClick={ e => sortBookByTitle( e.target.value )} className="form-check-input" type="radio" name="sort" value="title" defaultChecked />
                            <label className="form-check-label" htmlFor="title" >
                                <small>Title</small>
                            </label>
                        </div>
                        <div className="form-check">
                            <input onClick={ e => sortBookByAuthor( e.target.value )} className="form-check-input" type="radio" name="sort" value="author" />
                            <label className="form-check-label" htmlFor="author">
                                <small>Author</small>
                            </label>
                        </div>
                    </form>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">TITLE</th>
                        <th scope="col" className="text-center">PRICE</th>
                        <th scope="col" className="text-center">ADD</th>
                    </tr>
                </thead>
                <tbody>
                    { books.map( book => {
                        return (
                            <tr key={ book.id }>
                                <BookContainer 
                                    { ...book } 
                                    addToCart={ addToCart } 
                                />
                            </tr>
                        )
                    })}
                </tbody>
            </table>        
        </div>
    )
}

export default Books