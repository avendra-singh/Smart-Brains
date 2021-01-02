import React,{Component} from 'react';
import Sigin from './Components/Signin/Signin';
import Logo from './Components/Logo/Logo';
import Input from './Components/Input/Input';
import FaceRecognition  from './Components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai';
import SigninForm from './Components/SigninForm/SigninForm';
import LoginForm from './Components/LoginForm/LoginForm';
import User from './Components/User/User'

const app=new Clarifai.App({
	apiKey:'4c3765bdb92c47569a966fc5cda49a8b'
});

class App extends Component{
	constructor(){
		super();
		this.state={
			inputvalue:'', 
			url:'',
			box:{}, 
			status:"login",
			userstate:1,
			user:{
				id:'',
				name:'',
				email:'',
				entries:'',
				joined:''

			}
		}
	}
	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
		  leftCol: clarifaiFace.left_col * width,
		  topRow: clarifaiFace.top_row * height,
		  rightCol: width - (clarifaiFace.right_col * width),
		  bottomRow: height - (clarifaiFace.bottom_row * height)
		}
	  }

	displayFaceBox=(box)=>{
		this.setState({box:box})
	}

	onclick=()=>{	
		

		this.setState({url:this.state.inputvalue});
		app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.inputvalue)
		.then(response=> {
			if(response){
				fetch('http://localhost:3000/image',{
					method:'put',
					headers: {'Content-Type': 'application/json'},
          			body: JSON.stringify({
						  id:this.state.user.id 

				})
			})
				.then(response=>response.json())
				.then(count=>{
					this.setState(Object.assign(this.state.user,{entries:count}))
				})
			}
		this.displayFaceBox(this.calculateFaceLocation(response))
		})
    	.catch (err => console.log(err));
	}

	search=(event)=>{
		this.setState({inputvalue:event.target.value})	
	}

	logedin=()=>{
		this.setState({status:"logedin"})
		this.off()	
	}

	logedout=()=>{
		this.setState({status:"logedout"})
		this.on()
	}
	login=()=>
	{
		this.setState({status:"login"})
		this.on()
	}

	on=()=>{
		this.setState({userstate:1})
	}

	off=()=>{
		this.setState({userstate:0})
	}

	setuser=(user)=>{
		this.setState({user:user})
	}

	render(){ 
		if (this.state.status==="logedout") {
			return(
				<div>
					<Particles className="particles"
				params={{
					"particles": {
						"number": {
							"value": 50
					}
					,
						"size": {
							"value": 3
						}
					}
				}} />
					<Sigin userstate={this.state.userstate}logedin={this.logedin} logedout={this.logedout}login={this.login} />
					<SigninForm login={this.login}/>
				</div>
			);
			}
		else if(this.state.status==="login")
		{
			return(
				<div>
					<Particles className="particles"
				params={{
					"particles": {
						"number": {
							"value": 50
					}
					,
						"size": {
							"value": 3
						}
					}
				}} />
					<Sigin userstate={  this.state.userstate} logedin={this.logedin} logedout={this.logedout} login={this.login}/>
					<LoginForm logedout={this.logedout} logedin={this.logedin} setuser={this.setuser}/>
				</div>
			);

		}
		else if(this.state.status==="logedin")
		{
			return(
				<div>
					<Particles className="particles"
				params={{
					"particles": {
						"number": {
							"value": 50
					}
					,
						"size": {
							"value": 3
						}
					}
				}} />
			<Sigin userstate={this.state.userstate} logedin={this.logedin} logedout={this.logedout} login={this.login}/>
			<Logo/>
			<User user={this.state.user}/>
			<Input search={this.search} onclick={this.onclick}/>
			<FaceRecognition box={this.state.box} url={this.state.url}/>
			
				</div>
			);
		}
		}
	}
export default App;
