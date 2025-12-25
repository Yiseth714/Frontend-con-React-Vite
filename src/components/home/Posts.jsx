import React from 'react'
import { Link } from 'react-router'

function Posts({ id, title, content, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 h-full flex flex-col">

      <h3 className="text-lg font-semibold mb-2">
        {title}
      </h3>

      <p className="text-gray-700 flex-grow">
        {content}
      </p>

      <Link
        to={`/posts/${id}`}
        className="text-blue-500 hover:underline mt-2 inline-block"
      >
        Read More
      </Link>

      <div className="flex gap-2 mt-4">
        <button
          onClick={onEdit}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded text-sm"
        >
          Editar
        </button>

        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Eliminar
        </button>
      </div>

    </div>
  )
}

export default Posts
