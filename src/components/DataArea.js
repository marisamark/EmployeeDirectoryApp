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
    heading: "Name",
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
    console.log("LoadUsers")
    API.getUsers().then(results => {
      setStuff(stuff => ({
        ...stuff,
        order: stuff.order,
        filteredUsers: results.data.results,
      }));
    })
  }, []);

  useEffect(() => {
    console.log("Order changed!", stuff.heading, stuff.filteredUsers)

    const compareFnc = (a, b) => {
      const isHigher = () => {
        if (a[stuff.heading] && !b[stuff.heading]) return true
        if (!a[stuff.heading] && b[stuff.heading]) return false
        if (stuff.heading === "name") {
          return a.name.first > b.name.first
        }
        else if (stuff.heading === "email") {
          return a.email > b.email
        }
        else if (stuff.heading === "phone") {
          return a.phone > b.phone
        }
        else if (stuff.heading === "dob") {
          return new Date(a.dob.date) > new Date(b.dob.date)
        }
      }

      if (stuff.order === "ascend") {
        return isHigher() ? 1 : -1
      } else {
        return !isHigher() ? 1 : -1
      }
    }

    const sortedUsers = stuff.filteredUsers.sort(compareFnc);

    // console.log(sortedUsers)
    setStuff(stuff => ({
      ...stuff,
      filteredUsers: sortedUsers,
    }));
  }, [stuff.order, stuff.heading, stuff.filteredUsers]);

  const handleSort = heading => {
    // console.log(heading, stuff.order)
    if (stuff.order === "descend") {
      setStuff({
        ...stuff,
        heading,
        order: "ascend",
      })
    } else {
      setStuff({
        ...stuff,
        heading,
        order: "descend",
      })
    }

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
    <APIContext.Provider value={stuff}>
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