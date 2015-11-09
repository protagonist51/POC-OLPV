package org.itc.utility;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.itc.model.User;

public class SendEmail {
	public User sendingEmail(User user)
	{
		Properties props = new Properties();  
        props.put("mail.smtp.host", "smtp.gmail.com");  
        props.put("mail.smtp.auth", "true");  
        props.put("mail.debug", "true");  
        props.put("mail.smtp.port", 587);  
        props.put("mail.smtp.socketFactory.port", 25);  
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.transport.protocol", "smtp");
        Session mailSession = null;

        mailSession = Session.getInstance(props,  
                new javax.mail.Authenticator() {  
            protected PasswordAuthentication getPasswordAuthentication() {  
                return new PasswordAuthentication("<yogeshvbhat01@gmail.com>", "<zc516zc918>");  
            }  
        });  


        try {
        	
        	
            Transport transport = mailSession.getTransport();

            MimeMessage message = new MimeMessage(mailSession);

            message.setSubject("Sample Subject");
            message.setFrom(new InternetAddress("yogeshvbhat01@gmail.com"));
            String []to = new String[]{"yogeshyvb@gmail.com"};
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to[0]));
            String body = "Sample text";
            message.setContent(body,"text/html");
            transport.connect();

            transport.sendMessage(message,message.getRecipients(Message.RecipientType.TO));
            transport.close();
        } catch (Exception exception) {
        		System.out.println(exception);
        }
		return user;
    }
}
