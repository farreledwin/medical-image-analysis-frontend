import React from 'react';
import './App.css';
import './App.scss';
import Header from './components/header/header.component';
import JumbotronContent from './components/jumbotron-content/jumbotron-content';
import UploadPhotos from './components/upload-photos/upload-photos.component';
import OurTeam from './components/our-team/our-team.component';

function App() {
	return (
		<div className="app">
			<Header/>
			<JumbotronContent/>
			<UploadPhotos/>
			<OurTeam/>
		</div>
	);
}

export default App;
