package com.ecommerce.demo.ecommerceDemo.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private String mobile;
}
