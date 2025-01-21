'use client'

import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { apiServer } from '@/app/lib/const';
import { useSession } from "next-auth/react"
import { addUsernameToBloglist } from '@/app/lib/addUsernameToBloglist';
import { compareAsc, parse } from 'date-fns';

function Search() {
  const [searchText, setSearchText] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [sortField, setSortField] = useState('created'); // Default sort field
  const [sortOrder, setSortOrder] = useState('desc'); // Default sort order
  const [currentBlogList, setCurrentBlogList] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    // Fetch initial blogs when the component mounts
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${apiServer}/api/blog`);
        if (!res.ok) {
          console.error("Could not fetch blogs");
          return;
        }
        const data = await res.json();
        setCurrentBlogList(data);
        const userlist = await addUsernameToBloglist(data);
        setCurrentBlogList(userlist);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const user = {
    email: session?.user.email
  };

  const handleBlogClick = (slug) => {
    router.push(`/blog/${slug}`);
  };

  const handleSort = (field) => {
    const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newSortOrder);

    const sortedBlogs = [...currentBlogList].sort((a, b) => {
      if (field === 'created') {
        const aValue = parse(a[field], "dd.MM.yyyy HH:mm:ss", new Date());
        const bValue = parse(b[field], "dd.MM.yyyy HH:mm:ss", new Date());

        return newSortOrder === 'asc' ? compareAsc(aValue, bValue) : compareAsc(bValue, aValue);
      } else {
        const aValue = a[field] ? a[field].toString().toLowerCase() : "";
        const bValue = b[field] ? b[field].toString().toLowerCase() : "";

        return newSortOrder === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
      }
    });

    setFilteredBlogs(sortedBlogs);
  };


  // useEffect(() => {
  //   if (!currentBlogList) return;

  //   const sortedBlogs = [...currentBlogList].sort((a, b) => {
  //     const aValue = parse(a.created, "dd.MM.yyyy HH:mm:ss", new Date());
  //     const bValue = parse(b.created, "dd.MM.yyyy HH:mm:ss", new Date());

  //     return compareAsc(aValue, bValue);
  //   });

  //   setFilteredBlogs(sortedBlogs);
  // }, [currentBlogList]);

  useEffect(() => {
    const debouncedSearch = debounce((searchText) => {
      let filtered = currentBlogList;

      if (!filtered) return;

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

      setFilteredBlogs(filtered);
    }, 300);

    debouncedSearch(searchText);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchText, currentBlogList]);

  const renderSortIndicator = (field) => {
    if (sortField === field) {
      return sortOrder === 'asc' ? ' 🔼' : ' 🔽';
    }
    return null;
  };

  return (
    <div className='big-search'>
      <div className="big-search-input">
        <img src="/search.png" alt="" />
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder='Search all Blogs'
        />
      </div>
      <div className="big-search-results">
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
                className={`big-search-item ${blogentry.topic}-item ${!blogentry.isPublic ? 'not-public-item' : ''}`}
                onClick={() => handleBlogClick(blogentry.slug)}
              >
                <td data-label="Title" className='resulttitle'>{blogentry.title}</td>
                <td data-label="Topic">{blogentry.topic}</td>
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