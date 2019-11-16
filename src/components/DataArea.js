import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import Nav from "./Nav";
import API from "../utils/API";
import "../styles/DataArea.css";
import APIContext from "../utils/APIContext";

export default function DataArea() {

  const [stuff, setStuff] = useState({
    users: [{}],
    order: "descend",
    filteredUsers: [{}],
    headings: [
      { name: "Image", width: "10%" },
      { name: "Name", width: "10%" },
      { name: "Phone", width: "20%" },
      { name: "Email", width: "20%" },
      { name: "DOB", width: "10%" }
    ],

  })


  useEffect(() => {
    API.getUsers().then(results => {
      setStuff({
        users: results.data.results,
        order: stuff.order,
        headings: stuff.headings,
        filteredUsers: results.data.results,
      });
    })
   }, []);

    // useEffect(()=>{
    //   console.log("Order changed!")

    // }, [stuff.order]);

    const handleSort = heading => {
      // console.log(heading, stuff.order)
      if (stuff.order === "descend") {
        setStuff({
          order: "ascend",
          users: stuff.users,
          filteredUsers: stuff.filteredUsers,
          headings: stuff.headings
        })
      } else {
        setStuff({
          order: "descend",
          users: stuff.users,
          filteredUsers: stuff.filteredUsers,
          headings: stuff.headings
        })
      }

      const compareFnc = (a, b) => {
        if (stuff.order === "ascend") {
          // account for missing values
          if (a[heading] === undefined) {
            return 1;
          } else if (b[heading] === undefined) {
            return -1;
          }
          // numerically
          else if (heading === "name") {
            return a[heading].first.localeCompare(b[heading].first);
          } else {
            return a[heading] - b[heading];
          }
        } else {
          // account for missing values
          if (a[heading] === undefined) {
            return 1;
          } else if (b[heading] === undefined) {
            return -1;
          }
          // numerically
          else if (heading === "name") {
            return b[heading].first.localeCompare(a[heading].first);
          } else {
            return b[heading] - a[heading];
          }
        }

      }
      const sortedUsers = stuff.filteredUsers.sort(compareFnc);

      // console.log(sortedUsers)
      setStuff({
        filteredUsers: sortedUsers,
        order: stuff.order,
        users: stuff.order,
        headings: stuff.headings
      });
    }

    const handleSearchChange = event => {
      console.log(event.target.value);
      const filter = event.target.value;
      const filteredList = stuff.users.filter(item => {
        // merge data together, then see if user input is anywhere inside
        let values = Object.values(item)
          .join("")
          .toLowerCase();
        return values.indexOf(filter.toLowerCase()) !== -1;
      });
      setStuff({
        filteredUsers: filteredList,
        headings: stuff.headings,
        users: stuff.users,
        order: stuff.order
      });
    }




    return (
      <APIContext.Provider value={ stuff }>
        <Nav 
        handleSearchChange={handleSearchChange}
         />
        <div className="data-area">
          <DataTable
          handleSort={handleSort}
          />
        </div>
      </APIContext.Provider>
    );
  }
  


    // useEffect(() => {
    //   console.log("API Fired")
    //   const getAPI = async () => {
    //     try {
    //       const results = await API.getUsers();
    //       setStuff({
    //         ...stuff,
    //         order: "ascend",
    //         users: results.data.results,
    //         filteredUsers: results.data.results
    //       })
    //     } catch (err) {
    //       console.log(err.message)
    //     }
    //   }
    //   getAPI();

    // }, [])





  // return (
  //   <>
  //     <Nav handleSearchChange={stuff.handleSearchChange} />
  //     <div className="data-area">
  //       <DataTable
  //         headings={stuff.headings}
  //         users={stuff.filteredUsers}
  //         handleSort={handleSort}
  //       />
  //     </div>
  //   </>
  // );