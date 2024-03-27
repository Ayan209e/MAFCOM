package com.ecommerce.demo.ecommerceDemo.Service;
import com.ecommerce.demo.ecommerceDemo.Repository.ProductRepository;
import com.ecommerce.demo.ecommerceDemo.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class ProductServiceImpl implements  ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> saveProduct(Product product) {
        if(product ==null) throw new NullPointerException();
        productRepository.save(product);
        return productRepository.findAll();
    }

    @Override
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }


    @Override
    public boolean deleteProduct(Integer id){
        if(id==null){
            throw new NullPointerException();
        }
        Optional<Product> p=productRepository.findById(id);
        if(p.isPresent()){
            productRepository.deleteById(id);
            return true;
        }
        else {
            throw new RuntimeException("notFound");
        }
    }

    @Override
    public boolean updateProduct(int id, String newName, int price, String link, String description,String category) {
        Optional<Product> optionalProduct = productRepository.findById(id);

        if(id<0) throw new RuntimeException("Id must be positive");
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setName(newName);
            product.setDescription(description);
            product.setPrice(price);
            product.setLink(link);
            product.setCategory(category);
            productRepository.save(product);
            return true;
        } else {
            throw  new RuntimeException("Product Not Found");
        }
    }


    @Override
    public Product getProductById(int id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            return optionalProduct.get();
        } else {
            throw new RuntimeException("Product Not Found");
        }
    }

}
