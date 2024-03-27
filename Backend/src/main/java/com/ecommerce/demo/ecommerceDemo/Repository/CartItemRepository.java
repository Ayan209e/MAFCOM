package com.ecommerce.demo.ecommerceDemo.Repository;

import com.ecommerce.demo.ecommerceDemo.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {

    List<CartItem> findByCartId(int id);

    CartItem findByCartIdAndProductId(Integer id, Integer id1);
}
