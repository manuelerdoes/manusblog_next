import React from 'react'
import { auth } from '../../../lib/firebase';
import CommentsButton from './CommentsButton';
import UploadPictures from '../../../components/UploadPictures';
import PublicButton from './PublicButton';

function EditBlog({ params }) {

  const currentUser = {
    username: "Max Muster",
    email: "mumu@mu.com"
  }
  //const currentUser = auth.currentUser;


  // get blog data with params.slug

  const currentBlog = {
    id: 1,
    userId: 1,
    title: "Test Blog Title",
    tags: "gaggi, bisi",
    created: 123,
    modified: 453,
    isPublic: true,
    disableComments: false,
    topic: "computer",
    content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia quidem quia neque facilis ut \
  harum repellat unde, maiores laboriosam excepturi animi optio voluptatem dolor consequuntur minima autem, \
  enim, sapiente corporis."
  }




  return (
    !currentUser ? (
      <div className="containero">
        <div className="newblog">
          <h2>You are not permitted to edit this blogpost</h2>
        </div>
      </div>
    ) : (
      <div className="containero">
        <div className='newblog'>
          <form onSubmit={null /* TODO: editBlog function */} >
            <div className="settitle item">
              <label htmlFor="">Blog Title:</label>
              <input type="text" placeholder='Blog Title'
                name="title" required defaultValue={currentBlog.title} />
            </div>
            <div className="settopic item">
              <label htmlFor="">Topic:</label>
              <select name="selectedtopic" defaultValue={currentBlog.topic}>
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
              <input type="text" placeholder='Tags' name="tags" defaultValue={currentBlog.tags} />
            </div>
            <div className="setoptions item">
              <label htmlFor="">Options:</label>
              <div className="optionsbuttons">
                <PublicButton publi={currentBlog.isPublic} />
                <CommentsButton isDisabled={currentBlog.disableComments} />
              </div>
            </div>
            <div className="setcontent item">
              <label htmlFor="">Content:</label>
              <textarea placeholder='Lorem ipsum, dolor sit amet' name="rawcontent" required defaultValue={currentBlog.content}></textarea>
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

export default EditBlog