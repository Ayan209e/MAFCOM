package com.ecommerce.demo.ecommerceDemo.Service;
import com.ecommerce.demo.ecommerceDemo.Exception.UserException;
import com.ecommerce.demo.ecommerceDemo.dto.ProfileDTO;
import com.ecommerce.demo.ecommerceDemo.model.User;

import java.util.List;


public interface UserService {

    User findUserById(Long userId) throws UserException;


    ProfileDTO findUserProfileByJwt(String jwt) throws UserException;


    List<User> getAllUser();
}
