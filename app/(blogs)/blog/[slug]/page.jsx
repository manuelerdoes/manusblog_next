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
                    <Suspense fallback={<div className="loadingfallback"><p>Loading list...</p></div>}>
                        <LoadBlogList />
                    </Suspense>
                </div>
                <div className="blog">
                    <Suspense fallback={<div className="loadingfallback"><p>Loading blog...</p></div>}>
                        <LoadBlogContent blogId={params.slug}/>
                    </Suspense>
                </div>
                <div className="details">
                    <Suspense fallback={<div className="loadingfallback"><p>Loading info...</p></div>}>
                        <LoadBlogDetails blogId={params.slug}/>
                    </Suspense>
                </div>
            </div>

        </div>
    )
}

export default page