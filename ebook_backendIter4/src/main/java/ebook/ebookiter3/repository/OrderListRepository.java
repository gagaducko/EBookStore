package ebook.ebookiter3.repository;

import ebook.ebookiter3.entity.OrderList;
import ebook.ebookiter3.entity.OrderItem;
import ebook.ebookiter3.entity.Book;

import org.hibernate.criterion.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.relational.core.sql.In;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderListRepository extends JpaRepository<OrderList, Integer>{

    @Query(value = "from OrderList where uid = :uid")
    List<OrderList> findByUid(@Param("uid") Integer uid);
    
}
