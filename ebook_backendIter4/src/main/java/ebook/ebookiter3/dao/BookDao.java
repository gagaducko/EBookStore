package ebook.ebookiter3.dao;

import ebook.ebookiter3.entity.Book;
import ebook.ebookiter3.entity.request.AddBookRequest;

import java.util.List;
import java.util.Optional;

public interface BookDao {
    List<Book> getBookList();

    void changeBook(AddBookRequest addBookRequest);

    void deleteBook(Integer bid);

    void addBook(AddBookRequest addBookRequest);

    List<Book> findBook(String bookname);

    Book getOneBook(Integer bid);

    Optional<Book> getBookById(Integer bid);

    void changeInventory(Book book);
}
