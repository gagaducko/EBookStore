package ebook.ebookiter3.entity;

import javax.persistence.*;


@Entity
@Table(name = "CartItem")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cidKey")
    private Integer cidKey;

    @Column(name = "cid")
    public Integer cid;

    @Column(name = "bid")
    public Integer bid;

    @Column(name = "bookNum")
    public Integer bookNum;


    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "bid", insertable = false, updatable = false)
    private Book book;

    public void setBook(Book book) {
        this.book = book;
    }

    public Book getBook() {
        return book;
    }

    public void setCidKey(Integer cidKey) {
        this.cidKey = cidKey;
    }


    public Integer getCidKey() {
        return cidKey;
    }

    public CartItem() {}

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

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
}
