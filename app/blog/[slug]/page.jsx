import BlogList from '@/app/components/BlogList'
import Details from '@/app/components/Details'
import Comments from '@/app/components/Comments'
import React from 'react'

function page({ params }) {

    // TODO: 
    // if params.slug === latest
    // get latest blog id 
    // redirect to blog

    const currentBlog = {
        title: "Test Blog Title",
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia quidem quia neque facilis ut \
        harum repellat unde, maiores laboriosam excepturi animi optio voluptatem dolor consequuntur minima autem, \
        enim, sapiente corporis."
    }

    return (
        <div className="containero">
            <div className="blogView">
                <div className="sideSearch">
                    <BlogList />
                </div>
                <div className="blog">
                    <div className="blogtitle">
                    <h2>{currentBlog.title}</h2>
                    </div>
                    <div className="blogcontent">
                    {/* <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(currentBlog.content)) }} /> */}
                        <p>{currentBlog.content}</p>
                    </div>
                    <Comments />
                </div>
                <div className="details">
                    <Details />
                </div>
            </div>

        </div>
    )
}

export default page