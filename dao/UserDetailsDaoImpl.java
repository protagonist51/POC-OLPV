package org.itc.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.itc.model.User;
import org.itc.model.UserDetails;
import org.itc.model.UserStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;



@Repository
public class UserDetailsDaoImpl implements UserDetailsDao {
		
		@Autowired  
	    private SessionFactory sessionFactory;  
		
		@SuppressWarnings("unchecked")
		@Override  
		    
	    public UserDetails addUserDetails(UserDetails userDetails) {  
	        sessionFactory.getCurrentSession().saveOrUpdate(userDetails); 
	       // if( userDetails.getId() == 0){	
				  
				List<UserDetails> list = sessionFactory.getCurrentSession().createQuery("from UserDetails b where b.userId = :userId order by id desc")
						.setParameter("userId", userDetails.getUserId())
						.list();
				
				userDetails = list.size() > 0 ?(UserDetails)list.get(0): null;
			// } 
			 
			 return userDetails;
		
		}
		
		@SuppressWarnings("unchecked")
		@Transactional   
		public UserDetails checkforId(User user){
			
			UserStatus userstatus=new UserStatus();
			   userstatus.setUserstatusId(1);
			
			   Session session = sessionFactory.getCurrentSession();
			   user.setUserstatus(userstatus);
			   session.saveOrUpdate(user); 
			
			List<UserDetails> list = sessionFactory.getCurrentSession().createQuery("from UserDetails b where b.userId = :userId")
					.setParameter("userId", user.getuserId())
					.list();
			return list.size() > 0 ?(UserDetails)list.get(0): null;
			
		}
		
		@SuppressWarnings("unchecked")
		@Transactional   
		 public List<UserDetails> showUserDetails(int userId){
			 
			List<UserDetails> list = sessionFactory.getCurrentSession().createQuery("from UserDetails b where b.userId = :userId")
				      .setParameter("userId", userId)
				      .list();
				 return list;
			 
		 }
		
		@SuppressWarnings("unchecked")
		@Transactional 
		public UserDetails recordforid(int id){
			List<UserDetails> list = sessionFactory.getCurrentSession().createQuery("from UserDetails b where b.id = :id")
					.setParameter("id", id)
					.list();
			return list.size() > 0 ?(UserDetails)list.get(0): null;
		}
		
		
		@Override
		
		@SuppressWarnings("unchecked")
		public List<UserDetails> usersList() {
			
			List<UserDetails> list = sessionFactory.getCurrentSession()
			.createQuery("from UserDetails").list();
			
			
			return sessionFactory.getCurrentSession()
					.createQuery("from UserDetails").list();
		}
		
		@Override
		@SuppressWarnings("unchecked")
		public UserDetails editUserdetails(int id){
			
			List<UserDetails> list = sessionFactory.getCurrentSession().createQuery("from UserDetails b where b.id = :id")
			          .setParameter("id", id)
			          .list();
			     return list.size() > 0 ?(UserDetails)list.get(0): null; 
		}
		
		
		
	}

