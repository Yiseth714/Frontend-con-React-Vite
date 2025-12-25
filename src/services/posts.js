export async function fetchPosts(){
    try {
        const response= await fetch('http://localhost:3001/api/posts')
        const data = await response.json()

        return data
    } catch (error) {
        console.error('Error fetching posts: ', error)
        return []
    }
}

export async function createPost({title, content}){
    try {
        const response = await fetch('http://localhost:3001/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, content})

        })
        if(!response.ok){
            throw new Error(`Error al crear el post: ${response.statusText}`)
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creando el post: ', error)
        throw error;
    }
}

export async function updatePost(id, { title, content }) {
    try {
        const response = await fetch(`http://localhost:3001/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar el post: ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error actualizando el post: ', error);
        throw error;
    }
}

export async function deletePost(id) {
    try {
        const response = await fetch(`http://localhost:3001/api/posts/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar el post: ${response.statusText}`);
        }

        return true;

    } catch (error) {
        console.error('Error eliminando el post: ', error);
        throw error;
    }
}

