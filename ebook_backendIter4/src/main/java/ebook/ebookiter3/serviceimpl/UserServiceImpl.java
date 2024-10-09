package ebook.ebookiter3.serviceimpl;

import ebook.ebookiter3.constant.UserConstant;
import ebook.ebookiter3.constant.UserServiceStatus;
import ebook.ebookiter3.dao.BookDao;
import ebook.ebookiter3.dao.OrderDao;
import ebook.ebookiter3.dao.UserDao;
import ebook.ebookiter3.entity.Book;
import ebook.ebookiter3.entity.OrderItem;
import ebook.ebookiter3.entity.OrderList;
import ebook.ebookiter3.entity.User;
import ebook.ebookiter3.entity.response.*;
import ebook.ebookiter3.service.OrderService;
import ebook.ebookiter3.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.LinkedList;
import java.util.List;
import javax.annotation.Resource;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.ArrayList;
import java.util.Comparator;

@Service
@Slf4j
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Autowired
    private BookDao bookDao;

    @Autowired
    private OrderService orderService;

    @Override
    public void banUsers(Integer uid) {
        List<Integer> uidList = new LinkedList<>();
        uidList.add(uid);
        System.out.println("now it is in service");
        System.out.println(uid);
        System.out.println(uidList.get(0));
        userDao.banTheUser(uidList);
    }

    @Override
    public void unBanUsers(Integer uid) {
        List<Integer> uidList = new LinkedList<>();
        uidList.add(uid);
        userDao.unBanTheUser(uidList);
    }

    @Override
    public List<User> getUserList() {
        return userDao.getUserList();
    }

    @Override
    public UserLoginResponse userLogin(String username, String password, HttpServletRequest request) {
        UserLoginResponse userLoginResponse = new UserLoginResponse();
        if(StringUtils.isAnyBlank(username, password)) {
            userLoginResponse.setStatus(UserServiceStatus.USER_ACCOUNT_PASSWORD_NULL);
            return userLoginResponse;
        }
        User user = userDao.checkUser(username, password);
        if(user == null) {
            System.out.println("there is no user exist");
            userLoginResponse.setStatus(UserServiceStatus.USER_NOT_EXIST);
            return userLoginResponse;
        }
        if(user.getType() == 2) {
            userLoginResponse.setStatus(UserServiceStatus.USER_ACCOUNT_ILLEGAL);
            return userLoginResponse;
        }
        request.getSession().setAttribute(UserConstant.USER_LOGIN_STATE, user);
        Integer uid = user.getUid();
        userLoginResponse.setUid(uid);
        userLoginResponse.setUsername(user.getUsername());
        userLoginResponse.setType(user.getType());

        userLoginResponse.setStatus(UserServiceStatus.USER_ALL_OK);
        System.out.println("log in success");

        return userLoginResponse;
    }

    @Override
    public List<UserConsuming> getUserConsumingList(Timestamp beginTime, Timestamp endTime) {
        List<OrderList> orderLists = orderService.getTimeOrder(beginTime, endTime);
        List<UserConsuming> userConsumingList = new LinkedList<>();
        List<User> userList = userDao.getUserList();
        for(User user: userList) {
            UserConsuming userConsuming = new UserConsuming();
            BigDecimal sum = BigDecimal.valueOf(0);
            Integer count = 0;
            for(OrderList orderList: orderLists) {
                BigDecimal allPrice = BigDecimal.valueOf(0);
                Integer count_in = 0;
                for(OrderItem orderItem: orderList.getOrderItems()) {
                    allPrice = allPrice.add(orderItem.getBookPrice().multiply(BigDecimal.valueOf(orderItem.getBookNum())));
                    count_in += orderItem.getBookNum();
                }
                if(orderList.getUid() == user.getUid()) {
                    sum = sum.add(allPrice);
                    count += count_in;
                }
            }
            userConsuming.setConsuming(sum);
            userConsuming.setUid(user.getUid());
            userConsuming.setBookNum(count);
            userConsumingList.add(userConsuming);
        }
        userConsumingList.sort(Comparator.comparing(UserConsuming::getConsuming).reversed());
        return userConsumingList;
    }


    @Override
    public UserRegisterResponse userRegister(String username, String password, String userEmail) {
        UserRegisterResponse userRegisterResponse = new UserRegisterResponse();
        userRegisterResponse.setUsername(username);
        User user = userDao.checkUserName(username);
        if(user != null) {
            System.out.println("there is already user exist");
            userRegisterResponse.setStatus(UserServiceStatus.USER_ALREADY_EXIST);
            return userRegisterResponse;
        }
        userRegisterResponse.setStatus(UserServiceStatus.USER_ALL_OK);
        return userRegisterResponse;
    }

    @Override
    public UserConsumingForThemselves getUserBuy(Integer uid, Timestamp beginTime, Timestamp endTime) {
        List<OrderList> orderLists = orderService.getUserTimeOrder(beginTime, endTime, uid);
        List<BookConsuming> bookConsumingList = new LinkedList<>();
        List<Book> books = bookDao.getBookList();
        int count = 0;
        BigDecimal allPrice = BigDecimal.valueOf(0);
        for(Book book: books) {
            BookConsuming bookConsuming = new BookConsuming();
            int sum = 0;
            BigDecimal bookPrice = BigDecimal.valueOf(0);
            for(OrderList orderList: orderLists) {
                for(OrderItem orderItem: orderList.getOrderItems()) {
                    if(orderItem.getBid().equals(book.getBid())) {
                        bookPrice = bookPrice.add(orderItem.getBookPrice().multiply(BigDecimal.valueOf(orderItem.getBookNum())));
                        System.out.println(bookPrice);
                        System.out.println("ok");
                        sum += orderItem.getBookNum();
                    }
                }
            }
            if(sum != 0) {
                allPrice = allPrice.add(bookPrice);
                count += sum;
                bookConsuming.setBook(book);
                bookConsuming.setConsuming(sum);
                bookConsumingList.add(bookConsuming);
            }
        }
        bookConsumingList.sort(Comparator.comparing(BookConsuming::getConsuming).reversed());
        UserConsumingForThemselves userConsumingForThemselves = new UserConsumingForThemselves();
        userConsumingForThemselves.setBookConsumingList(bookConsumingList);
        userConsumingForThemselves.setBookNum(count);
        userConsumingForThemselves.setConsuming(allPrice);
        return userConsumingForThemselves;
    }


    @Override
    public void addUser(User user) {
        userDao.addUser(user);
    }
}
