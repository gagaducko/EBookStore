package ebook.ebookiter3.entity.response;

import ebook.ebookiter3.constant.UserServiceStatus;
import lombok.Data;

@Data
public class UserRegisterResponse {
    private UserServiceStatus status;
    private String username;
    private String uid;

}
