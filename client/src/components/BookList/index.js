import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";
import DeleteBtn from "../DeleteBtn";
import Button from "../Button"

// Exporting both BookList and BookListItem from this file

// BookList renders a bootstrap list item
export function BookList({ children }) {
  return <ul className="list-group">{children}</ul>;
}


// BookListItem renders a bootstrap list item containing data from the Book api call
export function BookListItem({
  thumbnail = "https://placehold.it/300x300",
  title,
  description,
  href,
  author = [""],
  children
}) {

// const handleClick = (event) => {
//   event.preventDefault();
//   buttonFunc();
// }

  return (
 <li className="list-group-item">{children}</li>
 );
}

export default BookList
