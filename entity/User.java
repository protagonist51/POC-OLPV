package org.itc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="user_list")
public class User{
	private int userId;
	private String userName;
	private String password;
	private String email;
	private Role role;
	private UserStatus userstatus;
	

	public User() {
	}


	public User(int userId, String userName, String password, String email, Role role,UserStatus userstatus
			) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.password = password;
		this.email = email;
		this.role = role;
		this.userstatus = userstatus;
		
	}

	@Id
	@Column(name = "userId")												
	public int getuserId() {												
		return userId;														
	}
	public void setuserId(int userId) {
		this.userId = userId;
	}
	
	@Column(name = "userName")
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	@Column(name = "password")
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	@Column(name = "email")
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	@ManyToOne(fetch = FetchType.EAGER)								
	@JoinColumn(name = "roleId")								
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "userstatusId")
	public UserStatus getUserstatus() {
		return userstatus;
	}
	public void setUserstatus(UserStatus userstatus) {
		this.userstatus = userstatus;
	}

	
	
	}
	
	
	
	
	
	
	
	
