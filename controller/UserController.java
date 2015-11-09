package org.itc.controller;

import java.io.BufferedOutputStream;
import java.io.EOFException;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.itc.model.Document;
import org.itc.model.Role;
import org.itc.model.ServiceType;
import org.itc.model.Status;
import org.itc.model.User;
import org.itc.model.UserDetails;
import org.itc.model.UserStatus;
import org.itc.service.DocumentService;
import org.itc.service.UserDetailsService;
import org.itc.service.UserService;
import org.itc.utility.SendEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;



@Controller
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private DocumentService documentService;
	
		
	@RequestMapping(value="/login",method = RequestMethod.POST, consumes={"application/json"})
    public @ResponseBody User getUserInfo(@RequestBody User user) throws EOFException  {
		
    	try{
    			
    			user = userService.findUser(user.getUserName(), user.getPassword(), user.getRole());
    		
    			if(user !=null)
    			{
    		    	return user;
    			}
    			else
    			{
    				return user;
    			}
    	    }
    	catch(Exception e)
    	        {
    	            e.printStackTrace();
    	        }
    	
    	return user;

    }
	
	@RequestMapping(value="/signup", method = RequestMethod.POST, consumes={"application/json"})
	 public @ResponseBody User addUser(@RequestBody User user) { 
		try
		{
			Role role = new Role();
			role.setRoleId(2);		
			user.setRole(role);
		
			UserStatus userstatus=new  UserStatus();
			userstatus.setUserstatusId(2);
			user.setUserstatus(userstatus);
		
			userService.addUser(user);
			return user;
		}
		catch(Exception se)
		{
			se.getMessage();
			return null;
			
		}
		
	}
	
	@RequestMapping(value="/forgetPassword", method = RequestMethod.POST, consumes={"application/json"})
	 public @ResponseBody User forgetPassword(@RequestBody User user) throws AddressException, MessagingException { 
		System.out.println("inside forgetPassword");
		
		/*for auto genrate password*/
		int length = 8;	
		String alphabet = new String("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"); 
		int n = alphabet.length();
		String newPassword = new String(); 
		Random r = new Random(); 
		for (int i=0; i<length; i++) 
		newPassword = newPassword + alphabet.charAt(r.nextInt(n)); 
		System.out.println("Password :-"+newPassword);
		/*---------------------------*/
		
		user=userService.forgetPassword(user, newPassword);
		if(user !=null)
		{
			SendEmail callsendEmail = new SendEmail();
			callsendEmail.sendingEmail(user);
	    	return user;
		}
		else
		{
			
			System.out.println(user);
			return user;
		}
	
		
	}
	
	@RequestMapping(value="/logout", method = RequestMethod.POST, consumes={"application/json"})
	public @ResponseBody void LogoutUser(@RequestBody int userId) {
		
		userService.LogoutUser(userId);
		System.out.println("inside logout");
		

	}
	
	
	@RequestMapping(value="/userdetails", method = RequestMethod.POST, consumes={"application/json"})
	public @ResponseBody UserDetails addUserDetails(@RequestBody UserDetails userDetails) throws ParseException, DataIntegrityViolationException {
		
				
		if(userDetails.getId() == 0 )
		{
			Status status=new Status();
			status.setStatusId(1);
			userDetails.setStatus(status);
		}
		
		userDetails = userDetailsService.addUserDetails(userDetails);
		
		System.out.println("Inside adding new UserDetails block Controller Class");
	
		return userDetails;
	}
	
	
	@RequestMapping(value="/viewuserdetails", method = RequestMethod.POST, consumes={"application/json"})
	public @ResponseBody List<UserDetails> showUserDetails(@RequestBody int userId) throws ParseException {
	
		
		List<UserDetails> viewuserDetails = userDetailsService.showUserDetails(userId);
		
		System.out.println("Inside viewuserdetails block Controller Class");
		return  viewuserDetails;
		
	}
	
	
	@RequestMapping(value="/getAlldetails", method = RequestMethod.GET, produces={"application/json"})
	public @ResponseBody List<UserDetails> getAllDetails() throws ParseException {
		 
		List<UserDetails> viewuserDetails = userDetailsService.getAllDetails();
		  
		  System.out.println("Inside Admin Java Controller");
		  return viewuserDetails;
		 
		 }
	
	
	@RequestMapping(value="/getServiceTable", method = RequestMethod.GET, produces={"application/json"})
	public @ResponseBody List<ServiceType>  getServiceTableInfo() throws ParseException {
		
		List<ServiceType> servicetabledata = userDetailsService. getServiceTableInfo();
		System.out.println("Inside Service table");
		
		return servicetabledata;
		
		
	}
	
	@RequestMapping(value="/editUserdetails", method = RequestMethod.POST, consumes={"application/json"})
	 public @ResponseBody UserDetails editUserdetails(@RequestBody int id) throws ParseException {
	  
	  UserDetails viewuserDetails = userDetailsService.editUserdetails(id);
	  
	  System.out.println("Inside viewuserdetails block Controller Class");
	  return viewuserDetails;
	 
	 }
	
	@RequestMapping(value="/checkforId", method = RequestMethod.POST, consumes={"application/json"})
	public @ResponseBody UserDetails checkforId(@RequestBody User user) throws ParseException {
	
		UserDetails viewuserDetails = userDetailsService.checkforId(user);
		
		System.out.println("Inside viewuserdetails block Controller Class");
		return viewuserDetails;
		
	}
	
	
	@RequestMapping(value="/recordforid", method = RequestMethod.POST, produces={"application/json"})
	public @ResponseBody UserDetails recordforid(@RequestBody int id) throws ParseException {
	
		UserDetails viewuserDetailsid = userDetailsService.recordforid(id);
		return viewuserDetailsid;
	
	}
	
	
	
	/*@RequestMapping(value = "/multipleSave", method = RequestMethod.POST)
	
	public @ResponseBody void uploadFile(@RequestParam("file") MultipartFile[] files) throws IOException {
        			
					System.out.println("HEEEEEEEEEEEEEEEEEEEE");
					for (int i = 0; i < files.length; i++) {
				        MultipartFile file = files[i];
				        System.out.println(file);
				        System.out.println("Inside for loop");
				  }
		
		         Iterator<String> itr=request.getFileNames();
		             System.out.println(itr);
		             System.out.println(itr.hasNext());
		            System.out.println(request.getFileNames());
		             System.out.println(itr.toString());
		             MultipartFile file= request.getFile(itr.toString());
		             MultipartFile file1=request.getFile(itr.next());
		             String fileName=file1.getOriginalFilename();
		             System.out.println(fileName);
                  
             		 Document doc = new Document();
            		 doc.setDocument(file.getBytes());
           		     documentService.addItem(doc); 
        	
	 }*/
	
	/*@RequestMapping(value = "/multipleSave", method = RequestMethod.POST)

	public @ResponseBody void uploadFile(MultipartHttpServletRequest request, HttpServletResponse response) throws IOException {

	        Iterator<String> fileName=request.getFileNames();
	        MultipartFile file= request.getFile(fileName.hasNext());
	        System.out.println("file");
	}*/
	
	
	
	/*@RequestMapping(value = "/multipleSave", method = RequestMethod.POST, consumes={})
	public void myFileUpLoad(@PathVariable("id") int id, @RequestParam("file") MultipartFile file) throws IOException {
		System.out.println("Inside ");
		byte[] uploadedByte = file.getBytes();
	}*/
	
	
	@RequestMapping(value="/upload", method=RequestMethod.POST, headers=("content-type=multipart/*"))
	public @ResponseBody String handleFileUpload(@RequestParam("file") MultipartFile file) {
		System.out.println("Inside UpLoad");
	        if (!file.isEmpty()) {
	            try {
	                byte[] bytes = file.getBytes();
	                BufferedOutputStream stream = 
	                        new BufferedOutputStream(new FileOutputStream(new File("")));
	                stream.write(bytes);
	                stream.close();
	                return "You successfully uploaded !";
	            } catch (Exception e) {
	                return "You failed to upload" + e.getMessage();
	            }
	        } else {
	            return "You failed to upload because the file was empty.";
	        }
	
	 }
	
	
	@RequestMapping(value = "/viewDoc", method = RequestMethod.POST, produces={"application/json"})
	
	 public @ResponseBody List<Document> viewFile(@RequestBody int id) throws IOException {
		
		List<Document> doc = documentService.getDoc(id);
		
		return doc;
	
	}

}

