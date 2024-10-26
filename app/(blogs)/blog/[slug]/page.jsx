import React from 'react'
import LoadBlogList from './LoadBlogList';
import { Suspense } from 'react';
import LoadBlogContent from './LoadBlogContent';
import LoadBlogDetails from './LoadBlogDetails';


function page({ params }) {

    return (
        <div className="containero">
            <div className="blogView">
                <div className="sideSearch">
                    <Suspense fallback={<p>Loading list...</p>}>
                        <LoadBlogList />
                    </Suspense>
                </div>
                <div className="blog">
                    <Suspense fallback={<p>Loading blog...</p>}>
                        <LoadBlogContent blogId={params.slug}/>
                    </Suspense>
                </div>
                <div className="details">
                    <Suspense fallback={<p>Loading info...</p>}>
                        <LoadBlogDetails blogId={params.slug}/>
                    </Suspense>
                </div>
            </div>

        </div>
    )
}

export default page