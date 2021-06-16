package alianza.entity;

import java.util.Date;

public class ClientTmp {
	private String sharedKey;

	private String email;

	private String phone;

	private Date startDate;

	private Date endDate;

	public String getSharedKey() {
		return sharedKey;
	}

	public void setSharedKey(String sharedKey) {
		this.sharedKey = sharedKey;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public ClientTmp(String sharedKey, String email, String phone, Date startDate, Date endDate) {
		this.sharedKey = sharedKey;
		this.email = email;
		this.phone = phone;
		this.startDate = startDate;
		this.endDate = endDate;
	}

	public ClientTmp() {
	}
}
