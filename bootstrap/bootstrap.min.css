package org.itc.service;

import java.sql.SQLException;

import org.itc.dao.UserDao;
import org.itc.model.Role;
import org.itc.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service

public class UserServiceImpl implements UserService {
	
	@Autowired  
	 private UserDao userDao;  
	
	 @Transactional
	 public void addUser(User user) {  
	  userDao.addUser(user);  
	 } 
	
	
	    
	public User findUser(String userName, String password, Role role) throws SQLException
	    {
	        return userDao.findUser(userName, password, role);
	    }
	
	public void LogoutUser(int userId){
		 userDao.LogoutUser(userId);
	}
	
	public User forgetPassword(User user, String newPassword)
    {
	 System.out.println("inside userserimp for frgtpswd");
	 return userDao.forgetPassword(user, newPassword); 
	
    }  

	

}
