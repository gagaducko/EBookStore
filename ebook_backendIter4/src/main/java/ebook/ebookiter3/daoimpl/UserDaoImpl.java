package ebook.ebookiter3.daoimpl;

import ebook.ebookiter3.dao.UserDao;
import ebook.ebookiter3.entity.Book;
import ebook.ebookiter3.entity.User;
import ebook.ebookiter3.repository.UserRepository;
import ebook.ebookiter3.repository.BookRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Slf4j
public class UserDaoImpl implements UserDao{

    @Autowired
    UserRepository userRepository;

    @Autowired
    BookRepository bookRepository;

    @Override
    public User checkUser(String username, String password) {
        return userRepository.checkUser(username, password);
    }

    @Override
    public User checkUserName(String username) {
        return userRepository.checkUserName(username);
    }

    @Override
    public void unBanTheUser(List<Integer> uidList) {
        List<User> userList = userRepository.findAllById(uidList);
        for(User user: userList) {
            user.setType(0);
        }
        System.out.println("the users have been unbanned!");
        userRepository.saveAll(userList);
    }

    @Override
    public void banTheUser(List<Integer> uidList) {
        List<User> userList = userRepository.findAllById(uidList);
        for(User user: userList) {
            user.setType(2);
        }
        System.out.println("the users have been banned");
        userRepository.saveAll(userList);
    }

    @Override
    public List<User> getUserList() {
        return userRepository.findAll();
    }

    @Override
    public User getById(Integer uid) {
        return userRepository.getReferenceById(uid);
    }


    @Override
    public void addUser(User user) {
        userRepository.save(user);
        System.out.println("it have been saved");
    }
}
