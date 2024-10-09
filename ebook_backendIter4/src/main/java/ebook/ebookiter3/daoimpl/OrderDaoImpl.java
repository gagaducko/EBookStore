package ebook.ebookiter3.daoimpl;

import ebook.ebookiter3.dao.OrderDao;
import ebook.ebookiter3.entity.CartItem;
import ebook.ebookiter3.entity.OrderItem;
import ebook.ebookiter3.entity.OrderList;

import ebook.ebookiter3.repository.OrderItemRepository;
import ebook.ebookiter3.repository.OrderListRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.LinkedList;
import java.util.List;

@Repository
@Slf4j
public class OrderDaoImpl implements OrderDao{

    @Autowired
    OrderListRepository orderListRepository;

    @Autowired
    OrderItemRepository orderItemRepository;

    @Override
    public List<OrderList> getAllOrder() {
//        System.out.println("now it is get all order now");
        return orderListRepository.findAll();
    }

    @Override
    public List<OrderList> getUserOrder(Integer uid) {
        return orderListRepository.findByUid(uid);
    }

    @Override
    public List<OrderItem> getOneOrder(Integer oid) {
        return orderItemRepository.getByOid(oid);
    }

    @Override
    public void addToOrder(List<CartItem> cartItems, Integer uid) {
        OrderList orderList = new OrderList();
        orderList.setUid(uid);
        OrderList orderList1 = orderListRepository.save(orderList);
        Integer oid = orderList1.getOid();
        for(int i = 0; i < cartItems.size(); i++) {
            OrderItem orderItem = new OrderItem();
            orderItem.setBid(cartItems.get(i).getBid());
            orderItem.setOid(oid);
            orderItem.setBookNum(cartItems.get(i).getBookNum());
            orderItem.setBookPrice(cartItems.get(i).getBook().getPrice());
            orderItemRepository.save(orderItem);
        }
    }

    @Override
    public List<OrderList> getOrderByBook(String bookname) {
        System.out.println("it is time to find book");
        System.out.println(bookname);
        List<OrderList> orderLists = orderListRepository.findAll();
        List<OrderList> finalLists = new LinkedList<>();
        for(int i = 0; i < orderLists.size(); i++) {
            if(orderLists.get(i).getOrderItems().size() > 0) {
                int flag = 0;
                List<OrderItem> orderItems = orderLists.get(i).getOrderItems();
                for(int j = 0; j < orderItems.size(); j++) {
                    if(orderItems.get(j).getBook().getBookname().equals(bookname)) {
                        flag = 1;
                        break;
                    }
                }
                if(flag == 1) {
                    System.out.println(orderItems.get(0).getOid());
                    finalLists.add(orderLists.get(i));
                }
            }
        }
        return finalLists;
    }


    @Override
    public List<OrderList> userGetOrderByBook(String bookname, Integer uid) {
        System.out.println("it is time to find book");
        System.out.println(bookname);
        List<OrderList> orderLists = orderListRepository.findByUid(uid);
        List<OrderList> finalLists = new LinkedList<>();
        for(int i = 0; i < orderLists.size(); i++) {
            if(orderLists.get(i).getOrderItems().size() > 0) {
                int flag = 0;
                List<OrderItem> orderItems = orderLists.get(i).getOrderItems();
                for(int j = 0; j < orderItems.size(); j++) {
                    if(orderItems.get(j).getBook().getBookname().equals(bookname)) {
                        flag = 1;
                        break;
                    }
                }
                if(flag == 1) {
                    System.out.println(orderItems.get(0).getOid());
                    finalLists.add(orderLists.get(i));
                }
            }
        }
        return finalLists;
    }




}
