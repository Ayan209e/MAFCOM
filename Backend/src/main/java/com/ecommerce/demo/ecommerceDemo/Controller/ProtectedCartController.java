package com.ecommerce.demo.ecommerceDemo.Controller;
import com.ecommerce.demo.ecommerceDemo.Repository.UserRepository;
import com.ecommerce.demo.ecommerceDemo.Service.CartService;
import com.ecommerce.demo.ecommerceDemo.Service.ProductService;
import com.ecommerce.demo.ecommerceDemo.config.JwtConstant;
import com.ecommerce.demo.ecommerceDemo.dto.ProductQuantityDTO;
import com.ecommerce.demo.ecommerceDemo.model.Cart;
import com.ecommerce.demo.ecommerceDemo.model.CartItem;
import com.ecommerce.demo.ecommerceDemo.model.Product;
import com.ecommerce.demo.ecommerceDemo.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/cart")
public class ProtectedCartController {
    @Autowired
    private CartService cartService;

    @PostMapping("/add/{id}")
    public List<ProductQuantityDTO> add(@PathVariable("id") Integer id , @RequestHeader("jwt") String jwt){
        return cartService.saveProduct(id, jwt);
    }

    @GetMapping("/getAll")
    public List<ProductQuantityDTO> getAllProduct(@RequestHeader("jwt") String jwt){
        return cartService.getAllProduct(jwt);
    }
    //
    @PutMapping("/delete/{id}")
    public void delete(@PathVariable("id") Integer id ,@RequestHeader("jwt") String jwt){
        cartService.deleteProduct(id, jwt);
    }
}
