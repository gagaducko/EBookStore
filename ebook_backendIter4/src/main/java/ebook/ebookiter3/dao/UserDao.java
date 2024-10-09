package ebook.ebookiter3.dao;

import ebook.ebookiter3.entity.Book;
import ebook.ebookiter3.entity.User;

import java.util.List;

public interface UserDao {
    User checkUser(String username, String password);

    User checkUserName(String username);

    void banTheUser(List<Integer> uidList);

    void unBanTheUser(List<Integer> uidList);

    List<User> getUserList();

    User getById(Integer uid);

    void addUser(User user);
}
