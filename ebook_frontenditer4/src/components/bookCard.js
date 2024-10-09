import React from 'react'
import '../css/bookCard.css'


class BookCard extends React.Component {
    constructor(props) {
        super(props);

    };

    Card = () => {
        let bid = this.props.bookData.bid.toString();
        window.location.href="http://localhost:3000/bookDe?bid=" + bid + ""
    }

    render = () => {
        return(
            <div className="card" onClick={this.Card}>
                <img src={this.props.bookData.image} className="card_image" alt=""></img>
                <h3 className="card_name">{this.props.bookData.bookname}</h3>
                <p className="card_desc">{this.props.bookData.author}</p>
                <p className="card_price">{this.props.bookData.price}元</p>
            </div>
        )
    }
}


export default BookCard