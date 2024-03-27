package com.ecommerce.demo.ecommerceDemo.Controller;

import com.ecommerce.demo.ecommerceDemo.Exception.UserException;
import com.ecommerce.demo.ecommerceDemo.Service.UserService;
import com.ecommerce.demo.ecommerceDemo.dto.ProfileDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class ProtectedProfileController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ProfileDTO profile(@RequestHeader(name = "jwt") String jwt) throws UserException {
        return userService.findUserProfileByJwt(jwt);
    }
}
