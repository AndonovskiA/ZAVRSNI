import React from 'react';
import './App.css';
import MainMenu from './Components/MainMenu.component'; 
import MainPage from './Components/MainPage.component';
import ControlBoard from './Components/ControlBoard.component';
import addCategory from './Components/Category/addCategory.component';
import Categories from './Components/Category/categories.component';
import changeCategory from './Components/Category/changeCategory.component';
import addInstructor from './Components/Instructor/addInstructor.component';
import changeInstructor from './Components/Instructor/changeInstructor.component';
import Instructors from './Components/Instructor/instructors.component';
import addStudent from './Components/Student/addStudent.component';
import changeStudent from './Components/Student/changeStudent.component';
import Students from './Components/Student/students.component';
import addVehicle from './Components/Vehicle/addVehicle.component';
import changeVehicle from './Components/Vehicle/changeVehicle.component';
import Vehicles from './Components/Vehicle/vehicles.component';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function App() {
  return (
    <Router>
      <MainMenu />
      <Routes>
        <Route path= '/' element={<MainPage />} />
        <Route path= '/ControlBoard' element={<ControlBoard />} />
        <Route path= '/students' element={<Students />} />
        <Route path= "/Student/add" element={<addStudent />} />
        <Route path= "/Students/:ID" element={<changeStudent/>}/>
        <Route path= "/Categories" element= {<Categories />} />
        <Route path= "/Categories/add" element={<addCategory/>}/>
        <Route path= "/Categories/change" element={<changeCategory/>}/>
        <Route path= "/Instructors" element={<Instructors/>} />
        <Route path= "/Instructors/add" element={<addInstructor/>}/>
        <Route path= "/Instructors/change" element={<changeInstructor/>}/>
        <Route path= "/Vehicles" element={<Vehicles/>}/>
        <Route path= "/Vehicles/add" element={<addVehicle/>}/>
        <Route path= "/Vehicles/change" element={<changeVehicle/>}/>

      </Routes>
    </Router>
  );
}


