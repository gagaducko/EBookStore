package ebook.ebookiter3.controller;

import ebook.ebookiter3.entity.Book;
import ebook.ebookiter3.entity.request.BookToCartRequest;
import ebook.ebookiter3.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/book")
public class BookController {
    @Autowired
    BookService bookService;

    @PostMapping("/getAllBooks")
    public List<Book> getAllBooks() {
        return bookService.getBookList();
    }

    @PostMapping("/findBook")
    public List<Book> getBook(@RequestBody Book bookname) {
        String bookname_st = bookname.getBookname();
        return bookService.findBook(bookname_st);
    }

    @PostMapping("/getByBID")
    public Book getBookById(@RequestBody Integer bid) {
        System.out.println(bid);
        return bookService.findBookById(bid);
    }

    @PostMapping("/addToCart")
    public void addToCart(@RequestBody BookToCartRequest bookToCartRequest) {
        Integer bid = bookToCartRequest.getBid();
        Integer uid = bookToCartRequest.getUid();
        System.out.println(bid);
        System.out.println(uid);
        bookService.addToCart(bid, uid);
    }





}
