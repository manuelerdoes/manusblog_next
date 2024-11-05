'use client'

import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';



function BlogList({ currentBlogList }) {
    const searchInputRef = useRef(null);
    const [showTopicFilter, setShowTopicFilter] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedTopic, setSelectedTopic] = useState(null); // Track selected topic
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const router = useRouter();

    const user = {
        username: "Max Muster",
        email: "maximux@mesongo.com",
        avatar: "/avatar.png"
    }

    //const user = auth.currentUser;

    // Filter blogs based on search value and selected topic
    useEffect(() => {
        let result = [...currentBlogList];

        result = result.filter((blog) => blog.isPublic || (user && blog.userid === user.uid));

        // Filter by search value if present
        if (searchValue.trim()) {
            result = result.filter((blog) =>
                blog.title.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        // Filter by selected topic if present
        if (selectedTopic) {
            result = result.filter((blog) => blog.topic === selectedTopic);
        }

        // Sort by creation date ascending (again, to ensure sorted after filtering)
        result = result.sort((a, b) => new Date(a.created) - new Date(b.created));

        // Limit to first 30 results
        setFilteredBlogs(result.slice(0, 30));
    }, [searchValue, selectedTopic/*, currentBlogList*/]);

    // Handle topic selection
    const handleTopicClick = (topic) => {
        setSelectedTopic(topic === selectedTopic ? null : topic); // Deselect if clicked again
    };

    // Handle the keyboard shortcut
    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
                event.preventDefault(); // Prevent the default action (such as browser search)
                if (searchInputRef.current) {
                    searchInputRef.current.focus(); // Focus on the search input
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (searchActive) {
            setShowTopicFilter(true);
            return;
        } else if (showTopicFilter && isMouseOver) {
            return;
        } else if (selectedTopic) {
            return;
        }
        setShowTopicFilter(false);
    }, [isMouseOver, searchActive]);

    const handleBlogClick = (id) => {
        router.push('/blog/' + id);
    }

    return (
        <div className="bloglist"
            onMouseOver={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
        >
            <div className="search">
                <div className="searchbar">
                    <img src="/search.png" alt="" />
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search: CMD/CTRL + K"
                        onFocus={() => setSearchActive(true)}
                        onBlur={() => setSearchActive(false)}
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                    />
                </div>
            </div>

            {showTopicFilter && (
                <div className="topicfilter">
                    <h3>Filter by topic:</h3>
                    <div className={`topic phototopic ${selectedTopic === 'photography' ? 'selected' : ''}`} onClick={() => handleTopicClick('photography')}>
                        <span>📸 photography</span>
                    </div>
                    <div className={`topic musictopic ${selectedTopic === 'music' ? 'selected' : ''}`} onClick={() => handleTopicClick('music')}>
                        <span>🎵 music</span>
                    </div>
                    <div className={`topic computertopic ${selectedTopic === 'computer' ? 'selected' : ''}`} onClick={() => handleTopicClick('computer')}>
                        <span>💻 computer</span>
                    </div>
                    <div className={`topic foodtopic ${selectedTopic === 'food' ? 'selected' : ''}`} onClick={() => handleTopicClick('food')}>
                        <span>🍕 food</span>
                    </div>
                    <div className={`topic roboticstopic ${selectedTopic === 'robotics' ? 'selected' : ''}`} onClick={() => handleTopicClick('robotics')}>
                        <span>🤖 robotics/embedded</span>
                    </div>
                    <div className={`topic traveltopic ${selectedTopic === 'travel' ? 'selected' : ''}`} onClick={() => handleTopicClick('travel')}>
                        <span>🚀 travel</span>
                    </div>
                    <div className={`topic othertopic ${selectedTopic === 'other' ? 'selected' : ''}`} onClick={() => handleTopicClick('other')}>
                        <span>⭐️ other</span>
                    </div>
                </div>
            )}

            <div className="blogentries">
                {filteredBlogs.map(blogentry => (
                    <div key={blogentry.id} className={`bloglistitem ${blogentry.topic} ${!blogentry.isPublic ? 'notpublic' : ''}`} onClick={() => handleBlogClick(blogentry.id)}>
                        <p>{blogentry.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BlogList;