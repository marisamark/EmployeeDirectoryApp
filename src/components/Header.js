import React from 'react';
// import React, { Component } from 'react';
import "../styles/Header.css";

const Header = () => {
  return (
    <div className="header">
      <h1>Employee Directory</h1>
      <p>Click on carrots to filter by heading or use the search box to narrow your results.</p>
    </div>
  )
}

export default Header;
// export default class Header extends Component {
//   render() {
//     return (
//       <div className="header">
//         <h1>Employee Directory</h1>
//         <p>Click on carrots to filter by heading or use the search box to narrow your results.</p>
//       </div>
//     )
//   }
// }

