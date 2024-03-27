package com.ecommerce.demo.ecommerceDemo.Controller;
import com.ecommerce.demo.ecommerceDemo.dto.UserDto;
import com.ecommerce.demo.ecommerceDemo.Exception.UserException;
import com.ecommerce.demo.ecommerceDemo.Repository.UserRepository;
import com.ecommerce.demo.ecommerceDemo.Service.CustomUserServiceImplementation;
import com.ecommerce.demo.ecommerceDemo.config.JwtProvider;
import com.ecommerce.demo.ecommerceDemo.model.User;
import com.ecommerce.demo.ecommerceDemo.request.LoginRequest;
import com.ecommerce.demo.ecommerceDemo.response.AuthResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
public class AuthController {
    private UserRepository userRepository;
    private JwtProvider jwtProvider;
    private PasswordEncoder passwordEncoder;
    private CustomUserServiceImplementation customUserServiceImplementation;


    public AuthController(UserRepository userRepository,CustomUserServiceImplementation customUserServiceImplementation,PasswordEncoder passwordEncoder,JwtProvider jwtProvider){
        this.userRepository=userRepository;
        this.customUserServiceImplementation=customUserServiceImplementation;
        this.passwordEncoder=passwordEncoder;
        this.jwtProvider=jwtProvider;
    }


    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUser(@RequestBody UserDto user) throws UserException {
        String email=user.getEmail();
        String password=user.getPassword();
        String firstName=user.getFirstName();
        String lastName=user.getLastName();
        String mobile=user.getMobile();


        User isEmailExist=userRepository.findByEmail(email);


        if(isEmailExist!=null){
            throw new UserException("Email Is Already Used With Another Account");
        }


        User createdUser=new User();
        createdUser.setEmail(email);
        createdUser.setPassword(passwordEncoder.encode(password));
        createdUser.setFirstName(firstName);
        createdUser.setLastName(lastName);
        createdUser.setMobile(mobile);
        createdUser.setRole("Customer");


        User savedUser= userRepository.save(createdUser);


        Authentication authentication=new UsernamePasswordAuthenticationToken(email,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token=jwtProvider.generateToken(authentication);
        AuthResponse authResponse=new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("SignUp Success");
        authResponse.setRole(savedUser.getRole());


        return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
    }


    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        String username=loginRequest.getEmail();
        String password=loginRequest.getPassword();


        Authentication authentication=authenticate(username,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);
        AuthResponse authResponse=new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("SignIn Success");
        User user=userRepository.findByEmail(username);
        authResponse.setRole(user.getRole());


        return new ResponseEntity<AuthResponse>(authResponse,HttpStatus.CREATED);
    }


    @ExceptionHandler(BadCredentialsException.class)
    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = customUserServiceImplementation.loadUserByUsername(username);


        if(userDetails==null){
            throw new BadCredentialsException("Invalid Username...");
        }


        if(!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid Password...");
        }


        return new UsernamePasswordAuthenticationToken( userDetails,null,userDetails.getAuthorities());
    }
}
