package com.ecommerce.demo.ecommerceDemo.Controller;
import com.ecommerce.demo.ecommerceDemo.Service.ProductService;
import com.ecommerce.demo.ecommerceDemo.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/product")
public class ProtectedProductController {
    @Autowired
    private ProductService productService;

    @PostMapping("/add")
    public List<Product> add(@RequestBody Product product){
        return productService.saveProduct(product);
    }

    @GetMapping("/getAll")
    public List<Product> getAllProduct(){
        return productService.getAllProduct();
    }
//
    @PutMapping("/delete")
    public boolean delete(@RequestBody Product product){
        return productService.deleteProduct(product.getId());
    }
//    public String deleteStudent(@RequestBody int id){
//        return 'hg';
//    }

    @PutMapping("/edit")
    public boolean update(@RequestBody Product product){
        return productService.updateProduct(product.getId(), product.getName(), product.getPrice(), product.getLink(), product.getDescription(), product.getCategory());
    }
}
