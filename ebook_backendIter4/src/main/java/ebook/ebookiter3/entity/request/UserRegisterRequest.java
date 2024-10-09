package ebook.ebookiter3.entity.request;

import lombok.Data;

@Data
public class UserRegisterRequest {
    private String username;
    private String password;
    private String userEmail;
}
