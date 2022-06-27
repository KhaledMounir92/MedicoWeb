import "./list.css"
import Sidebar from "../../../components/shared/sidebar/Sidebar"
import Navbar from "../../../components/shared/navbar/Navbar"
import Datatable from "../../../components/datatable/Datatable"
import React from "react"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default List
