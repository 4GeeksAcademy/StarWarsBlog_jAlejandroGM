import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const FavoriteButton = ({ uid, type, name }) => {
  const { store, dispatch } = useGlobalReducer();
  const isFav = store.favorites.some(
    (fav) => fav.uid === uid && fav.type === type
  );

  return (
    <button
      className={`btn btn-outline-danger px-2 py-1`}
      title={isFav ? "Remove from favorites" : "Add to favorites"}
      onClick={() => {
        if (isFav) {
          dispatch({ type: "REMOVE_FAVORITE", payload: { uid, type } });
        } else {
          dispatch({ type: "ADD_FAVORITE", payload: { uid, name, type } });
        }
      }}
    >
      <i
        className={`bi ${isFav ? "bi-heart-fill text-danger" : "bi-heart"}`}
      ></i>
    </button>
  );
};

export default FavoriteButton;
