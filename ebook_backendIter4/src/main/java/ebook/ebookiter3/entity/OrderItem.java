package ebook.ebookiter3.entity;

import org.apache.ibatis.annotations.One;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "OrderItem")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "oidKey")
    private Integer oidKey;


    @Column(name = "oid")
    private Integer oid;

//    @Transient
    @Column(name = "bid")
    private Integer bid;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "bid", insertable = false, updatable = false)
    private Book book;


    @Column(name = "bookNum")
    private Integer bookNum;

    @Column(name = "bookPrice")
    private BigDecimal bookPrice;


    public void setBook(Book book) {
        this.book = book;
    }

    public Book getBook() {
        return book;
    }

    //    @ManyToOne(cascade={CascadeType.MERGE,CascadeType.REFRESH},optional=false)
//    @JoinColumn(name = "oid")
//    private OrderList orderList;

    public OrderItem() {}

    public Integer getBid() {
        return bid;
    }

    public void setBid(Integer bid) {
        this.bid = bid;
    }

    public Integer getBookNum() {
        return bookNum;
    }

    public void setBookNum(Integer bookNum) {
        this.bookNum = bookNum;
    }

    public Integer getOid() {
        return oid;
    }

    public void setOid(Integer oid) {
        this.oid = oid;
    }

    public BigDecimal getBookPrice() {
        return bookPrice;
    }

    public void setBookPrice(BigDecimal bookPrice) {
        this.bookPrice = bookPrice;
    }
}
