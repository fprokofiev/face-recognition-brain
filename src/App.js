import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import './App.css';
import 'tachyons';

const particlesOptions = {
	particles: {
		number: {
			value: 50,
			density: {
				enable: true,
				value_area: 800
			}
		},
		size: {
			value: 3
		}
	}
}

const app = new Clarifai.App({
	apiKey: '8cf6f2ada0ba459e906cac41005fb858'
});

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			boxes: {},
			route: 'signin',
			isSignedIn: false,
			user: {
				id: '',
				name: '',
				email: '',
				entries: 0,
				joined: ''
			}
		}
	}

	loadUser = (data) => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined
			}
		})
	}

	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState({ isSignedIn: false })
		} else if (route === 'home') {
			this.setState({ isSignedIn: true })
		}
		this.setState({route: route});
	}

	calculateFaceLocation = (data) => {
		const regions = data.outputs[0].data.regions;
		const faceBoxes = [];
		for (let region of regions) {
			let clarifaiBox = region.region_info.bounding_box;
			let box = {
				top: (clarifaiBox.top_row * 100) +'%',
				right: (100 - (clarifaiBox.right_col * 100)) +'%',
				bottom: (100 - (clarifaiBox.bottom_row * 100)) +'%',
				left: (clarifaiBox.left_col * 100) +'%'
			}
			faceBoxes.push(box);
		}
		return faceBoxes
	}

	displayFaceBoxes = (boxes) => {
		this.setState({boxes: boxes});
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value })
	}

	onPictureSubmit = () => {
		this.setState({ imageUrl: this.state.input });
		app.models
			.predict(
				Clarifai.FACE_DETECT_MODEL,
				this.state.input)
			.then(response => {
				if (response) {
					fetch('http://localhost:3001/image', {
						method: 'put',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({
							id: this.state.user.id
						})
					})
						.then(response => response.json())
						.then(count => {
							this.setState(Object.assign(this.state.user, { entries: count }))
						})
				}
				this.displayFaceBoxes(this.calculateFaceLocation(response))
			})
			.catch(err => console.log(err))
	}

	render() {
		const { isSignedIn, imageUrl, boxes, route } = this.state;
		return (
			<div className="App">
				<Particles className='particle fixed top-0 right-0 bottom-0 left-0'
					params= { particlesOptions }
				/>
				<Navigation
					isSignedIn = { isSignedIn }
					onRouteChange = { this.onRouteChange }
				/>
				{ route === 'home'
					? <div>
						<Logo />
						<Rank name= { this.state.user.name } entries= { this.state.user.entries } />
						<ImageLinkForm
							onInputChange= { this.onInputChange }
							onPictureSubmit= { this.onPictureSubmit }
						/>
						<FaceRecognition
							imageUrl= { imageUrl }
							boxes= { boxes } />
					</div>
					: (
						route === 'signin'
						? <SignIn loadUser={this.loadUser} onRouteChange = { this.onRouteChange } />
						: <Register loadUser = {this.loadUser} onRouteChange = { this.onRouteChange } />
					)
				}
			</div>
		)
	}
}

export default App;
