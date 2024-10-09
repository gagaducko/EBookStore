package ebook.ebookiter3.repository;

import ebook.ebookiter3.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.relational.core.sql.In;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {
    @Query(value = "from Book where bookname = :bookname")
    Book findByBookName(@Param("bookname") String bookname);
}
