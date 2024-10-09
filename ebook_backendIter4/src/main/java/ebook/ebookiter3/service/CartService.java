package ebook.ebookiter3.service;

import ebook.ebookiter3.entity.CartItem;

import java.util.List;

public interface CartService {
    List<CartItem> showCart(Integer uid);

    void deleteCart(Integer uid);
}
