package ebook.ebookiter3.entity.response;

import ebook.ebookiter3.entity.Book;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class UserConsumingForThemselves {
    private List<BookConsuming> bookConsumingList;
    private BigDecimal consuming;
    private Integer bookNum;
}
