package ebook.ebookiter3.serviceimpl;

import ebook.ebookiter3.dao.CartDao;
import ebook.ebookiter3.entity.CartItem;
import ebook.ebookiter3.repository.CartItemRepository;
import ebook.ebookiter3.service.CartService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Slf4j
public class CartServiceImpl implements CartService {
    @Autowired
    CartDao cartDao;

    @Override
    public List<CartItem> showCart(Integer uid) {
        Integer cid = cartDao.getCartList(uid).getCid();
        return cartDao.getCart(cid);
    }

    @Override
    public void deleteCart(Integer uid) {
        Integer cid = cartDao.getCartList(uid).getCid();
        cartDao.deleteCart(cid);
    }

}
