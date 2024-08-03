import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";

const CityContext = createContext();

function reducer(state, action) {
  // Your reducer logic here
  switch (action.type) {
    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };
    case "cities/new":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
      };
    case "cities/deleted":
      return {
        ...state,
        cities: state.cities.filter((c) => c.id !== action.payload),
        isLoading: false,
      };
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "currentCity/loaded":
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };
    case "rejected":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case "changePosition":
      return {
        ...state,
        position: action.payload,
      };

    default:
      throw new Error(`Invalid action ${action.type}`);
  }
}

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  position: [],
  error: "",
};

function CityProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  // const [position, setPosition] = useState([]);

  const [{ cities, isLoading, currentCity, position }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchData() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch("http://localhost:9000/cities");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: err.message });
      }
    }
    fetchData();
  }, []);

  const getCity = useCallback(async function getCity(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`http://localhost:9000/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "currentCity/loaded", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }, []);

  const postCity = useCallback(async function postCity(body) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch("http://localhost:9000/cities", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "cities/new", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }, []);

  const deleteCity = useCallback(async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`http://localhost:9000/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "cities/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  });
  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        position,
        dispatch,
        postCity,
        deleteCity,
        currentCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export { CityContext, CityProvider };
