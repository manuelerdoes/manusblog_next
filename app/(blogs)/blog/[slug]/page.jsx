import React from 'react'
import LoadBlogList from './LoadBlogList';
import { Suspense } from 'react';
import LoadBlogContent from './LoadBlogContent';
import LoadBlogDetails from './LoadBlogDetails';
import { auth } from '@/app/auth';
import LoadBlogContentAuthenticated from './LoadBlogContentAuthenticated';
import LoadComments from './LoadComments';


async function page({ params }) {
    const session = await auth();

    return (
        <div className="containero">
            <div className="blog-view">
                <div className="side-search">
                    <Suspense fallback={<div className="loading-fallback"></div>}>
                        <LoadBlogList />
                    </Suspense>
                </div>
                <div className="blog-wrapper">
                    {(!session?.user) ? (
                        <Suspense fallback={<div className="loading-fallback"></div>}>
                            <LoadBlogContent blogId={params.slug} />
                        </Suspense>
                    ) : (
                        <Suspense fallback={<div className="loading-fallback"></div>}>
                            <LoadBlogContentAuthenticated blogId={params.slug} />
                        </Suspense>
                    )}
                    <Suspense fallback={<div className="loading-fallback"></div>}>
                        <LoadComments blogId={params.slug} />
                    </Suspense>
                </div>
                <div className="blog-details">
                    <Suspense fallback={<div className="loading-fallback"></div>}>
                        <LoadBlogDetails blogId={params.slug} />
                    </Suspense>
                </div>
            </div>

        </div>
    )
}

export default page