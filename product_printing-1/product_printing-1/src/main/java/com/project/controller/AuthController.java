package com.project.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.config.JwtProvider;
import com.project.emailSender.EmailSenderService;
import com.project.exception.UserException;
import com.project.model.Cart;
import com.project.model.User;
import com.project.repository.UserRepository;
import com.project.request.ForgetPassword;
import com.project.request.LoginRequest;
import com.project.responce.AuthResponce;
import com.project.service.CartService;
import com.project.service.CustomUserServiceImplementation;
import com.project.service.UserServiceImplementation;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private JwtProvider jwtProvider;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private CustomUserServiceImplementation customUserService;
	@Autowired
	private CartService cartService;
	@Autowired
	private EmailSenderService emailSenderService;
	@Autowired
	private UserServiceImplementation userServiceImplementation;

	@PostMapping("/signup_request")
	public ResponseEntity<AuthResponce> createUserRequest(@RequestBody User user)
			throws UserException, MessagingException {

		userServiceImplementation.createUser(user);
		return null;

	}

	@PutMapping("/verify-account")
	public ResponseEntity<AuthResponce> verifyAccount(@RequestBody User user) throws MessagingException {
		
		
		boolean verifyAccount = userServiceImplementation.verifyAccount(user.getEmail(), user.getOtp());
		
		if(verifyAccount) {
			User createdUser = userRepository.findByEmail(user.getEmail());

			if (createdUser.isActive()) {

				String email1 = user.getEmail();
				String password = user.getPassword();
				String firstName = user.getFirstName();
				String lastName = user.getLastName();

//				User isEmailExist = userRepository.findByEmail(email);
	//
//				if (isEmailExist != null) {
//					throw new UserException("Email Is Already Used With Another Account");
	//
//				}

				createdUser.setEmail(email1);
				createdUser.setPassword(passwordEncoder.encode(password));
				createdUser.setFirstName(firstName);
				createdUser.setLastName(lastName);
				createdUser.setCreatedAt(LocalDateTime.now());

				String htmlContent = "<p>Dear " + createdUser.getFirstName() + ",</p>"
						+ "<p>Thank you for creating an account on our website.</p>" + "<p>Your account details:</p>"
						+ "<ul>" + "<li>First Name: " + createdUser.getFirstName() + "</li>" + "<li>Last Name: "
						+ createdUser.getLastName() + "</li>" + "<li>Email: " + createdUser.getEmail() + "</li>"
						+ "<li>Created At: " + createdUser.getCreatedAt() + "</li>" + "</ul>"
						+ "<p>Best regards,<br/>Welcome to the product printing Community</p>";

				User savedUser = userRepository.save(createdUser);

				emailSenderService.sendSimpleEmail(email1, "Account Activation at Product Printing", htmlContent);

				Cart cart = cartService.createCart(savedUser);
				Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(),
						savedUser.getPassword());
				SecurityContextHolder.getContext().setAuthentication(authentication);

				String token = jwtProvider.generateToken(authentication);

				AuthResponce authResponce = new AuthResponce();
				authResponce.setJwt(token);
				authResponce.setMessage("Signup Success");

				return new ResponseEntity<AuthResponce>(authResponce, HttpStatus.CREATED);
			} else {
				return new ResponseEntity<AuthResponce>(HttpStatus.BAD_REQUEST);
			}

			
		}
		return new ResponseEntity<AuthResponce>(HttpStatus.BAD_REQUEST);
		
		
		
	}

	@PutMapping("/regenerate-otp")
	public ResponseEntity<String> regenerateOtp(@RequestParam String email) {
		return new ResponseEntity<>(userServiceImplementation.regenerateOtp(email), HttpStatus.OK);
	}

	@PostMapping("/forget")
	public ResponseEntity<String> forgetPassword(@RequestBody ForgetPassword forgetPassword) throws UserException {

		return new ResponseEntity<>(userServiceImplementation.forgetPasssword(forgetPassword.getEmail()),
				HttpStatus.OK);

	}

	@PutMapping("/verify-forget")
	public ResponseEntity<String> verifyForget(@RequestBody ForgetPassword forgetPassword) {
		return new ResponseEntity<>(userServiceImplementation.verifyForget(forgetPassword.getEmail(),
				forgetPassword.getOtp(), forgetPassword.getPassword()), HttpStatus.OK);
	}
	
	@PutMapping("/regenerate-forget")
	public ResponseEntity<String> regenerateOtp(@RequestBody ForgetPassword forgetPassword) {
		return new ResponseEntity<>(userServiceImplementation.regenerateOtp(forgetPassword.getEmail()), HttpStatus.OK);
	}

	@PostMapping("/signup")
	public ResponseEntity<AuthResponce> createUserHandler(@RequestBody User user)
			throws UserException, MessagingException {

		User createdUser = userRepository.findByEmail(user.getEmail());

		if (createdUser.isActive()) {

			String email = user.getEmail();
			String password = user.getPassword();
			String firstName = user.getFirstName();
			String lastName = user.getLastName();

//			User isEmailExist = userRepository.findByEmail(email);
//
//			if (isEmailExist != null) {
//				throw new UserException("Email Is Already Used With Another Account");
//
//			}

			createdUser.setEmail(email);
			createdUser.setPassword(passwordEncoder.encode(password));
			createdUser.setFirstName(firstName);
			createdUser.setLastName(lastName);
			createdUser.setCreatedAt(LocalDateTime.now());

			String htmlContent = "<p>Dear " + createdUser.getFirstName() + ",</p>"
					+ "<p>Thank you for creating an account on our website.</p>" + "<p>Your account details:</p>"
					+ "<ul>" + "<li>First Name: " + createdUser.getFirstName() + "</li>" + "<li>Last Name: "
					+ createdUser.getLastName() + "</li>" + "<li>Email: " + createdUser.getEmail() + "</li>"
					+ "<li>Created At: " + createdUser.getCreatedAt() + "</li>" + "</ul>"
					+ "<p>Best regards,<br/>Welcome to the product printing Community</p>";

			User savedUser = userRepository.save(createdUser);

			emailSenderService.sendSimpleEmail(email, "Account Activation at Product Printing", htmlContent);

			Cart cart = cartService.createCart(savedUser);
			Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(),
					savedUser.getPassword());
			SecurityContextHolder.getContext().setAuthentication(authentication);

			String token = jwtProvider.generateToken(authentication);

			AuthResponce authResponce = new AuthResponce();
			authResponce.setJwt(token);
			authResponce.setMessage("Signup Success");

			return new ResponseEntity<AuthResponce>(authResponce, HttpStatus.CREATED);
		} else {
			return new ResponseEntity<AuthResponce>(HttpStatus.BAD_REQUEST);
		}

	}

	@PostMapping("/signin")
	public ResponseEntity<AuthResponce> loginUserHandler(@RequestBody LoginRequest loginRequest) throws UserException {

		String username = loginRequest.getEmail();
		String password = loginRequest.getPassword();

		Authentication authentication = authenticate(username, password);

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtProvider.generateToken(authentication);

		AuthResponce authResponce = new AuthResponce();
		authResponce.setJwt(token);
		authResponce.setMessage("Signin Success");

		return new ResponseEntity<AuthResponce>(authResponce, HttpStatus.CREATED);
	}

	private Authentication authenticate(String username, String password) {
		UserDetails userDetails = customUserService.loadUserByUsername(username);

		if (userDetails == null) {
			throw new BadCredentialsException("Invalid Username...");
		}

		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid Password...");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}
}
