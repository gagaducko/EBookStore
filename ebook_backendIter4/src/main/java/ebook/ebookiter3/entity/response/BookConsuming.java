package ebook.ebookiter3.entity.response;

import ebook.ebookiter3.entity.Book;
import lombok.Data;

@Data
public class BookConsuming {
    Book book;
    Integer consuming;
}
