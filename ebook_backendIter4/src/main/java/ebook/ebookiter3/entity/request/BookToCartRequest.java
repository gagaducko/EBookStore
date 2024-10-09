package ebook.ebookiter3.entity.request;


import lombok.Data;

@Data
public class BookToCartRequest {
    public Integer bid;
    public Integer uid;
}
