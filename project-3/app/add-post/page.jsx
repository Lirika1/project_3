'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/add-post/addPost.module.css'
export default function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await fetch('/api/add-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      router.refresh();
    } catch (error) {
      console.error(error);
    }

    setTitle('');
    setContent('');
  };

  return (
    <main className={styles.main}>
      <Link href="/" className={styles.link}>
        View All Tasks
      </Link>
      <h1 className={styles.heading}>Add Task</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles['form-group']}>
          <label htmlFor="title" className={styles.label}>Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="content" className={styles.label}>Description:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            required
            className={styles.textarea}
          />
        </div>
        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </main>
  );
}
