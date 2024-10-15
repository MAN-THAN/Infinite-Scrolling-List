import { useEffect, useState } from "react";
import Card from "./components/card";

const MoviesList = () => {
  const [moviesList, setMoviesList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("13+");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const fetchMovieList = async () => {
    setLoading(true);
    try {
      const url =
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
      const res = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
        },
      });
      const data = await res.json();
      setMoviesList(data.results);
      setFilteredMovies(data.results);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovieList();
  }, []);
  useEffect(() => {
    if (!moviesList) return;
    let sortedMovies = [...moviesList];
    if (sort === "vote_count") {
      sortedMovies.sort((a, b) => b.vote_count - a.vote_count);
    } else if (sort === "popularity") {
      sortedMovies.sort((a, b) => b.popularity - a.popularity);
    } else if (sort === "release_date") {
      sortedMovies.sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
      );
    }
    if (filter) {
      const filtered = sortedMovies.filter((item) => {
        if (filter === "13+") {
          return item.adult === false;
        } else return item.adult === true;
      });
      setFilteredMovies(filtered);
    }
  }, [sort, filter]);
  if (err) {
    return <>Some Error Occurees!!!</>;
  }
  if (loading) {
    return <>Loading....</>;
  }
  console.log(moviesList);
  const handleSort = (e) => {
    console.log(e.target.value);
    setSort(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          minHeight: "2em",
          padding: "1em",
          gap: "2em",
        }}
      >
        <label for="cars">Sort : </label>
        <select name="cars" id="cars" value={sort} onChange={handleSort}>
          <option disabled value="">
            Select
          </option>
          <option value="vote_count">Vote count</option>
          <option value="popularity">Popularity</option>
          <option value="release_date">Release Date</option>
        </select>
        <label for="cats">Filter : </label>
        <select name="cats" id="cats" value={filter} onChange={handleFilter}>
          <option value="13+">13+</option>
          <option value="adult">Adult</option>
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1em",
          justifyContent: "center",
        }}
      >
        {filteredMovies?.map((item, ind) => (
          <Card
            key={ind}
            imageUrl={item.backdrop_path}
            title={item.title}
            release_date={item.release_date}
            id={item.id}
          />
        ))}
      </div>
    </>
  );
};
export default MoviesList;
