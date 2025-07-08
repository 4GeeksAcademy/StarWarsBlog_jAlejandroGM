import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { getVehicleById } from "../api/swapi";
import FavoriteButton from "../components/FavoriteButton.jsx";

export const VehiclePage = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getVehicleById(id);
      setVehicle(data?.properties || null);
    };
    fetchData();
  }, [id]);

  if (!vehicle)
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
              alt={vehicle.name}
              className="img-fluid class-img rounded"
            />
          </div>
          <div className="col-md-8">
            <div className="d-flex align-items-start justify-content-between">
              <h2 className="mb-3 fw-bold">{vehicle.name}</h2>
              <FavoriteButton uid={id} type="vehicle" name={vehicle.name} />
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
            <strong>Model</strong>
            <div>{vehicle.model}</div>
          </div>
          <div className="col">
            <strong>Manufacturer</strong>
            <div>{vehicle.manufacturer}</div>
          </div>
          <div className="col">
            <strong>Vehicle Class</strong>
            <div>{vehicle.vehicle_class}</div>
          </div>
          <div className="col">
            <strong>Length</strong>
            <div>{vehicle.length} m</div>
          </div>
          <div className="col">
            <strong>Cargo Capacity</strong>
            <div>{vehicle.cargo_capacity}</div>
          </div>
          <div className="col">
            <strong>Passengers</strong>
            <div>{vehicle.passengers}</div>
          </div>
          <div className="col">
            <strong>Crew</strong>
            <div>{vehicle.crew}</div>
          </div>
          <div className="col">
            <strong>Max Speed</strong>
            <div>{vehicle.max_atmosphering_speed}</div>
          </div>
          <div className="col">
            <strong>Consumables</strong>
            <div>{vehicle.consumables}</div>
          </div>
          <div className="col">
            <strong>Cost</strong>
            <div>{vehicle.cost_in_credits} credits</div>
          </div>
        </div>
      </div>
    </div>
  );
};
