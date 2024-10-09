package ebook.ebookiter3.entity.request;

import lombok.Data;

@Data
public class UserOrder {
    private Integer uid;
    private String bookname;
    private String time;
}
