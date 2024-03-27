package com.ecommerce.demo.ecommerceDemo.Repository;
import com.ecommerce.demo.ecommerceDemo.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    Cart findByUserId(Long id);
}
