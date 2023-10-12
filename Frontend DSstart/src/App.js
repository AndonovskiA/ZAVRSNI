import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Menu from './components/Highway.comp.startpage/Menu.component'; 
import Pocetna from './components/pocetna.component';
import NadzornaPloca from './components/nadzornaploca.component';
import Smjerovi from './components/smjer/smjerovi.component';
import DodajSmjer from './components/smjer/dodajSmjer.component';
import PromjeniSmjer from './components/smjer/promjeniSmjer.component';
import Polaznici from './components/polaznik/polaznici.component';
import DodajPolaznik from './components/polaznik/dodajPolaznik.component';
import PromjeniPolaznik from './components/polaznik/promjeniPolaznik.component';

export default function App() {
  return (
    <Router>
      <Izbornik />
      <Routes>
        <Route path='/' element={<Menu />} />
        <Route path='/nadzornaploca' element={<NadzornaPloca />} />
         <Route path='/smjerovi' element={<Smjerovi />} />
        <Route path="/smjerovi/dodaj" element={<DodajSmjer />} />
        <Route path="/smjerovi/:sifra" element={<PromjeniSmjer />} />
        <Route path="/polaznici" element={<Polaznici />} />
          <Route path="/polaznici/dodaj" element={<DodajPolaznik />} />
          <Route path="/polaznici/:sifra" element={<PromjeniPolaznik />} />
      </Routes>
     
    </Router>
  );
}
