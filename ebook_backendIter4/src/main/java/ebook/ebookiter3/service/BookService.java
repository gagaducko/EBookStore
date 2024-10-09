package ebook.ebookiter3.service;

import ebook.ebookiter3.entity.Book;
import ebook.ebookiter3.entity.CartItem;
import ebook.ebookiter3.entity.request.AddBookRequest;
import ebook.ebookiter3.entity.response.BookConsuming;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.util.List;

public interface BookService {
    List<Book> getBookList();

    void changeBook(AddBookRequest addBookRequest);

    void deleteBook(Integer bid);

    void addBook(AddBookRequest addBookRequest);

    List<Book> findBook(String bookname);

    List<BookConsuming> getBookHot(Timestamp beginTime, Timestamp endTime);

    Book findBookById(Integer bid);

    void addToCart(Integer bid, Integer uid);

    void cutInventory(List<CartItem> cartItems);
}
