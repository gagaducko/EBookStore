package ebook.ebookiter3.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "CartList")
public class CartList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cid")
    private Integer cid;


    @Column(name = "uid")
    private Integer uid;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "cid", insertable = false, updatable = false)
    private List<CartItem> cartItems = new ArrayList<>();

    public  CartList() {}

    public Integer getCid() {
        return cid;
    }

    public Integer getUid() {
        return uid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }
}
