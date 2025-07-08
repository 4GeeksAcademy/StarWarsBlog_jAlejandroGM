import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { getPlanetById } from "../api/swapi";
import FavoriteButton from "../components/FavoriteButton.jsx";

export const PlanetPage = () => {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPlanetById(id);
      setPlanet(data?.properties || null);
    };
    fetchData();
  }, [id]);

  if (!planet)
    return (
      <div className="container my-5">
        <div
          className="w-100 d-flex justify-content-center align-items-center"
          style={{ minHeight: 300 }}
        >
          <div
            className="spinner-border text-warning"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );

  return (
    <div className="container my-5">
      <div className="card text-bg-warning p-4">
        <div className="row g-4 align-items-center">
          <div className="col-md-4 text-center">
            <img
              src={rigoImageUrl}
              alt={planet.name}
              className="img-fluid class-img rounded"
            />
          </div>
          <div className="col-md-8">
            <div className="d-flex align-items-start justify-content-between">
              <h2 className="mb-3 fw-bold">{planet.name}</h2>
              <FavoriteButton uid={id} type="planet" name={planet.name} />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam ipsam inventore voluptates dignissimos. Laboriosam qui
              perspiciatis beatae magni aliquam fugit iure ducimus assumenda
              eius quod, dolor culpa eligendi accusamus delectus?
            </p>
          </div>
        </div>
        <hr />
        <div className="row text-center">
          <div className="col">
            <strong>Climate</strong>
            <div>{planet.climate}</div>
          </div>
          <div className="col">
            <strong>Terrain</strong>
            <div>{planet.terrain}</div>
          </div>
          <div className="col">
            <strong>Gravity</strong>
            <div>{planet.gravity}</div>
          </div>
          <div className="col">
            <strong>Diameter</strong>
            <div>{planet.diameter} km</div>
          </div>
          <div className="col">
            <strong>Rotation Period</strong>
            <div>{planet.rotation_period} h</div>
          </div>
          <div className="col">
            <strong>Orbital Period</strong>
            <div>{planet.orbital_period} d</div>
          </div>
          <div className="col">
            <strong>Population</strong>
            <div>{planet.population}</div>
          </div>
          <div className="col">
            <strong>Surface Water</strong>
            <div>{planet.surface_water}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
