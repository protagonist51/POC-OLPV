package org.itc.service;

import java.util.List;



import org.itc.model.ServiceType;
import org.itc.model.User;
import org.itc.model.UserDetails;
import org.springframework.dao.DataIntegrityViolationException;

public interface UserDetailsService {

	public UserDetails addUserDetails(UserDetails userDetails) throws DataIntegrityViolationException;
	public List<UserDetails> showUserDetails(int userId);
	public List<UserDetails> getAllDetails();
	public UserDetails editUserdetails(int id);
	public UserDetails recordforid(int id);
	public UserDetails checkforId(User user);
	public List<ServiceType> getServiceTableInfo( );

	
	
}

