import React from 'react'
import { auth } from '../lib/firebase';
import { newBlog } from '../lib/actions';
import PublicButton from './PublicButton';
import CommentsButton from './CommentsButton';
import UploadPictures from '../components/UploadPictures';

function NewBlog() {
  const currentUser = {
    username: "Max Muster",
    email: "mumu@mu.com"
  }
  //const currentUser = auth.currentUser;



  return (
    !currentUser ? (
      <div className="containero">
        <div className="newblog">
          <h2>Please log in to create a new blog</h2>
        </div>
      </div>
    ) : (
      <div className="containero">
        <div className='newblog'>
          <form onSubmit={newBlog} >
            <div className="settitle item">
              <label htmlFor="">Blog Title:</label>
              <input type="text" placeholder='Blog Title'
                name="title" required />
            </div>
            <div className="settopic item">
              <label htmlFor="">Topic:</label>
              <select name="selectedtopic">
                <option value="computer">Computer</option>
                <option value="food">Food</option>
                <option value="music">Music</option>
                <option value="photography">Photography</option>
                <option value="robotics">Robotics/Embedded</option>
                <option value="travel">Travel</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="settags item">
              <label htmlFor="">Tags:</label>
              <input type="text" placeholder='Tags' name="tags" />
            </div>
            <div className="setoptions item">
              <label htmlFor="">Options:</label>
              <div className="optionsbuttons">
                <PublicButton />
                <CommentsButton />
              </div>
            </div>
            <div className="setcontent item">
              <label htmlFor="">Content:</label>
              <textarea placeholder='Lorem ipsum, dolor sit amet' name="rawcontent" required></textarea>
            </div>
            <div className="newblogbuttons item">
              <div className="cancelblog">
                <button type="button">Cancel</button>
              </div>
              <div className="saveblog">
                <button type="submit">Save</button>
              </div>
            </div>
          </form>
        </div>
        <div className="pictureUpload">
          <UploadPictures />
        </div>
      </div>

    )
  );
}

export default NewBlog