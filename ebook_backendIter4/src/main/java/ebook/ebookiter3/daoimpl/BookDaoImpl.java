package ebook.ebookiter3.daoimpl;

import ebook.ebookiter3.dao.BookDao;
import ebook.ebookiter3.entity.Book;
import ebook.ebookiter3.entity.request.AddBookRequest;
import ebook.ebookiter3.repository.BookRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Repository
@Slf4j
public class BookDaoImpl implements BookDao {
    @Autowired
    private BookRepository bookRepository;
    @Override
    public List<Book> getBookList() {
        System.out.println("getBooksList");
        return bookRepository.findAll();
    }


    @Override
    public Optional<Book> getBookById(Integer bid) {
        return bookRepository.findById(bid);
    }

    @Override
    public void deleteBook(Integer bid) {
        List<Integer> list = new LinkedList<>();
        list.add(bid);
        List<Book> books = bookRepository.findAllById(list);
        bookRepository.delete(books.get(0));
    }

    @Override
    public void changeInventory(Book book) {
        bookRepository.save(book);
    }

    @Override
    public Book getOneBook(Integer bid) {
        return bookRepository.getReferenceById(bid);
    }


    @Override
    public List<Book> findBook(String bookname) {
        System.out.println("now it is dao");
        Book book = bookRepository.findByBookName(bookname);
        System.out.println(book.getBookname());
        List<Book> books = new LinkedList<>();
        books.add(book);
        return books;
    }

    @Override
    public void addBook(AddBookRequest addBookRequest) {
        String bookname = addBookRequest.getBookname();
        String author = addBookRequest.getAuthor();
        String isbn = addBookRequest.getIsbn();
        String description = addBookRequest.getDescription();
        String image = addBookRequest.getImage();
        BigDecimal price = addBookRequest.getPrice();
        Integer type = addBookRequest.getType();
        Integer inventory = addBookRequest.getInventory();
        Book book = new Book();
        book.setAuthor(author);
        book.setType(type);
        book.setBookname(bookname);
        book.setDescription(description);
        book.setImage(image);
        book.setInventory(inventory);
        book.setIsbn(isbn);
        book.setPrice(price);
        bookRepository.save(book);
        System.out.println("save okk!!!");
    }

    @Override
    public void changeBook(AddBookRequest addBookRequest) {
        Integer bid = addBookRequest.getBid();
        String bookname = addBookRequest.getBookname();
        String author = addBookRequest.getAuthor();
        String isbn = addBookRequest.getIsbn();
        String description = addBookRequest.getDescription();
        String image = addBookRequest.getImage();
        BigDecimal price = addBookRequest.getPrice();
        Integer type = addBookRequest.getType();
        Integer inventory = addBookRequest.getInventory();
        Optional<Book> book = bookRepository.findById(bid);
        if(book.isPresent()) {
            Book changeBook = book.get();
            changeBook.setAuthor(author);
            changeBook.setType(type);
            changeBook.setBookname(bookname);
            changeBook.setDescription(description);
            changeBook.setImage(image);
            changeBook.setInventory(inventory);
            changeBook.setIsbn(isbn);
            changeBook.setPrice(price);
            System.out.println("now it is time to save the fucking book");
            bookRepository.save(changeBook);
        }
    }
}
