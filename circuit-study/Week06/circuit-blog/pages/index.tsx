import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '../lib/api';
import styles from '../styles/Home.module.css';

type PostType = {
  slug: string;
  title: string;
  author: string;
};

const Home: NextPage<{ posts: PostType[] }> = ({ posts }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        {posts.map((post, index) => (
          <Link href={`posts/${post.slug}`} key={index}>
            {post.title}
          </Link>
        ))}
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const posts = getAllPosts(['slug', 'title', 'date']);

  // getStaticProps에서 반환하는 객체는 페이지 컴포넌트의 props로 넘어갑니다.
  return {
    props: {
      posts,
    },
  };
}

export default Home;
