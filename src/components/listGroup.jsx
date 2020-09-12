import React from "react";

const ListGroup = (props) => {
  const {
    genres,
    activeGroup,
    onGroupClick,
    textProperty,
    valueProperty,
  } = props;
  return (
    <ul className="list-group" style={{ marginTop: 10 }}>
      {genres.map((genre) => (
        <li
          key={genre[valueProperty]}
          className={
            genre === activeGroup ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onGroupClick(genre)}
          style={{ cursor: "pointer" }}
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
