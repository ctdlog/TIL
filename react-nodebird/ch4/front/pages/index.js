import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import AppLayout from '../components/AppLayout';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
	const dispatch = useDispatch();
	const { me } = useSelector((state) => state.user);
	const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
		(state) => state.post
	);

	useEffect(() => {
		dispatch({
			type: LOAD_POSTS_REQUEST,
		});
	}, []);

	useEffect(() => {
		function onScroll() {
			console.log(window.scrollY + document.documentElement.clientHeight);
			console.log(document.documentElement.scrollHeight - 300);

			if (
				window.scrollY + document.documentElement.clientHeight >
				document.documentElement.scrollHeight - 300
			) {
				console.log(hasMorePosts, loadPostsLoading);
				if (hasMorePosts && !loadPostsLoading) {
					dispatch({
						type: LOAD_POSTS_REQUEST,
						data: mainPosts[mainPosts.length - 1].id,
					});
				}
			}
		}
		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [mainPosts, hasMorePosts, loadPostsLoading]);

	return (
		<AppLayout>
			{me && <PostForm />}
			{mainPosts.map((c) => (
				<PostCard key={c.id} post={c} />
			))}
		</AppLayout>
	);
};

export default Home;
