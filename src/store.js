export const initialStore = () => {
  return {
    characters: [],
    vehicles: [],
    planets: [],
    favorites: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "SET_CHARACTERS":
      return { ...store, characters: action.payload };
    case "SET_VEHICLES":
      return { ...store, vehicles: action.payload };
    case "SET_PLANETS":
      return { ...store, planets: action.payload };
    case "ADD_FAVORITE": {
      const exists = store.favorites.some(
        (fav) =>
          fav.uid === action.payload.uid && fav.type === action.payload.type
      );
      if (exists) return store;
      return { ...store, favorites: [...store.favorites, action.payload] };
    }
    case "REMOVE_FAVORITE": {
      return {
        ...store,
        favorites: store.favorites.filter(
          (fav) =>
            !(
              fav.uid === action.payload.uid && fav.type === action.payload.type
            )
        ),
      };
    }
    default:
      throw Error("Unknown action.");
  }
}
