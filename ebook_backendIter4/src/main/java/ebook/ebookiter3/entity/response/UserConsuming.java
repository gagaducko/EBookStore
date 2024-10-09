package ebook.ebookiter3.entity.response;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class UserConsuming {
    Integer uid;
    Integer bookNum;
    BigDecimal consuming;
}
