package com.project.responce;

public class InvoiceResponse {

	private String invoice_pdf_url;
	private String invoice_id;

	public InvoiceResponse() {
		super();
		// TODO Auto-generated constructor stub
	}

	public InvoiceResponse(String invoice_pdf_url, String invoice_id) {
		super();
		this.invoice_pdf_url = invoice_pdf_url;
		this.invoice_id = invoice_id;
	}

	public String getInvoice_pdf_url() {
		return invoice_pdf_url;
	}

	public void setInvoice_pdf_url(String invoice_pdf_url) {
		this.invoice_pdf_url = invoice_pdf_url;
	}

	public String getInvoice_id() {
		return invoice_id;
	}

	public void setInvoice_id(String invoice_id) {
		this.invoice_id = invoice_id;
	}

}
