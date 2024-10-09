package ebook.ebookiter3.dao;

import ebook.ebookiter3.entity.CartItem;
import ebook.ebookiter3.entity.OrderItem;
import ebook.ebookiter3.entity.OrderList;

import java.util.List;

public interface OrderDao {
    List<OrderList> getAllOrder();

    List<OrderItem> getOneOrder(Integer oid);

    List<OrderList> getOrderByBook(String bookname);

    void addToOrder(List<CartItem> cartItems, Integer uid);

    List<OrderList> getUserOrder(Integer uid);

    List<OrderList> userGetOrderByBook(String bookname_st, Integer uid);
}
