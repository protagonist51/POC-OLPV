package org.itc.service;


import java.util.List;

import org.itc.dao.ServiceTypeDao;
import org.itc.dao.UserDetailsDao;
import org.itc.model.ServiceType;
import org.itc.model.User;
import org.itc.model.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired  
	 private UserDetailsDao userDetailsDao;  
	
	@Autowired 
	private ServiceTypeDao serviceTypeDao;
	   
	@Transactional
	 public UserDetails addUserDetails(UserDetails userDetails) throws DataIntegrityViolationException  {  
	  userDetailsDao.addUserDetails(userDetails);
	  return userDetailsDao.addUserDetails(userDetails);  
	 
	} 
	
	@Transactional
	public List<UserDetails> showUserDetails(int userId){
		  return userDetailsDao.showUserDetails(userId);
		 }
	
	@Transactional
	public List<UserDetails> getAllDetails() {
		
		return userDetailsDao.usersList();
	}
	
	@Transactional
	public UserDetails editUserdetails(int id){
		
		return userDetailsDao.editUserdetails(id);
	}
	
	@Transactional
	public UserDetails checkforId(User user){
		
		return userDetailsDao.checkforId(user);
	}
	
	public UserDetails recordforid(int id){
		return userDetailsDao.recordforid(id);
		
	}
	
	@Transactional
	public List<ServiceType> getServiceTableInfo( )
	{
		return serviceTypeDao. serviceTableInformation();
	}
	
		
}
