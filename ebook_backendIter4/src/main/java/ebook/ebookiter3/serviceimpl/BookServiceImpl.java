package ebook.ebookiter3.serviceimpl;

import ebook.ebookiter3.dao.BookDao;
import ebook.ebookiter3.dao.CartDao;
import ebook.ebookiter3.dao.OrderDao;
import ebook.ebookiter3.entity.Book;
import ebook.ebookiter3.entity.CartItem;
import ebook.ebookiter3.entity.OrderItem;
import ebook.ebookiter3.entity.OrderList;
import ebook.ebookiter3.entity.request.AddBookRequest;
import ebook.ebookiter3.entity.response.BookConsuming;
import ebook.ebookiter3.service.BookService;
import ebook.ebookiter3.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;

@Service
@Slf4j
public class BookServiceImpl implements BookService {
    @Autowired
    BookDao bookDao;

    @Autowired
    OrderService orderService;


    @Autowired
    CartDao cartDao;

    @Override
    public List<Book> getBookList() {
        System.out.println("it is tome to get all books");
        return bookDao.getBookList();
    }

    @Override
    public void cutInventory(List<CartItem> cartItems) {
        for(int i = 0; i < cartItems.size(); i++) {
            Book book = cartItems.get(i).getBook();
            book.setInventory(book.getInventory() - cartItems.get(i).getBookNum());
            bookDao.changeInventory(book);
        }
    }

    @Override
    public Book findBookById(Integer bid) {
        return bookDao.getBookById(bid).get();
    }

    @Override
    public void addToCart(Integer bid, Integer uid) {
        cartDao.addToCart(bid, uid);
    }

    @Override
    public void changeBook(AddBookRequest addBookRequest) {
        System.out.println("now it is time to change book");
//        System.out.println(addBookRequest.author);
        bookDao.changeBook(addBookRequest);
    }

    @Override
    public void deleteBook(Integer bid) {
        bookDao.deleteBook(bid);
    }

    @Override
    public void addBook(AddBookRequest addBookRequest) {
        bookDao.addBook(addBookRequest);
    }

    @Override
    public List<BookConsuming> getBookHot(Timestamp beginTime, Timestamp endTime) {
        List<OrderList> orderLists = orderService.getTimeOrder(beginTime, endTime);
        List<Book> books =bookDao.getBookList();
        List<BookConsuming> bookConsumingList = new LinkedList<>();
        for(Book book: books) {
            BookConsuming bookConsuming = new BookConsuming();
            int sum = 0;
            for(OrderList orderList: orderLists) {
                for(OrderItem orderItem: orderList.getOrderItems()) {
                    if(orderItem.getBid().equals(book.getBid())) {
                        sum += orderItem.getBookNum();
                    }
                }
            }
            bookConsuming.setBook(book);
            bookConsuming.setConsuming(sum);
            bookConsumingList.add(bookConsuming);
        }
        bookConsumingList.sort(Comparator.comparing(BookConsuming::getConsuming).reversed());
        return bookConsumingList;
    }

    @Override
    public List<Book> findBook(String bookname) {
        return bookDao.findBook(bookname);
    }
}
