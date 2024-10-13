'use client'

import React, { useEffect, useState, useContext } from 'react';
import { debounce } from 'lodash';
import { auth } from '../../lib/firebase';

function Search() {
    const [searchText, setSearchText] = useState("");
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [sortField, setSortField] = useState('created'); // Set 'created' as the default sort field
    const [sortOrder, setSortOrder] = useState('desc'); // Default sort order to 'asc' (or 'desc' based on your preference

    // TODO: currentBlogList
    const currentBlogList = [{
        id: 1,
        title: "whatever",
        username: "Max Muster",
        topic: "computer",
        tags: "gaggi, bisi",
        isPublic: "true",
        userid: "abcd",
        created: 123
      },
      {
        id: 2,
        title: "waslos",
        username: "Maese Muesche",
        topic: "other",
        tags: "hubi, bubi",
        isPublic: "true",
        userid: "abcd",
        created: 754
      }]
    
    const user = auth.currentUser;

    const handleBlogClick = (id) => {
        // TODO: redirect to blog
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

            filtered = filtered.filter((blog) => blog.isPublic || (user && blog.userid === user.uid));

            if (searchText.trim() !== "") {
                filtered = filtered.filter((blog) =>
                    blog.title.toLowerCase().includes(searchText.toLowerCase()) ||
                    blog.username.toLowerCase().includes(searchText.toLowerCase()) ||
                    blog.topic.toLowerCase().includes(searchText.toLowerCase()) ||
                    blog.tags?.toLowerCase().includes(searchText.toLowerCase())
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
    }, [searchText,/* currentBlogList,*/ sortOrder]); // Now dependent on sortOrder

    const renderSortIndicator = (field) => {
        if (sortField === field) {
            return sortOrder === 'asc' ? ' 🔼' : ' 🔽';
        }
        return null;
    };

    return (
        <div className="containero">
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
                                    className={`item ${blogentry.topic} ${!blogentry.isPublic ? 'notpublic' : ''}`}
                                    onClick={() => handleBlogClick(blogentry.id)}
                                >
                                    <td>{blogentry.title}</td>
                                    <td>{blogentry.topic}</td>
                                    <td>👤{blogentry.username}</td>
                                    <td className='resulttags'>{blogentry.tags}</td>
                                    <td className='resultdate'>{blogentry.created}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Search;