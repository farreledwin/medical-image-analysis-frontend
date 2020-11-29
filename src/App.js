import React,{ useEffect,useState } from 'react';
import './App.css';
import './App.scss';
import JumbotronContent from './components/jumbotron-content/jumbotron.component';
import UploadPhotos from './components/upload-photos/upload-photos.component';
import OurTeam from './components/our-team/our-team.component';
import Header from './components/header/header.component';
import AOS from "aos";
import "aos/dist/aos.css";
import Particles from 'react-particles-js';
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";
import ImageRegistrationPhotos from './components/image-registration-photos/image-registration-photos-component';

function App() {
	useEffect(() => {
		AOS.init();
    	AOS.refresh();
	},[])

	const[isFetching,setIsFetching] = useState(false);

	const handleChange = () => {
		setIsFetching(!isFetching);
	}

	return (
		<div className="app">
		<LoadingMask loading={isFetching ? true: false} loadingText={"LOADING ANALYZE THE RESULTS..."}>
        <div>
		<Particles />
			<Header/>
			<JumbotronContent/>
			<UploadPhotos handleChange={handleChange}/>
			<ImageRegistrationPhotos handleChange={handleChange}/>
			<OurTeam/>
        </div>
      </LoadingMask>

		</div>
	);
}

export default App;
