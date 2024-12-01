'use client'

import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { apiServer } from '@/app/lib/const';
import { useSession } from "next-auth/react"

function Search() {
    const [searchText, setSearchText] = useState("");
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [sortField, setSortField] = useState('created'); // Set 'created' as the default sort field
    const [sortOrder, setSortOrder] = useState('desc'); // Default sort order to 'asc' (or 'desc' based on your preference
    const [currentBlogList, setCurrentBlogList] = useState(null);
    const router = useRouter();
    const { data: session } = useSession()


    useEffect(() => {
        // Fetch initial comments when component mounts
        const fetchBlogs = async () => {
            const res = await fetch(`${apiServer}/api/blog`);
            if (!res.ok) {
                console.error("Could not fetch blogs");
                return;
            }
            const data = await res.json();
            setCurrentBlogList(data);
        };

        fetchBlogs();
    }, []);

    const user = {
        email: session?.user.email
    }

    const handleBlogClick = (id) => {
        // TODO: redirect to blog
        router.push(`/blog/${id}`);
    };

    // Function to handle sorting
    const handleSort = (field) => {
        const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(newSortOrder);

        const sortedBlogs = [...filteredBlogs].sort((a, b) => {
            const aValue = a[field] ? a[field].toString().toLowerCase() : "";
            const bValue = b[field] ? b[field].toString().toLowerCase() : "";

            if (newSortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
        setFilteredBlogs(sortedBlogs);
    };

    useEffect(() => {
        const debouncedSearch = debounce((searchText) => {

            let filtered = currentBlogList;

            if (!filtered) {
                return;
            }


            filtered = filtered.filter((blog) => blog.isPublic || (user && blog.userId === user.email));

            if (searchText.trim() !== "") {
                filtered = filtered.filter((blog) =>
                    blog.title.toLowerCase().includes(searchText.toLowerCase()) ||
                    blog.userId.toLowerCase().includes(searchText.toLowerCase()) ||
                    blog.topic.toLowerCase().includes(searchText.toLowerCase()) ||
                    blog.tags?.toLowerCase().includes(searchText.toLowerCase()) ||
                    blog.created.includes(searchText)
                );
            }

            // Sort the filtered list by creation date initially
            const sortedByCreation = filtered.sort((a, b) => {
                const aValue = a['created'] ? a['created'].toString().toLowerCase() : "";
                const bValue = b['created'] ? b['created'].toString().toLowerCase() : "";

                return sortOrder === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
            });

            setFilteredBlogs(sortedByCreation);
        }, 300);

        debouncedSearch(searchText);  // Trigger debounced search

        return () => {
            debouncedSearch.cancel();  // Cancel the debounce on cleanup
        };
    }, [searchText, currentBlogList, sortOrder]); // Now dependent on sortOrder

    const renderSortIndicator = (field) => {
        if (sortField === field) {
            return sortOrder === 'asc' ? ' 🔼' : ' 🔽';
        }
        return null;
    };

    return (
        <div className='search'>
            <div className="searchinput">
                <img src="/search.png" alt="" />
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder='Search all Blogs'
                />
            </div>
            <div className="results">
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('title')} className='resulttitle'>
                                Title {renderSortIndicator('title')}
                            </th>
                            <th onClick={() => handleSort('topic')}>
                                Topic {renderSortIndicator('topic')}
                            </th>
                            <th onClick={() => handleSort('username')}>
                                Author {renderSortIndicator('username')}
                            </th>
                            <th onClick={() => handleSort('tags')} className='resulttags'>
                                Tags {renderSortIndicator('tags')}
                            </th>
                            <th onClick={() => handleSort('created')} className='resultdate'>
                                Date of creation {renderSortIndicator('created')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBlogs.map((blogentry) => (
                            <tr
                                key={blogentry.id}
                                className={`searchitem ${blogentry.topic} ${!blogentry.isPublic ? 'notpublic' : ''}`}
                                onClick={() => handleBlogClick(blogentry.id)}
                            >
                                <td data-label="Title" className='resulttitle'>{blogentry.title}</td>
                                <td data-label="Topic" >{blogentry.topic}</td>
                                <td data-label="Author">👤{blogentry.username}</td>
                                <td data-label="Tags" className='resulttags'>{blogentry.tags}</td>
                                <td data-label="Created" className='resultdate'>{blogentry.created}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Search;