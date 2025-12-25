import React, { useState } from 'react'

// components
import Navigation from '../components/navigation'
import Post from '../components/home/Posts'
import { usePosts } from '../hooks/usePosts'

function Home() {
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: '', content: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [editId, setEditId] = useState(null)

  const { posts, addPost, editPost, removePost } = usePosts({ search })

  const handleChangeSearch = (e) => setSearch(e.target.value)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      if (!formData.title.trim() || !formData.content.trim()) {
        setError('El título y el contenido son requeridos')
        return
      }

      if (editId !== null) {
        await editPost(editId, formData)
      } else {
        await addPost(formData)
      }

      setFormData({ title: '', content: '' })
      setEditId(null)
      setShowForm(false)

    } catch (err) {
      setError(err.message || 'Error al crear o editar el post')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setFormData({ title: '', content: '' })
    setEditId(null)
    setShowForm(false)
    setError(null)
  }

  const handleEditPost = (id, title, content) => {
    setEditId(id)
    setFormData({ title, content })
    setShowForm(true)
  }

  const handleDeletePost = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este post?')) {
      await removePost(id)
    }
  }

  return (
    <>
      <Navigation />

      {/* CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-6">Home</h1>

        {/* SEARCH */}
        <input
          type="search"
          placeholder="Buscar un Post"
          value={search}
          onChange={handleChangeSearch}
          className="w-full mb-6 px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
        />

        {/* CREATE / FORM */}
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-6"
          >
            Crear nuevo post
          </button>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editId ? 'Editar Post' : 'Crear un nuevo Post'}
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="mb-4">
                <label className="block font-medium mb-1">Título</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-1">Contenido</label>
                <textarea
                  name="content"
                  rows={4}
                  value={formData.content}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {isSubmitting
                    ? (editId ? 'Actualizando...' : 'Creando...')
                    : (editId ? 'Actualizar Post' : 'Crear Post')}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* POSTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map(({ id, title, content }) => (
            <Post
              key={id}
              id={id}
              title={title}
              content={content}
              onEdit={() => handleEditPost(id, title, content)}
              onDelete={() => handleDeletePost(id)}
            />
          ))}
        </div>

      </div>
    </>
  )
}

export default Home
