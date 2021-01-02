import React,{Component} from 'react';
class SigninForm extends Component {
    constructor(props){
        super(props)
        this.states={
            username:'',
            email:'',
            password:''
        }
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
      }
    
    onPasswordChange = (event) => {
    this.setState({password: event.target.value})
    }

    onUserNameChange = (event) => {
    this.setState({username: event.target.value})
    }

    onSubmitRegister = () => {
       if(this.state!==null){
           if(this.state.password!==undefined && this.state.username!==undefined){
        fetch('http://localhost:3000/register', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            username:this.state.username
          })
        })
          .then(response => response.json())
          .then(outcome => {
              console.log(outcome)
            
          })
          this.props.login()
    }
}
}   
    
  render(){
    return (
        <div className="center">
            <main className="pa4 black-80">
                <form className="pa5 measure center shadow-4">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0 center">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" >Email</label>
                            <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address " required/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" >Username</label>
                            <input  onChange={this.onUserNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-99.5" type="username" name="username"  id="username " required/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" >Password</label>
                            <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" required/>
                        </div>
                        <div className="center"> 
                        <input onClick={this.onSubmitRegister} className=" ma4 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
                        </div>
                    </fieldset>
                </form>
            </main>
        </div>
      );
    }
}

export default SigninForm;