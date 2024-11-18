import React from 'react'
import LoadBlogList from './LoadBlogList';
import { Suspense } from 'react';
import LoadBlogContent from './LoadBlogContent';
import LoadBlogDetails from './LoadBlogDetails';
import { SessionProvider } from "next-auth/react"
import { auth } from '@/app/auth';
import LoadBlogContentAuthenticated from './LoadBlogContentAuthenticated';
import LoadComments from './LoadComments';


async function page({ params }) {
    const session = await auth();

    return (
        <div className="containero">
            <div className="blogView">
                <div className="sideSearch">
                    <Suspense fallback={<div className="loadingfallback"><p>Loading list...</p></div>}>
                        <LoadBlogList />
                    </Suspense>
                </div>
                <div className="blog">
                    {(!session?.user) ? (
                        <Suspense fallback={<div className="loadingfallback"><p>Loading blog...</p></div>}>
                            <LoadBlogContent blogId={params.slug} />
                        </Suspense>
                    ) : (
                        <SessionProvider>
                            <Suspense fallback={<div className="loadingfallback"><p>Loading blog...</p></div>}>
                                <LoadBlogContentAuthenticated blogId={params.slug} />
                            </Suspense>
                        </SessionProvider>
                    )}
                    <Suspense fallback={<p>loading comments...</p>}>
                        <LoadComments blogId={params.slug} />
                    </Suspense>
                </div>
                <div className="details">
                    <Suspense fallback={<div className="loadingfallback"><p>Loading info...</p></div>}>
                        <LoadBlogDetails blogId={params.slug} />
                    </Suspense>
                </div>
            </div>

        </div>
    )
}

export default page