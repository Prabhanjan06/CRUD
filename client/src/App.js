import React from "react";
import CrudForm from "./views/CrudForm";
import UpdateForm from "./views/UpdateForm";
import DeleteForm from "./views/DeleteForm";
import GetForm from "./views/GetForm";

function App() {
  return (
    <>
      <h1 className="text-center">Crud Operations</h1>
      <CrudForm />
      <UpdateForm />
      <DeleteForm />
      <GetForm />
    </>
  );
}

export default App;
