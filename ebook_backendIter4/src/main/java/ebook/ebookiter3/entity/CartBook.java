package ebook.ebookiter3.entity;

public class CartBook {
    private Book book;
    private CartItem cartItem;

    public CartBook() {}

    public void setBook(Book book) {
        this.book = book;
    }

    public void setCartItem(CartItem cartItem) {
        this.cartItem = cartItem;
    }

    public Book getBook() {
        return book;
    }

    public CartItem getCartItem() {
        return cartItem;
    }
}
