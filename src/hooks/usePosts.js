import {useState, useEffect} from 'react'
import {fetchPosts, createPost, updatePost, deletePost} from '../services/posts.js'

const filterPosts = (posts, searchTerm) => {
    if(!searchTerm){
        return posts;
    }
    const toLowerCase = searchTerm.toLowerCase();
    return posts.filter(post =>
        post.title.toLowerCase().includes(toLowerCase) ||
        post.content.toLowerCase().includes(toLowerCase)
    )
}

export function usePosts({ search }){
    const [allPosts, setAllPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    
    useEffect(()=> {
        const getPosts= async () => {
            const postData = await fetchPosts();
            setAllPosts(postData);
            setPosts(filterPosts(postData, search)); 
        }
        getPosts();
    }, [search]);

    useEffect(()=>{
        setPosts(filterPosts(allPosts, search))
    },[allPosts, search]);

    const addPost = async ({title, content}) => {
        const newPost = await createPost({title, content});
        setAllPosts(prevPosts=> [newPost, ...prevPosts])
        return newPost;
    };
    const editPost = async (id, updatedData) => {
        const updated = await updatePost(id, updatedData);

        setAllPosts(prev =>
            prev.map(post =>
                post.id === id ? updated : post
            )
        );

        return updated;
    };

    const removePost = async (id) => {
        await deletePost(id);

        setAllPosts(prev =>
            prev.filter(post => post.id !== id)
        );
    };

    return {
        posts, addPost, editPost, removePost};
}