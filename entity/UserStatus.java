package org.itc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="user_status")
public class UserStatus {

	private int userstatusId;
	private String usrestatus;
	
public UserStatus(){
	
					}

	public UserStatus(int userstatusId, String usrestatus)
	{
		super();
		this.userstatusId = userstatusId;
		this.usrestatus = usrestatus;
	}
	
	
	
	@Id
	@Column(name="userstatusId")
	public int getUserstatusId() {
		return userstatusId;
	}
	public void setUserstatusId(int userstatusId) {
		this.userstatusId = userstatusId;
	}
	
	
	
	@Column(name="userStatus")
	public String getUsrestatus() {
		return usrestatus;
	}
	public void setUsrestatus(String usrestatus) {
		this.usrestatus = usrestatus;
	}
	
	
}
