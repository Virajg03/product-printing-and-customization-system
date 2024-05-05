package com.project.emailSender;

import java.io.File;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailSenderService {

	@Autowired
	private JavaMailSender javaMailSender;

	public void sendSimpleEmail(String toMail, String subject, String body) throws MessagingException {

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
		mimeMessageHelper.setTo(toMail);
		mimeMessageHelper.setSubject(subject);
		mimeMessageHelper.setText(body, true);

		javaMailSender.send(mimeMessage);
		System.out.println("Mail was send successfully to " + toMail);
	}

	public void sendMailWithAttachment(String toMail, String subject, String body, String attachment)
			throws MessagingException {

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();

		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

		mimeMessageHelper.setFrom("productprinting520@gmail.com");

		mimeMessageHelper.setTo(toMail);

		mimeMessageHelper.setText(body);

		mimeMessageHelper.setSubject(subject);

		FileSystemResource fileSystemResource = new FileSystemResource(new File(attachment));

		mimeMessageHelper.addAttachment(fileSystemResource.getFilename(), fileSystemResource);

		javaMailSender.send(mimeMessage);

		System.out.println("Mail was sended successfully to " + toMail);

	}

	public void sendOtpEmail(String email, String otp) throws MessagingException {
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
		mimeMessageHelper.setTo(email);
		mimeMessageHelper.setSubject("Verify OTP");
		mimeMessageHelper.setText("""
				<div>
				  <h1>Account Registration OTP : </h1>
				  <h3>%s</h3>
				</div>
				""".formatted(otp), true);

		javaMailSender.send(mimeMessage);
	}
	
	public void sendOtpForget(String email, String otp) throws MessagingException {
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
		mimeMessageHelper.setTo(email);
		mimeMessageHelper.setSubject("For Change Your Password.");
		mimeMessageHelper.setText("""
				<div>
				  <h1>Forget Password OTP : </h1>
				  <h3>%s</h3>
				</div>
				""".formatted(otp), true);

		javaMailSender.send(mimeMessage);
	}

	public String generateOtp() {
		Random random = new Random();
		int randomNumber = random.nextInt(999999);
		String output = Integer.toString(randomNumber);

		while (output.length() < 6) {
			output = "0" + output;
		}
		return output;
	}

}
