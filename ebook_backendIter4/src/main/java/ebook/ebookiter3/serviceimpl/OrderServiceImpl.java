package ebook.ebookiter3.serviceimpl;

import ebook.ebookiter3.dao.OrderDao;
import ebook.ebookiter3.dao.BookDao;
import ebook.ebookiter3.dao.UserDao;
import ebook.ebookiter3.entity.*;
import ebook.ebookiter3.service.OrderService;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.LinkedList;
import java.util.List;

@Service
@Slf4j
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderDao orderDao;

    @Autowired
    BookDao bookDao;

    @Autowired
    UserDao userDao;

    @Override
    public List<OrderList> getAllOrder() {
        return orderDao.getAllOrder();
    }

    @Override
    public List<OrderList> geUserOrder(Integer uid) {
        return orderDao.getUserOrder(uid);
    }

    @Override
    public void addToOrder(List<CartItem> cartItems, Integer uid) {
        orderDao.addToOrder(cartItems, uid);
    }

    @Override
    public List<OrderItem> getOneOrder(Integer oid) {
        System.out.println("the oid is :");
        System.out.println(oid);
        List<OrderItem> orderItems = orderDao.getOneOrder(oid);
        System.out.println(orderItems.get(0).getOid());
        System.out.println(orderItems.get(0).getBid());
        for (int i = 0; i < orderItems.size(); i++) {
            orderItems.get(i).setBook(bookDao.getOneBook(orderItems.get(i).getBid()));
        }
        System.out.println(orderItems.get(0).getBook().getBookname());
        return orderItems;
    }

    @Override
    public List<OrderList> getTimeOrder(Timestamp beginTime, Timestamp endTime) {
        List<OrderList> orderLists = orderDao.getAllOrder();
        List<OrderList> result = new LinkedList<>();
        for(int i = 0; i < orderLists.size(); i++) {
            if((orderLists.get(i).getCreateTime().getTime() - 28800000) > beginTime.getTime() && (orderLists.get(i).getCreateTime().getTime() - 28800000) < endTime.getTime()) {
                result.add(orderLists.get(i));
                System.out.println("get");
            }
        }
        return result;
    }

    @Override
    public List<OrderList> getUserTimeOrder(Timestamp beginTime, Timestamp endTime, Integer uid) {
        List<OrderList> orderLists = orderDao.getUserOrder(uid);
        List<OrderList> result = new LinkedList<>();
        for(int i = 0; i < orderLists.size(); i++) {
            if((orderLists.get(i).getCreateTime().getTime() - 28800000) > beginTime.getTime() && (orderLists.get(i).getCreateTime().getTime() - 28800000) < endTime.getTime()) {
                result.add(orderLists.get(i));
                System.out.println("get");
            }
        }
        return result;
    }

    @Override
    public List<OrderList> getOrderByBook(String bookname) {
        return orderDao.getOrderByBook(bookname);
    }

    @Override
    public List<OrderList> userGetOrderByBook(String bookname, Integer uid) {
        return orderDao.userGetOrderByBook(bookname, uid);
    }


}
