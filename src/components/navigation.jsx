import { Link } from 'react-router'

function Navigation() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <h1 className="text-xl font-bold">
          Front Posts
        </h1>

        <div className="flex gap-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/posts" className="hover:underline">
            Posts
          </Link>
        </div>

      </div>
    </nav>
  )
}

export default Navigation
