package ebook.ebookiter3.service;

import ebook.ebookiter3.entity.User;
import ebook.ebookiter3.entity.response.UserConsuming;
import ebook.ebookiter3.entity.response.UserConsumingForThemselves;
import ebook.ebookiter3.entity.response.UserLoginResponse;
import ebook.ebookiter3.entity.response.UserRegisterResponse;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.util.List;

public interface UserService {

//    User checkUser(String username, String password);

    void banUsers(Integer uid);

    void unBanUsers(Integer uid);

    UserLoginResponse userLogin(String username, String password, HttpServletRequest request);

    UserRegisterResponse userRegister(String username, String password, String userEmail);

    List<User> getUserList();

    List<UserConsuming> getUserConsumingList(Timestamp beginTime, Timestamp endTime);

    void addUser(User user);

    UserConsumingForThemselves getUserBuy(Integer uid, Timestamp beginTime, Timestamp endTime);
}
