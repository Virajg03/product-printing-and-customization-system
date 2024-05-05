package com.project.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.config.JwtProvider;
import com.project.emailSender.EmailSenderService;
import com.project.exception.UserException;
import com.project.model.Address;
import com.project.model.User;
import com.project.repository.AddressRepository;
import com.project.repository.UserRepository;

import jakarta.mail.MessagingException;

@Service
public class UserServiceImplementation implements UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private JwtProvider jwtProvider;
	@Autowired
	private EmailSenderService emailSenderService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private AddressRepository addressRepository;

	@Override
	public User findUserById(Long userId) throws Exception {
		Optional<User> user = userRepository.findById(userId);
		if (user.isPresent()) {
			return user.get();
		}
		throw new UserException("user not found with id :" + userId);
	}

	@Override
	public User findUserProfileByJwt(String jwt) throws Exception {
		String email = jwtProvider.getEmailFromToken(jwt);

		User user = userRepository.findByEmail(email);

		if (user == null) {
			throw new UserException("user not found with email : " + email);

		}

		return user;
	}

	public User createUser(User user) throws UserException {

		try {

			User isEmailExist = userRepository.findByEmail(user.getEmail());

			if (isEmailExist != null) {
				throw new UserException("Email Is Already Used With Another Account");

			}

			String otp = emailSenderService.generateOtp();
			emailSenderService.sendOtpEmail(user.getEmail(), otp);
			user.setOtp(otp);
			user.setOtpGeneratedTime(LocalDateTime.now());
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			throw new RuntimeException("Unable to send otp please try again");
		}
		return userRepository.save(user);
	}

	public String forgetPasssword(String email) throws UserException {
		try {

			User user = userRepository.findByEmail(email);

			if (user == null) {
				throw new UserException("Email Is Not Found.");

			}

			String otp = emailSenderService.generateOtp();
			emailSenderService.sendOtpEmail(user.getEmail(), otp);
			user.setOtp(otp);
			user.setOtpGeneratedTime(LocalDateTime.now());
			
			userRepository.save(user);
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			throw new RuntimeException("Unable to send otp please try again");
		}
		
		return "Otp sent..";
	}
	
	public String verifyForget(String email,String otp,String password) {
		User user = userRepository.findByEmail(email);

		if (user.getOtp().equals(otp)
				&& Duration.between(user.getOtpGeneratedTime(), LocalDateTime.now()).getSeconds() < (10 * 60)) {
			user.setActive(true);
			user.setPassword(passwordEncoder.encode(password));
			userRepository.save(user);
			System.out.println("your password change successfully " + user.getPassword());
			return "OTP verified you can change Password.";
		}
		return "Please regenerate otp and try again";
		
	}

	public boolean verifyAccount(String email, String otp) {
		User user = userRepository.findByEmail(email);

		if (user.getOtp().equals(otp)
				&& Duration.between(user.getOtpGeneratedTime(), LocalDateTime.now()).getSeconds() < (10 * 60)) {
			user.setActive(true);
			userRepository.save(user);
			return true;
		}
		return false;
	}

	public String regenerateOtp(String email) {
		User user = userRepository.findByEmail(email);

		String otp = emailSenderService.generateOtp();
		try {
			emailSenderService.sendOtpEmail(email, otp);
		} catch (MessagingException e) {
			throw new RuntimeException("Unable to send otp please try again");
		}
		user.setOtp(otp);
		user.setOtpGeneratedTime(LocalDateTime.now());
		userRepository.save(user);
		return "Email sent... please verify account within 2 minute";
	}
	
	public String regenerateForgetOtp(String email) {
		User user = userRepository.findByEmail(email);

		String otp = emailSenderService.generateOtp();
		try {
			emailSenderService.sendOtpEmail(email, otp);
		} catch (MessagingException e) {
			throw new RuntimeException("Unable to send otp please try again");
		}
		user.setOtp(otp);
		user.setOtpGeneratedTime(LocalDateTime.now());
		userRepository.save(user);
		return "Email sent... please verify otp within 10 minute.";
	}

	@Override
	public List<User> findAllUsers() {
		return userRepository.findAllByOrderByCreatedAtDesc();
	}

	@Override
	public List<Address> findAllAddress(Long id) {
		// TODO Auto-generated method stub
		return null;
	}
	

	

}
