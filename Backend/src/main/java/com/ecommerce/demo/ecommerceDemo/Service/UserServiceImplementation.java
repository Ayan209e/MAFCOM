package com.ecommerce.demo.ecommerceDemo.Service;

import com.ecommerce.demo.ecommerceDemo.Exception.UserException;
import com.ecommerce.demo.ecommerceDemo.Repository.UserRepository;
import com.ecommerce.demo.ecommerceDemo.config.JwtConstant;
import com.ecommerce.demo.ecommerceDemo.dto.ProfileDTO;
import com.ecommerce.demo.ecommerceDemo.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.List;

@Service
public class UserServiceImplementation implements UserService{

    @Autowired
    private UserRepository userRepository;


    @Override
    public User findUserById(Long userId) throws UserException {
        return null;
    }

    @Override
    public ProfileDTO findUserProfileByJwt(String jwt) throws UserException {

        ProfileDTO profileToBeReturned = new ProfileDTO();
        SecretKey key= Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
        Claims claims= Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        String email=String.valueOf(claims.get("email"));
        User user = userRepository.findByEmail(email);
        profileToBeReturned.setEmail(user.getEmail());
        profileToBeReturned.setFirstName(user.getFirstName());
        profileToBeReturned.setLastName(user.getLastName());
        profileToBeReturned.setRole(user.getRole());
        profileToBeReturned.setMobile(user.getMobile());
        return profileToBeReturned;
    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }
}
