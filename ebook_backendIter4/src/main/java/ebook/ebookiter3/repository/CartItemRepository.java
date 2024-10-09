package ebook.ebookiter3.repository;

import ebook.ebookiter3.entity.Book;
import ebook.ebookiter3.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface CartItemRepository  extends JpaRepository<CartItem, Integer>  {
    @Query(value = "from CartItem where cid = :cid and bid = :bid")
    CartItem findByUaB(@Param("cid") Integer cid, @Param("bid") Integer bid);

    @Query(value = "from CartItem  where cid =:cid")
    List<CartItem> findByCid(@Param("cid") Integer cid);

    @Transactional
    @Modifying
    @Query(value = "delete from CartItem where cid = :cid")
    void deleteByUid(@Param("cid") Integer cid);
}
