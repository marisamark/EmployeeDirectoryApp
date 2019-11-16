import React from "react";

const APIContext = React.createContext({

    // headings: [
    //     { name: "Image", width: "10%" },
    //     { name: "Name", width: "10%" },
    //     { name: "Phone", width: "20%" },
    //     { name: "Email", width: "20%" },
    //     { name: "DOB", width: "10%" }
    //   ]

});

export default APIContext;

//user effect function, load some users, 
//put them somewhere and pass them into the context