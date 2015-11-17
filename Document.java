package org.itc.model;



import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.Id;


import javax.persistence.Table;


@Entity
@Table(name="documents")
public class Document {

                private  int docId;
                private  String  docPath;
                int id;
                 
                @Id
                @Column(name="docId")
                public int getDocId() {
                	return docId;
                }
                
                public void setDocId(int docId) {
                    this.docId = docId;
                }
                
                @Column(name="docPath")
                public String getdocPath() {
                    return docPath;
                }
                
                public void setdocPath(String docPath) {
                    this.docPath = docPath;
                }
                
                
                @Column(name="id")
                public int getId() {
					return id;
				}

				public void setId(int id) {
					this.id = id;
				}
				
			
				public Document(){ 
                	
                }
                
                public Document(int docId, String docPath, int id) {
                                super();
                                this.docId = docId;
                                this.docPath = docPath;
                                this.id = id;
                                
                }
                
}

