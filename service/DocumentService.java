package org.itc.service;

import java.util.List;

import org.itc.model.Document;

public interface DocumentService {
	
	
       public void addItem(Document doc);
        
       public List<Document> getDoc(int id);
  
}
