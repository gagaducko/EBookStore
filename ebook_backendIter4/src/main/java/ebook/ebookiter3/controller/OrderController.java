package ebook.ebookiter3.controller;

import ebook.ebookiter3.entity.OrderItem;
import ebook.ebookiter3.entity.OrderList;
import ebook.ebookiter3.entity.request.UserOrder;
import ebook.ebookiter3.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping("/allOrder")
    public List<OrderList> getAllOrder() {
        return orderService.getAllOrder();
    }

    @PostMapping("/userOrder")
    public List<OrderList> getUserOrder(@RequestBody Integer uid) {
        return orderService.geUserOrder(uid);
    }

    @PostMapping("/getAOrder")
    public List<OrderItem> getOneOrder(@RequestBody Integer oid) {
        System.out.println("now is get a order");
        return orderService.getOneOrder(oid);
    }

    @PostMapping("/userFindOrderByBook")
    public List<OrderList> getOrderByBook(@RequestBody UserOrder userOrder) {
        String bookname = userOrder.getBookname();
        Integer uid = userOrder.getUid();
        return orderService.userGetOrderByBook(bookname, uid);
    }


    @PostMapping("/userGetTimeOrder")
    public List<OrderList> getTimeOrder(@RequestBody UserOrder userOrder) {
        System.out.println("stop for a while");
        Integer uid = userOrder.getUid();
        System.out.println("the uid is" + uid);
        String time = userOrder.getTime();
        String str= time.replace("\"", "");
        String [] timeArray = str.split(",");
        System.out.println(timeArray[0]);
        System.out.println(timeArray[1]);
        Timestamp beginTime = Timestamp.valueOf(timeArray[0]);
        Timestamp endTime = Timestamp.valueOf(timeArray[1]);
        return orderService.getUserTimeOrder(beginTime, endTime, uid);
    }
}
