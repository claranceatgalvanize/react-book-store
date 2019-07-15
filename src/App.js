import React, { Component } from 'react';
import Books from './components/Books'
import Cart from './components/Cart'
import './App.css'

class App extends Component {

  state = {
    books: [],
    search: "",
    sort: "title"
  }
    
  getAllBokks = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/books');
      const books = await response.json() 
      this.setState({ 
        books: books.map( book => {
          return {  ...book, quantity: 0 }
        })
      })      
    } catch (err) { console.log(err) }
  }
  
  
  addToCart = async id => {
    try { await fetch(`http://localhost:8082/api/books/cart/add/${id}`, { method: 'PATCH' })}
    catch (err) { console.log(err)}

    // this.setState(prevState => {
    //   return {
    //       books: prevState.books.map(book => {
    //           if (book.id === id) {
    //               return {
    //                 ...book,
    //                 quantity: prevState.books.quantity + 1
    //               }
    //             }
    //           console.log(book.quantity, 'iiiiiii')
    //           return book
    //       })
    //   }
    // })

    this.getAllBokks()
  }
    
  removeFromCart = async id => {
    try { await fetch(`http://localhost:8082/api/books/cart/remove/${id}`, { method: 'PATCH' })}
    catch (err) { console.log(err)}
    this.getAllBokks()
  }

  searchBooks = searchVal => {
   this.setState({ search: searchVal })
  }

  sortBookByAuthor = value => {
      this.setState({ sort: value })
  }

  sortBookByTitle = value => {
      this.setState({ sort: value })
  }

  async componentDidMount () { this.getAllBokks() }
    
  render () {

    const cartContent = this.state.books.filter(book => book.inCart);
    const searchResult = this.state.books.filter( book => {
      return book.title.toLowerCase().includes(this.state.search.toLowerCase()) && 'No match found!';
    })
    
    const sortedBooks = () => {
      let acc = [];
      if (this.state.sortBy === 'title') {
        acc = this.state.books.sort((book1, book2) => {
          if (book1.title < book2.title) {
            return -1;
          } else if (book1.title > book2.title) {
            return 1;
          } else {
            return 0;
          }
        })
      }else if (this.state.sortBy === 'author') {
        acc = this.state.books.sort((book1, book2) => {
          if (book1.author < book2.author) {
            return -1;
          } else if (book1.author > book2.author) {
            return 1;
          } else {
            return 0;
          }
        })
      }
  
      return acc;
    }

    console.log(sortedBooks())

    const totalPrice = cartContent.reduce((acc, book) => acc + book.price, 0)

    return (
      <div className="mx-5 my-5">
        <div className="row">
          <div className="col-7">
            <Books 
              addToCart={ this.addToCart }
              searchBooks={ this.searchBooks }
              sortBookByAuthor={ this.sortBookByAuthor }
              sortBookByTitle={ this.sortBookByTitle }
              // sortedBooks={ sortedBooks }
              books={searchResult}           
            />
          </div>
          
          <div className="col-5">
            <Cart  
            cartContent={ cartContent } 
            totalPrice={ totalPrice } 
            removeFromCart={ this.removeFromCart } 
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App