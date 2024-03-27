package com.ecommerce.demo.ecommerceDemo.Service;
import com.ecommerce.demo.ecommerceDemo.dto.ProductQuantityDTO;
import com.ecommerce.demo.ecommerceDemo.model.CartItem;
import com.ecommerce.demo.ecommerceDemo.model.Product;

import java.util.List;
import java.util.Map;


public interface CartService {
    public List<ProductQuantityDTO> saveProduct(int id, String jwt);
    public List<ProductQuantityDTO> getAllProduct(String jwt);
    public void deleteProduct(Integer id, String jwt);
}
