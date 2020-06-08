import React, {Component} from 'react';
import '../styles/Login.css';
import Background from '../image/background.jpg';
import Input from '@material-ui/core/Input';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {browserHistory} from 'react-router';
import WebFont from 'webfontloader';


WebFont.load({
    google: {
      families: ['Source Sans Pro']
    }
  });


var errormsg='';
class Login extends Component {    
state = {
    username:'',
    password:'',
    User : [],
    showError: false 
};



    validate = (state) =>{
        var uname = this.state.username;
        var pass =  this.state.password;
        //console.log(errormsg)
        
        if(uname===null || uname === '' || pass===null || pass==='')
            {
                errormsg="Username / Password Missing!!!";
                this.setState((prevState, props) => {
                    return { showError: true }
                  })
            }
        else {
             //browserHistory.push('/Home');
            var uri = 'http://localhost:8081/tracker/register/';
            var loginUrl= uri + uname +'/'+ pass;
            axios.get(loginUrl)
            .then(response => (response.data))
            .then((data)=>{
            this.setState({User:data})
            console.log(this.state.User);
            if(this.state.User.length === 0)
              {
                errormsg="Username / Password Incorrect!!!";
                this.setState((prevState, props) => {
                    return { showError: true }
                  })
              }
              else{
                this.setState((prevState, props) => {
                    return { showError: false }
                  })


                this.state.User.map((userlist)=>
         (
            browserHistory.push("/Home/" + userlist.id + "/" + userlist.name)
             
         ))
                  
                
              }  
            })
            .catch(error => {
                errormsg='Error fetching and parsing data'+ error;
                this.setState((prevState, props) => {
                    return { showError: true }
                  })

              });           
        }
    }
   

    render(){
        const preventDefault = (event) => event.preventDefault();
        return (
            <div>
            <div className="split left">
                <img src={Background} alt="Background"/>
            </div>
            <div className="split right">
            <div>
                {this.state.showError && <div className="error-message">{errormsg}</div>}        
            </div>
                <div className='rightcontainer' >
                <h1 WebFont>DEX Expenses</h1>
                    <h2 style={{fontFamily:WebFont,fontSize:'18px',fontWeight:'normal'}}>Please login to your account</h2>
                    <form onSubmit={this.submitted} >
                        <Input 
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username" 
                            inputProps={{ 'aria-label': 'description' }}
                            style={{width: 445, height: 40,fontFamily:WebFont,fontSize:'16px',fontWeight:'normal',textDecoration:'none'}} 
                            onChange={(evt) => { this.state.username =  evt.target.value; }}
                            onFocus={{border:"2px solid #37364B"}}/>
                        <div className="space"></div>
                        <Input 
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password" 
                            inputProps={{ 'aria-label': 'description' }}
                            style={{width: 445, height:40,fontFamily:WebFont,fontSize:'16px',fontWeight:'normal',textDecoration:'none'}} 
                            onChange={(evt) => { this.state.password =  evt.target.value; }}
                            onFocus={{border:"2px solid #37364B"}}/>
                        <div className="space"></div>
                        <FormGroup aria-label="position" row>
                        <FormControlLabel
                            value="check"
                            color="#37364B"
                            control={<Checkbox color="#000000" />}
                            label="Remember me"
                            labelPlacement="Remember me"
                            style={{width:150,fontFamily:WebFont,fontSize:'16px',fontWeight:'normal', color:"#37364B"}}
                        />
                        <div className="space1"></div>
                        <Link
                        component="button"
                        variant="body2"
                        href="#" onClick={preventDefault}
                        style={{height:50, paddingLeft:20,fontFamily:WebFont,fontSize:'16px',fontWeight:'normal', textDecoration: 'none',border: '0px', color:"#37364B"}}>
                            {'Forgot Password'}
                        </Link>
                        
                        </FormGroup>
                        <div className="space2"></div>
                        <FormGroup aria-label="position" row>
                        <Button variant="contained" WebFont color="primary" 
                        style={{backgroundColor: "#37364B", width:211, height: 60,fontFamily:WebFont,fontSize:'18px',textTransform:'none'}} 
                        onClick={this.validate}>
                            Login
                        </Button>
                        <div className="area"></div>
                        <Button variant="contained"
                        style={{backgroundColor: "#FFFFFF", width:211, height: 60,fontFamily:WebFont,fontSize:'18px', border:"2px solid #37364B", textTransform:'none'}}
                        onClick={()=>browserHistory.push("/Register")}>
                            {'Sign Up'}
                        </Button>
                        </FormGroup>
                    </form>
                    </div>
            </div>
            
        </div>
        )
    }
}
export default Login;