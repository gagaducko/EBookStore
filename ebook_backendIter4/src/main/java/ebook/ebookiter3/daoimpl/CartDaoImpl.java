package ebook.ebookiter3.daoimpl;

import ebook.ebookiter3.dao.CartDao;
import ebook.ebookiter3.entity.CartItem;
import ebook.ebookiter3.entity.CartList;
import ebook.ebookiter3.repository.CartItemRepository;
import ebook.ebookiter3.repository.CartListRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Slf4j
public class CartDaoImpl implements CartDao {
    @Autowired
    CartListRepository cartListRepository;

    @Autowired
    CartItemRepository cartItemRepository;

    @Override
    public void makeCartList(Integer uid) {
        CartList cartList = new CartList();
        cartList.setUid(uid);
        cartListRepository.save(cartList);
    }

    @Override
    public CartList getCartList(Integer uid) {
        return cartListRepository.findByUid(uid);
    }

    @Override
    public CartItem getCartItem(Integer cid, Integer bid) {
        return cartItemRepository.findByUaB(cid, bid);
    }

    @Override
    public List<CartItem> getCart(Integer cid) {
        return cartItemRepository.findByCid(cid);
    }

    @Override
    public void deleteCart(Integer cid) {
        cartItemRepository.deleteByUid(cid);
    }

    @Override
    public void addToCart(Integer bid, Integer uid) {
        if(getCartList(uid) == null) {
            makeCartList(uid);
        }
        CartList cartList = getCartList(uid);
        Integer cid = cartList.getCid();
        System.out.println("this is cid");
        System.out.println(cid);
        CartItem cartItem = new CartItem();
        cartItem.setBid(bid);
        cartItem.setCid(cid);
        if(getCartItem(cid, bid) == null) {
            System.out.println("now is buying a new book");
            cartItem.setBookNum(1);
            cartItemRepository.save(cartItem);
        } else {
            CartItem cartItem1 = getCartItem(cid, bid);
            Integer bookNum = cartItem1.getBookNum() + 1;
            Integer cidKey = cartItem1.getCidKey();
            cartItem.setBookNum(bookNum);
            cartItem.setCidKey(cidKey);
            cartItemRepository.save(cartItem);
        }
    }
}
