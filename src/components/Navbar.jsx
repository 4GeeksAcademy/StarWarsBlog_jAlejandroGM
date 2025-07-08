import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const favorites = store.favorites;

  return (
    <nav className="navbar bg-gradient d-flex justify-content-between align-items-center px-5 py-3">
      <Link to="/">
        <img
          src="src/assets/img/starwars-logo.png"
          alt="Star Wars Logo"
          height="50"
        />
      </Link>
      <div className="dropdown">
        <button
          className="btn btn-dark position-relative dropdown-toggle d-flex align-items-center"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-heart-fill text-warning me-2"></i>
          Favorites
          <span className="badge bg-danger ms-2">{favorites.length}</span>
        </button>
        <ul
          className="dropdown-menu dropdown-menu-end mt-2"
          style={{ minWidth: 220 }}
        >
          {favorites.length === 0 ? (
            <li className="dropdown-item text-secondary">No favorites yet</li>
          ) : (
            favorites.map((fav) => {
              let route = "/";
              if (fav.type === "character") route = `/character/${fav.uid}`;
              if (fav.type === "vehicle") route = `/vehicle/${fav.uid}`;
              if (fav.type === "planet") route = `/planet/${fav.uid}`;
              return (
                <li
                  key={fav.uid + fav.type}
                  className="dropdown-item d-flex justify-content-between align-items-center"
                  style={{ cursor: "pointer" }}
                >
                  <Link
                    to={route}
                    className="text-decoration-none text-dark flex-grow-1"
                  >
                    {fav.name}{" "}
                    <span className="badge bg-secondary ms-1">{fav.type}</span>
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger ms-2"
                    title="Remove from favorites"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      dispatch({
                        type: "REMOVE_FAVORITE",
                        payload: { uid: fav.uid, type: fav.type },
                      });
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </nav>
  );
};
