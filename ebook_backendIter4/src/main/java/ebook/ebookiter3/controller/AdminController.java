package ebook.ebookiter3.controller;

import ebook.ebookiter3.entity.*;
import ebook.ebookiter3.entity.request.AddBookRequest;
import ebook.ebookiter3.entity.response.BookConsuming;
import ebook.ebookiter3.entity.response.UserConsuming;
import ebook.ebookiter3.service.UserService;
import ebook.ebookiter3.service.BookService;
import ebook.ebookiter3.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/admin")
@Slf4j
public class AdminController {
    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    @Autowired
    private OrderService orderService;

    @PostMapping("/banUsers")
    public void banUsers(@RequestBody Integer uid) {
        System.out.println("now it is time to ban the user");
        System.out.println(uid);
        userService.banUsers(uid);
    }

    @PostMapping("/unBanUsers")
    public void unBanUsers(@RequestBody Integer uid) {
        userService.unBanUsers(uid);
    }

    @PostMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userService.getUserList();
    }

    @PostMapping("/getAllBooks")
    public List<Book> getAllBooks() {
        return bookService.getBookList();
    }

    @PostMapping("/changeBook")
    public void changeBook(@RequestBody AddBookRequest addBookRequest) {
        System.out.println(addBookRequest.bid);
        bookService.changeBook(addBookRequest);
    }

    @PostMapping("/addBook")
    public void addBook(@RequestBody AddBookRequest addBookRequest) {
        System.out.println("now it is time to add book");
        bookService.addBook(addBookRequest);
    }

    @PostMapping("/deleteBook")
    public void deleteBook(@RequestBody Integer bid) {
        System.out.println("delete book now");
        bookService.deleteBook(bid);
    }

    @PostMapping("/findBook")
    public List<Book> getBook(@RequestBody Book bookname) {
        System.out.println("it is time to get book");
        String bookname_st = bookname.getBookname();
        System.out.println(bookname_st);
        return bookService.findBook(bookname_st);
    }

    @PostMapping("/allOrder")
    public List<OrderList> getAllOrder() {
        return orderService.getAllOrder();
    }

    @PostMapping("/getAOrder")
    public List<OrderItem> getOneOrder(@RequestBody Integer oid) {
        System.out.println("now is get a order");
        return orderService.getOneOrder(oid);
    }

    @PostMapping("/findOrderByBook")
    public List<OrderList> getOrderByBook(@RequestBody Book bookname) {
        String bookname_st = bookname.getBookname();
        return orderService.getOrderByBook(bookname_st);
    }

    @PostMapping("/getTimeOrder")
    public List<OrderList> getTimeOrder(@RequestBody String time) {
        String str= time.replace("\"", "");
        String [] timeArray = str.split(",");
        System.out.println(timeArray[0]);
        System.out.println(timeArray[1]);
        Timestamp beginTime = Timestamp.valueOf(timeArray[0]);
        Timestamp endTime = Timestamp.valueOf(timeArray[1]);
        return orderService.getTimeOrder(beginTime, endTime);
    }

    @PostMapping("/getUserConsumingList")
    public List<UserConsuming> getUserConsumingList(@RequestBody String time) {
        System.out.println("this is time to print userhot");
        String str= time.replace("\"", "");
        String [] timeArray = str.split(",");
        System.out.println(timeArray[0]);
        System.out.println(timeArray[1]);
        Timestamp beginTime = Timestamp.valueOf(timeArray[0]);
        Timestamp endTime = Timestamp.valueOf(timeArray[1]);
        return userService.getUserConsumingList(beginTime, endTime);
    }

    @PostMapping("/getBookHot")
    private List<BookConsuming> getBookHot(@RequestBody String time) {
        System.out.println("this is time to print bookHot");
        String str= time.replace("\"", "");
        String [] timeArray = str.split(",");
        System.out.println(timeArray[0]);
        System.out.println(timeArray[1]);
        Timestamp beginTime = Timestamp.valueOf(timeArray[0]);
        Timestamp endTime = Timestamp.valueOf(timeArray[1]);
        return bookService.getBookHot(beginTime, endTime);
    }


}
