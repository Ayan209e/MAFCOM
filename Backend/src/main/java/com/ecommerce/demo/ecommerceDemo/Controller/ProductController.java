package com.ecommerce.demo.ecommerceDemo.Controller;

//import com.ecommerce.demo.ecommerceDemo.Service.UserService;
import com.ecommerce.demo.ecommerceDemo.Service.ProductService;
import com.ecommerce.demo.ecommerceDemo.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


//@CrossOrigin(origins ="http://10.244.161.208:3000")
@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/getAll")
    public List<Product> getAllProduct(){
        return productService.getAllProduct();
    }

    @GetMapping("/get/{id}")
    public Product getProductById(@PathVariable("id") Integer id){
        Product p=productService.getProductById(id);
        return p;
    }
}
