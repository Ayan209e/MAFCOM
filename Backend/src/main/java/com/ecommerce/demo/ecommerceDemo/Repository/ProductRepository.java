package com.ecommerce.demo.ecommerceDemo.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.demo.ecommerceDemo.model.Product;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {
}
