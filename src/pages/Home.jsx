import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import FavoriteButton from "../components/FavoriteButton.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getCharacters, getPlanets, getVehicles } from "../api/swapi.js";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem("selectedCategory") || null;
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
      localStorage.setItem("selectedCategory", selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (!selectedCategory) return;

    const fetchData = async () => {
      setLoading(true);
      let result = [];
      if (selectedCategory === "Characters") {
        if (store.characters.length > 0) {
          setData(store.characters);
        } else {
          result = await getCharacters();
          setData(result);
          dispatch({ type: "SET_CHARACTERS", payload: result });
        }
      } else if (selectedCategory === "Vehicles") {
        if (store.vehicles.length > 0) {
          setData(store.vehicles);
        } else {
          result = await getVehicles();
          setData(result);
          dispatch({ type: "SET_VEHICLES", payload: result });
        }
      } else if (selectedCategory === "Planets") {
        if (store.planets.length > 0) {
          setData(store.planets);
        } else {
          result = await getPlanets();
          setData(result);
          dispatch({ type: "SET_PLANETS", payload: result });
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedCategory, store, dispatch]);

  const totalPages =
    Math.ceil(
      (Array.isArray(data.results) ? data.results.length : data.length) /
        itemsPerPage
    ) || 1;
  const paginatedData = (
    Array.isArray(data.results) ? data.results : data
  ).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12 col-md-3 mb-4 mb-md-0">
          <div
            className="btn-group-vertical w-100"
            role="group"
            aria-label="Vertical radio toggle button group"
          >
            <p className="letter-spacing text-secondary fw-bold lead mb-2">
              BROWSE
            </p>
            <input
              type="radio"
              className="btn-check"
              name="vbtn-radio"
              id="Characters"
              autoComplete="off"
              checked={selectedCategory === "Characters"}
              onChange={() => setSelectedCategory("Characters")}
            />
            <label
              className={`btn rounded-0 border-0 text-start left-bar ${
                selectedCategory === "Characters"
                  ? "text-warning active"
                  : "text-light"
              }`}
              htmlFor="Characters"
            >
              CHARACTERS
            </label>
            <input
              type="radio"
              className="btn-check"
              name="vbtn-radio"
              id="Vehicles"
              autoComplete="off"
              checked={selectedCategory === "Vehicles"}
              onChange={() => setSelectedCategory("Vehicles")}
            />
            <label
              className={`btn rounded-0 border-0 text-start left-bar ${
                selectedCategory === "Vehicles"
                  ? "text-warning active"
                  : "text-light"
              }`}
              htmlFor="Vehicles"
            >
              VEHICLES
            </label>
            <input
              type="radio"
              className="btn-check"
              name="vbtn-radio"
              id="Planets"
              autoComplete="off"
              checked={selectedCategory === "Planets"}
              onChange={() => setSelectedCategory("Planets")}
            />
            <label
              className={`btn rounded-0 border-0 text-start left-bar ${
                selectedCategory === "Planets"
                  ? "text-warning active"
                  : "text-light"
              }`}
              htmlFor="Planets"
            >
              PLANETS
            </label>
          </div>
        </div>

        <div className="col-12 col-md-9 d-flex flex-wrap gap-4">
          {loading ? (
            <div
              className="w-100 d-flex justify-content-center align-items-center"
              style={{ minHeight: 200 }}
            >
              <div
                className="spinner-border text-warning"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : Array.isArray(data) && data.length === 0 ? (
            <p>No results found.</p>
          ) : (
            <>
              {paginatedData.map((item) => {
                let type = "character";
                if (selectedCategory === "Vehicles") type = "vehicle";
                if (selectedCategory === "Planets") type = "planet";
                return (
                  <div className="card menu-card text-bg-dark" key={item.uid}>
                    <img src={rigoImageUrl} alt="img" className="card-img" />
                    <div className="card-body d-flex flex-column align-items-start">
                      <h5 className="card-title mb-3">{item.name}</h5>
                      <div className="d-flex w-100 align-items-center gap-2">
                        <Link
                          to={
                            selectedCategory === "Characters"
                              ? `/character/${item.uid}`
                              : selectedCategory === "Vehicles"
                              ? `/vehicle/${item.uid}`
                              : `/planet/${item.uid}`
                          }
                          className="btn btn-warning flex-grow-1"
                        >
                          More details
                        </Link>
                        <FavoriteButton
                          uid={item.uid}
                          type={type}
                          name={item.name}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* PAGINATION CONTROLS */}
              {!loading && totalPages > 1 && (
                <nav className="w-100 d-flex justify-content-center mt-4">
                  <ul className="pagination">
                    <li
                      className={`page-item${
                        currentPage === 1 ? " disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link bg-dark border-warning text-warning"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, idx) => (
                      <li
                        key={idx}
                        className={`page-item${
                          currentPage === idx + 1 ? " active" : ""
                        }`}
                      >
                        <button
                          className={`page-link border-warning ${
                            currentPage === idx + 1
                              ? "bg-warning text-dark fw-bold"
                              : "bg-dark text-warning"
                          }`}
                          onClick={() => setCurrentPage(idx + 1)}
                        >
                          {idx + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item${
                        currentPage === totalPages ? " disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link bg-dark border-warning text-warning"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
