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
                private String fileSize;
                private String fileName;
                private String fileType;
                private byte[] bytes;
                 
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
				
				
				@Column(name="fileSize")
				public String getFileSize() {
					return fileSize;
				}

				public void setFileSize(String fileSize) {
					this.fileSize = fileSize;
				}

				@Column(name="fileName")
				public String getFileName() {
					return fileName;
				}

				public void setFileName(String fileName) {
					this.fileName = fileName;
				}

				@Column(name="fileType")
				public String getFileType() {
					return fileType;
				}

				public void setFileType(String fileType) {
					this.fileType = fileType;
				}

				@Column(name="bytes")
				public byte[] getBytes() {
					return bytes;
				}

				public void setBytes(byte[] bytes) {
					this.bytes = bytes;
				}

				public Document(){ 
                	
                }
                
                public Document(int docId, String docPath, int id, String fileType, String fileName, String fileSize) {
                                super();
                                this.docId = docId;
                                this.docPath = docPath;
                                this.id = id;
                                this.fileName=fileName;
                                this.fileSize=fileSize;
                                this.fileType=fileType;
                }
                
}

