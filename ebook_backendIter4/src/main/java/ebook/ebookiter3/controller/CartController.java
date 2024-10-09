package ebook.ebookiter3.controller;

import ebook.ebookiter3.entity.CartBook;
import ebook.ebookiter3.entity.CartItem;
import ebook.ebookiter3.service.BookService;
import ebook.ebookiter3.service.CartService;
import ebook.ebookiter3.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    CartService cartService;

    @Autowired
    BookService bookService;

    @Autowired
    OrderService orderService;

    @PostMapping("/showCart")
    public List<CartBook> showCart(@RequestBody Integer uid) {
        List<CartItem> cartItems = cartService.showCart(uid);
        List<CartBook> cartBooks = new LinkedList<>();
        for(int i = 0; i < cartItems.size(); i++) {
            CartBook cartBook = new CartBook();
            cartBook.setCartItem(cartItems.get(i));
            cartBook.setBook(cartItems.get(i).getBook());
            cartBooks.add(cartBook);
        }
        return cartBooks;
    }

    @PostMapping("/cartToOrder")
    public void cartToOrder(@RequestBody Integer uid) {
        List<CartItem> cartItems = cartService.showCart(uid);
        bookService.cutInventory(cartItems);
        cartService.deleteCart(uid);
        orderService.addToOrder(cartItems, uid);
    }

}
