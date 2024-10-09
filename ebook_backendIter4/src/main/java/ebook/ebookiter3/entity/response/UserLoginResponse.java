package ebook.ebookiter3.entity.response;

import ebook.ebookiter3.constant.UserServiceStatus;
import lombok.Data;

@Data
public class UserLoginResponse {
    private UserServiceStatus status;
    private String username;
    private Integer uid;
    private Integer type;
}
