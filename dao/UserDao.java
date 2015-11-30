package org.itc.dao;

import java.sql.SQLException;

import org.itc.model.Role;
import org.itc.model.User;

public interface UserDao {
	
	public void addUser(User user);
	
	public User findUser(String userName, String password, Role role) throws SQLException;
	
	public void LogoutUser(int userId);
	
	public User forgetPassword(User user, String newPassword);

	

}
