import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import ListGroup from "./listGroup";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageCount: 4,
    searchQuery: "",
    selectedItem: null,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const { data: movies } = await getMovies();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ movies, genres });
  }

  handleDelete = async (movieId) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((movie) => movie._id !== movieId);
    this.setState({ movies });

    try {
      await deleteMovie(movieId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("The movie has already been deleted.");

      this.setState({ originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = this.state.movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGroupClick = (group) => {
    this.setState({ selectedItem: group, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedItem: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPageData = () => {
    const {
      pageCount,
      currentPage,
      selectedItem,
      searchQuery,
      movies: allMovies,
      sortColumn,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedItem && selectedItem._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedItem._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageCount);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageCount, searchQuery, currentPage, sortColumn } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>There are no movies in the database</p>;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              genres={this.state.genres}
              activeGroup={this.state.selectedItem}
              onGroupClick={this.handleGroupClick}
            />
          </div>
          <div className="col">
            {user && (
              <Link to="/movies/new" className="btn btn-primary btn-lg m-2">
                +New Movie
              </Link>
            )}
            <p>There are {totalCount} movies showing</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemCount={totalCount}
              pageSize={pageCount}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
