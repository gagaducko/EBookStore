package ebook.ebookiter3.entity;

public class OrderBook {
    private Book book;
    private OrderItem orderItem;

    public OrderBook() {}

    public void setBook(Book book) {
        this.book = book;
    }

    public OrderItem getOrderItem() {
        return orderItem;
    }

    public Book getBook() {
        return book;
    }

    public void setOrderItem(OrderItem orderItem) {
        this.orderItem = orderItem;
    }
}
