package org.itc.model;



import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.Id;

import javax.persistence.Table;

@Entity
@Table(name="service")
public class ServiceType{
	private int serviceId;
	private String serviceName;
	private int amount;

	
	public ServiceType() {
		
	}
	
	    public ServiceType(int serviceId, String serviceName, int amount) {
		super();
		this.serviceId = serviceId;
		this.serviceName = serviceName;
		this.amount = amount;
	
	}
	
	
	    @Id
	    @Column(name = "serviceId")
	public int getServiceId() {
		return serviceId;
	}
	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}
	
	@Column(name = "serviceName") 
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	
	@Column(name ="amount")
	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}
	
	
	
	
}
