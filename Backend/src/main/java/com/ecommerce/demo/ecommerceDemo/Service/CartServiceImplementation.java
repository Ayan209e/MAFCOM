package com.ecommerce.demo.ecommerceDemo.Service;
import com.ecommerce.demo.ecommerceDemo.Repository.CartItemRepository;
import com.ecommerce.demo.ecommerceDemo.Repository.CartRepository;
import com.ecommerce.demo.ecommerceDemo.Repository.ProductRepository;
import com.ecommerce.demo.ecommerceDemo.Repository.UserRepository;
import com.ecommerce.demo.ecommerceDemo.config.JwtConstant;
import com.ecommerce.demo.ecommerceDemo.model.Cart;
import com.ecommerce.demo.ecommerceDemo.model.CartItem;
import com.ecommerce.demo.ecommerceDemo.model.Product;
import com.ecommerce.demo.ecommerceDemo.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import com.ecommerce.demo.ecommerceDemo.dto.ProductQuantityDTO;

import javax.crypto.SecretKey;
import java.util.*;

@Service
public class CartServiceImplementation implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<ProductQuantityDTO> saveProduct(int id, String jwt) {
        SecretKey key= Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
        Claims claims= Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        String email=String.valueOf(claims.get("email"));
        User user = userRepository.findByEmail(email);

        Cart cart = user.getCart();
        if(cart==null){
            cart = new Cart();
            cart.setUser(user);
            cartRepository.save(cart);
            user.setCart(cart);
            userRepository.save(user);
        }

        CartItem existingCartItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), id);
        if(existingCartItem!=null){
            existingCartItem.setQuantity(existingCartItem.getQuantity()+1);
            cartItemRepository.save(existingCartItem);
        }
        else{
            Optional<Product> optionalProduct = productRepository.findById(id);
            if(optionalProduct.get()!=null){
                CartItem newCartItem = new CartItem();
                newCartItem.setCart(cart);
                newCartItem.setProduct(optionalProduct.get());
                cartItemRepository.save(newCartItem);
            }
        }
        return getAllProduct(jwt);
    }

    @Override
    public List<ProductQuantityDTO> getAllProduct(String jwt) {
        List<ProductQuantityDTO> productsInCart = new ArrayList<>();
        SecretKey key= Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
        Claims claims= Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        String email=String.valueOf(claims.get("email"));
        User user = userRepository.findByEmail(email);

        Cart cart = user.getCart();
        if (cart == null) {
            return productsInCart;
        }

        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());
        if (cartItems.isEmpty()) {
            return productsInCart;
        }

        // Extract the products from the cart items
//        List<Product> productsInCart = new ArrayList<>();
        for (CartItem cartItem : cartItems) {
            Product product = cartItem.getProduct();
            int quantity = cartItem.getQuantity();
            int total = product.getPrice()*quantity;
            if(quantity!=0){
                ProductQuantityDTO dto = new ProductQuantityDTO(product.getId(), product.getName(), product.getDescription(), product.getPrice(), product.getLink(), product.getCategory(), quantity, total);
                productsInCart.add(dto);
            }
            if(quantity==0){
                cartItemRepository.deleteById(cartItem.getId());
            }
        }

        return productsInCart;
    }

    @Override
    public void deleteProduct(Integer id, String jwt) {
        SecretKey key= Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
        Claims claims= Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        String email=String.valueOf(claims.get("email"));
        User user = userRepository.findByEmail(email);
        Cart cart = cartRepository.findByUserId(user.getId());
        if (cart == null) {
            return;
        }


        CartItem cartItem = cartItemRepository.findByCartIdAndProductId(cart.getId(),id);
        if (cartItem == null) {
            return;
        }
        int newQuantity = cartItem.getQuantity() - 1;
        if (newQuantity < 0) {
            List<CartItem> temp = new ArrayList<>(cart.getCartItems());
            cartItemRepository.deleteById(cartItem.getId());
            temp.remove(cartItem);
            cart.setCartItems(temp);
        } else {
            cartItem.setQuantity(newQuantity);
            cartItemRepository.save(cartItem);
        }

        // Save the updated cart
        cartRepository.save(cart);
    }
}
