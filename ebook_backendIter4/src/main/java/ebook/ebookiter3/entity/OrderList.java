package ebook.ebookiter3.entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
//import java.security.Timestamp;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "orderList")
public class OrderList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "oid")
    private Integer oid;

    @Column(name = "uid")
    private Integer uid;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "oid", insertable = false, updatable = false)
    private List<OrderItem> orderItems = new ArrayList<>();

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    @CreatedDate
    @Column(name = "createTime")
    private Timestamp createTime;

    public OrderList() {}


    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    public Integer getOid() {
        return oid;
    }

    public Integer getUid() {
        return uid;
    }

    public void setOid(Integer oid) {
        this.oid = oid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

}
