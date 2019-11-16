import React from "react";

const APIContext = React.createContext({

headings: [{}],
users: [{}],
filteredUsers: [{}]
});

export default APIContext;

//user effect function, load some users, 
//put them somewhere and pass them into the context