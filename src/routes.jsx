import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { CharacterPage } from "./pages/CharacterPage";
import { VehiclePage } from "./pages/VehiclePage";
import { PlanetPage } from "./pages/PlanetPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route path="/" element={<Home />} />
      <Route path="/character/:id" element={<CharacterPage />} />
      <Route path="/vehicle/:id" element={<VehiclePage />} />
      <Route path="/planet/:id" element={<PlanetPage />} />
    </Route>
  )
);
