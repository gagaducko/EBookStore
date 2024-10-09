package ebook.ebookiter3.dao;

import ebook.ebookiter3.entity.CartItem;
import ebook.ebookiter3.entity.CartList;

import java.util.List;

public interface CartDao {

    void makeCartList(Integer uid);

    CartList getCartList(Integer uid);

    CartItem getCartItem(Integer cid, Integer bid);

    void addToCart(Integer bid, Integer uid);

    List<CartItem> getCart(Integer cid);

    void deleteCart(Integer cid);
}
