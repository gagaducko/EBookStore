package ebook.ebookiter3.repository;

import ebook.ebookiter3.entity.CartList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CartListRepository  extends JpaRepository<CartList, Integer> {
    @Query(value = "from CartList where uid = :uid")
    CartList findByUid(@Param("uid") Integer uid);
}
