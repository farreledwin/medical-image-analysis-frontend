import React,{ useEffect,useState } from 'react';
import './App.css';
import './App.scss';
import Header from './components/header/header.component';
import HomePage from './pages/home/home.component';
import PreProcessingPage from './pages/pre-processing/pre-processing.component';
import "react-loadingmask/dist/react-loadingmask.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Particles from 'react-particles-js';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';

function App() {
	useEffect(() => {
		AOS.init();
    	AOS.refresh();
	},[])

	return (
		<div className="app">
			<Router>
			<Particles />
			  <Header />
			<Switch>
			  <Route exact path="/" component={HomePage} />
			  <Route exact path="/pre-processing" component={PreProcessingPage} />
			</Switch>
			  </Router>

			
		</div>
	);
}

export default App;
