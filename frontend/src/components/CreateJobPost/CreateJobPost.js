import React, { useState } from "react";
import "./CreateJobPost.css";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { firestore } from "../../firebase";
import {addDoc,collection} from "firebase/firestore"

export default function CreateJobPost() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");

  const ref = collection(firestore, "jobpost");


  const createPost = async (event) => {
    event.preventDefault();
    try{
        await addDoc(ref, {title: title, tags: tags, description: description})
    }catch(e){
        console.log(e);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <Button
          className="create-post-button mt-3 mb-3"
          variant="primary"
          onClick={() => setShowCreatePost(true)}
        >
          Create Job Post
        </Button>

        <Modal
          show={showCreatePost}
          onHide={() => setShowCreatePost(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Job</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <form id="job-post-form">
                <div className="mb-3">
                  <label htmlFor="job-title" className="form-label">Job Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="job-title" 
                    required  
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="job-description" className="form-label">Job Description</label>
                  <textarea 
                    className="form-control" 
                    id="job-description" 
                    rows="3" 
                    required 
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="job-tags" className="form-label">Technology Tags</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="job-tags" 
                    placeholder="e.g., JavaScript, Python" 
                    value={currentTag}
                    onChange={(event) => setCurrentTag(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addTag();
                      }
                    }}
                    onBlur={addTag}
                  />
                  <div className="tags-container">
                    {tags.map((tag, index) => (
                      <div key={index} className="tag">
                        {tag}
                        <span className="close-icon" onClick={() => removeTag(tag)}>X</span>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreatePost(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={createPost}>
              Post
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
