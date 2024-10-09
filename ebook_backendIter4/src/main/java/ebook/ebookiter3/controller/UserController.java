package ebook.ebookiter3.controller;

import ebook.ebookiter3.entity.User;
import ebook.ebookiter3.entity.request.UserLoginRequest;
import ebook.ebookiter3.entity.request.UserOrder;
import ebook.ebookiter3.entity.request.UserRegisterRequest;
import ebook.ebookiter3.entity.response.UserConsumingForThemselves;
import ebook.ebookiter3.entity.response.UserLoginResponse;
import ebook.ebookiter3.entity.response.UserRegisterResponse;
import ebook.ebookiter3.service.UserService;
import ebook.ebookiter3.constant.UserServiceStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    @Resource
    private UserService userService;

    @PostMapping("/login")
    public UserLoginResponse userLogin(@RequestBody UserLoginRequest userLoginRequest, HttpServletRequest request) {
        System.out.println("now it is on login");
        if(userLoginRequest == null) {
            return null;
        }
        String username = userLoginRequest.getUsername();
        String password = userLoginRequest.getPassword();
        return userService.userLogin(username, password, request);
    }

    @PostMapping("/register")
    public UserRegisterResponse userRegister(@RequestBody UserRegisterRequest userRegisterRequest, HttpServletRequest request) {
        System.out.println("now it is on register");
        if(userRegisterRequest == null) {
            return null;
        }
        String username = userRegisterRequest.getUsername();
        String password = userRegisterRequest.getPassword();
        String userEmail = userRegisterRequest.getUserEmail();
        UserRegisterResponse userRegisterResponse = userService.userRegister(username, password, userEmail);
        if(userRegisterResponse == null) {
            return null;
        }
        if(userRegisterResponse.getStatus() == UserServiceStatus.USER_ALL_OK) {
            User user = new User();
            user.setUsername(username);
            user.setPassword(password);
            user.setType(0);
            user.setEmail(userEmail);
            userService.addUser(user);
        }
        return userRegisterResponse;
    }

    @PostMapping("/userBuy")
    public UserConsumingForThemselves userBuy(@RequestBody UserOrder userOrder) {
        System.out.println("it is time to userconthem");
        Integer uid = userOrder.getUid();
        String time = userOrder.getTime();
        String str= time.replace("\"", "");
        String [] timeArray = str.split(",");
        System.out.println(timeArray[0]);
        System.out.println(timeArray[1]);
        Timestamp beginTime = Timestamp.valueOf(timeArray[0]);
        Timestamp endTime = Timestamp.valueOf(timeArray[1]);
        return userService.getUserBuy(uid, beginTime, endTime);
    }
}
