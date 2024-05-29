import React, { useEffect, useState } from 'react';
import { Button, ListGroup } from "react-bootstrap";

export default function Bookmark({ actual, goToFnc }) {
    const [bookmarkName, setBookmarkName] = useState('');
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        setBookmarks(storedBookmarks);
    }, []);

    const addBookmark = () => {
        if (!bookmarkName) return;

        const newBookmark = { name: bookmarkName, number: actual };
        const updatedBookmarks = [...bookmarks, newBookmark];
        setBookmarks(updatedBookmarks);
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        setBookmarkName('');
    };

    const renderBookmarks = () => {
        return bookmarks.map((bookmark, index) => (
            <ListGroup.Item key={index}>
                {bookmark.name}
                <Button variant="primary" onClick={() => goToFnc(bookmark.number)}>바로가기</Button>
            </ListGroup.Item>
        ));
    };

    return (
        <div>
            <input
                type="text"
                placeholder="북마크 이름"
                value={bookmarkName}
                onChange={(e) => setBookmarkName(e.target.value)}
            />
            <button onClick={addBookmark}>북마크 추가</button>

            <ListGroup>
                {renderBookmarks()}
            </ListGroup>
        </div>
    );
}
