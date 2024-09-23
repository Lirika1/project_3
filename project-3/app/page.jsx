import Link from 'next/link';
import Post from './components/Post';
import styles from './page.module.css';
import prisma from '@/lib/prisma';

async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();
  
  return (
    <main className={styles.main}>
      <Link href={'/add-post'} className="button">Add Task</Link>
      <h1 className={styles.heading}>TO DO BOXES</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            authorName={post.author.name}
          />
        ))
      ) : (
        <p>No tasks available.</p>
      )}
    </main>
  );
}
