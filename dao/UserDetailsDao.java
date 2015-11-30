package org.itc.dao;

import java.util.List;

import org.itc.model.User;
import org.itc.model.UserDetails;
import org.springframework.dao.DataIntegrityViolationException;

public interface UserDetailsDao {

	public UserDetails addUserDetails(UserDetails userDetails) throws DataIntegrityViolationException;
	public List<UserDetails> showUserDetails(int userId);
	public List<UserDetails> usersList();
	public UserDetails editUserdetails(int id);
	public UserDetails checkforId(User user);
	public UserDetails recordforid(int id);
	
	
	
}
