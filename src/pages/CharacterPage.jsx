import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { getCharacterById } from "../api/swapi";
import FavoriteButton from "../components/FavoriteButton.jsx";

export const CharacterPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacterById(id);
      setCharacter(data?.properties || null);
    };
    fetchData();
  }, [id]);

  if (!character)
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
              alt={character.name}
              className="img-fluid class-img rounded"
            />
          </div>
          <div className="col-md-8">
            <div className="d-flex align-items-start justify-content-between">
              <h2 className="mb-3 fw-bold">{character.name}</h2>
              <FavoriteButton uid={id} type="character" name={character.name} />
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
            <strong>Gender</strong>
            <div>{character.gender}</div>
          </div>
          <div className="col">
            <strong>Birth Year</strong>
            <div>{character.birth_year}</div>
          </div>
          <div className="col">
            <strong>Height</strong>
            <div>{character.height} cm</div>
          </div>
          <div className="col">
            <strong>Mass</strong>
            <div>{character.mass} kg</div>
          </div>
          <div className="col">
            <strong>Hair Color</strong>
            <div>{character.hair_color}</div>
          </div>
          <div className="col">
            <strong>Skin Color</strong>
            <div>{character.skin_color}</div>
          </div>
          <div className="col">
            <strong>Eye Color</strong>
            <div>{character.eye_color}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
