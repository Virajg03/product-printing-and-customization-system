package com.project.controller;



import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.exception.OrderException;
import com.project.model.Order;
import com.project.repository.OrderRepository;
import com.project.responce.ApiResponce;
import com.project.responce.PaymentLinkResponse;
import com.project.service.OrderService;
import com.project.service.UserService;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/api")
public class PaymantController {

	@Value("${razorpay.api.key}")
	String apiKey;

	@Value("${razorpay.api.secret}")
	String apiSecret;

	@Autowired
	private OrderService orderService;
	@Autowired
	private OrderRepository orderRepository;

	@PostMapping("/payments/{orderId}")
	public ResponseEntity<PaymentLinkResponse> createPaymentLink(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt) throws OrderException, RazorpayException {

		Order order = orderService.findOrderById(orderId);

		try {
			RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

			// Create a JSON object with the payment link request parameters
			JSONObject paymentLinkRequest = new JSONObject();

			paymentLinkRequest.put("amount", order.getTotalDiscountedPrice() * 100);
			paymentLinkRequest.put("currency", "INR");

			// Create a JSON object with the customer details
			JSONObject customer = new JSONObject();
			customer.put("name", order.getUser().getFirstName());
//			customer.put("contact", order.getUser().getMobile());
			customer.put("email", order.getUser().getEmail());
			paymentLinkRequest.put("customer", customer);

			// Create a JSON object with the notification settings
			JSONObject notify = new JSONObject();
			notify.put("sms", true);
			notify.put("email", true);
			paymentLinkRequest.put("notify", notify);

			// Set the reminder settings
			paymentLinkRequest.put("reminder_enable", true);

			// Set the callback URL and method
			paymentLinkRequest.put("callback_url", "http://localhost:5173/payment/" + orderId);
			paymentLinkRequest.put("callback_method", "get");

			// Create the payment link using the paymentLink.create() method
			PaymentLink payment = razorpay.paymentLink.create(paymentLinkRequest);
			String paymentLinkId = payment.get("id");
			String paymentLinkUrl = payment.get("short_url");

			PaymentLinkResponse res = new PaymentLinkResponse(paymentLinkUrl, paymentLinkId);

			res.setPayment_link_id(paymentLinkId);
			res.setPayment_link_url(paymentLinkUrl);

			System.out.println(res.getPayment_link_id());

			return new ResponseEntity<PaymentLinkResponse>(res, HttpStatus.CREATED);

		} catch (Exception e) {
			throw new RazorpayException(e.getMessage());
		}

	}

	@GetMapping("/payments")
	public ResponseEntity<ApiResponce> redirect(@RequestParam(name = "payment_id") String paymentId,
			@RequestParam("order_id") Long orderId) throws RazorpayException, OrderException {
		
		
		RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);
		
		
		Order order = orderService.findOrderById(orderId);

		try {

			Payment payment = razorpay.payments.fetch(paymentId);
//			System.out.println("payment details --- " + payment + payment.get("status"));

			if (payment.get("status").equals("captured")) {
//				System.out.println("payment details --- " + payment + payment.get("status"));	

				order.getPaymentDetails().setPaymentId(paymentId);
				order.getPaymentDetails().setStatus("COMPLETED");
				order.setOrderStatus("PLACED");
//				order.setOrderItems(order.getOrderItems());
//				System.out.println(order.getPaymentDetails().getStatus() + "payment status ");
				orderRepository.save(order);
			}
			ApiResponce res = new ApiResponce("your order get placed", true);
			return new ResponseEntity<ApiResponce>(res, HttpStatus.OK);

		} catch (Exception e) {
//			System.out.println("errrr payment -------- ");
//			new RedirectView("https://shopwithzosh.vercel.app/payment/failed");
			throw new RazorpayException(e.getMessage());
		}

	}

}
