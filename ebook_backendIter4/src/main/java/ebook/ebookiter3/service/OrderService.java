package ebook.ebookiter3.service;

import ebook.ebookiter3.entity.*;

import java.sql.Timestamp;
import java.util.List;

public interface OrderService {
    List<OrderList> getAllOrder();

    List<OrderItem> getOneOrder(Integer oid);

    List<OrderList> getOrderByBook(String bookname);

    List<OrderList> getTimeOrder(Timestamp beginTime, Timestamp endTime);

    void addToOrder(List<CartItem> cartItems, Integer uid);

    List<OrderList> geUserOrder(Integer uid);

    List<OrderList> userGetOrderByBook(String bookname_st, Integer uid);

    List<OrderList> getUserTimeOrder(Timestamp beginTime, Timestamp endTime, Integer uid);
}
