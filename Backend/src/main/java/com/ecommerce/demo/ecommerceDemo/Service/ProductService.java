package com.ecommerce.demo.ecommerceDemo.Service;
import com.ecommerce.demo.ecommerceDemo.model.Product;

import java.util.List;


public interface ProductService {
    public List<Product> saveProduct(Product product);
    public List<Product> getAllProduct();
    public boolean deleteProduct(Integer id);
    public boolean updateProduct(int id, String newName,int price,String link,String description,String category);
    public Product getProductById(int id);
}
