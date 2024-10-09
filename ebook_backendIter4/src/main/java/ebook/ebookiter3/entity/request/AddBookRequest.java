package ebook.ebookiter3.entity.request;

import java.math.BigDecimal;
import lombok.Data;

import javax.persistence.Column;

@Data
public class AddBookRequest {
    public Integer bid;
    public String image;
    public String bookname;
    public Integer type;
    public BigDecimal price;
    public String isbn;
    public String author;
    public String description;
    public Integer inventory;
}
