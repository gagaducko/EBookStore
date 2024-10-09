package ebook.ebookiter3.entity.request;

import lombok.Data;

@Data
public class UserLoginRequest {
    private String username;
    private String password;
}
