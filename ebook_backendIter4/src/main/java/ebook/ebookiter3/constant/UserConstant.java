package ebook.ebookiter3.constant;

public interface UserConstant {
    /**
     * 用户登录态
     */
    String USER_LOGIN_STATE = "userLoginState";
    /**
     * 权限： 默认权限：0， 管理员权限： 1  被ban了的用户是2
     */
    int USER_ROLE = 0;
    int ADMIN_ROLE = 1;
    int BAN_ROLE = 2;
}
