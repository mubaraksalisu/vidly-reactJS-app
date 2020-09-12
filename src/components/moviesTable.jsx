import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    {
      label: "Title",
      path: "title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { label: "Genre", path: "genre.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Rate", path: "dailyRentalRate" },
    {
      key: "like",
      content: (movie) => (
        <Like like={movie.liked} likeToggle={() => this.props.onLike(movie)} />
      ),
    },
  ];

  deleteColumn = {
    key: "button",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie._id)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        sortColumn={sortColumn}
        onSort={onSort}
        columns={this.columns}
        data={movies}
      />
      //   <table className="table">
      //     <TableHeader
      //       columns={this.columns}
      //       onSort={onSort}
      //       sortColumn={sortColumn}
      //     />

      //     <TableBody data={movies} columns={this.columns} />
      //   </table>
    );
  }
}

export default MoviesTable;
