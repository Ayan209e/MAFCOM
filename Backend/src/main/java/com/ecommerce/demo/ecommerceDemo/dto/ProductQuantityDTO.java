package com.ecommerce.demo.ecommerceDemo.dto;
import com.ecommerce.demo.ecommerceDemo.model.Product;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductQuantityDTO {

    private int id;

    private String name;

    private String description;

    private int price;

    private String link;

    private String category;

    private int quantity;

    private int total;

    // Constructor, getters, and setters
}
