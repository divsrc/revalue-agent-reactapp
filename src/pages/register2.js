import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import validator from 'validator'
import history from '../history.js'
//import axios from 'axios'

class Register extends Component {
	constructor(props) {
	   super(props)
	   this.state = {
	   	email: {this.state.email.value}
	   	//saveEmail: {value: this.state.email.value}
	   }
	}
}

class Register2 extends Register {
		constructor(props) {
			super(props)
			this.state = {
				firstName: {value: '', isValid: true, message: ''},
				lastName: {value: '', isValid: true, message: ''},
				phoneNumber: {value: '', isValid: true, message: ''},
				domainName: {value: '', isValid: true, message: ''},
			};
	  	}

		CreateUserPostNext() {
		var myurl12 = "http://54.149.159.111/create/user/next";
		var myReq12 = new XMLHttpRequest();
		myReq12.onreadystatechange = function() {
			if(myReq12.readyState === 4 && myReq12.status === 200) {
					if (myReq12.withCredentials === true ) {
					console.log(JSON.parse(myReq12.response));
					} else {
					console.log("doesnt work");
					}
			};
		}
		myReq12.open('POST', myurl12, true);
		myReq12.setRequestHeader("Content-Type", "application/json; charset=UTF-8"); 
		myReq12.withCredentials = true;
		myReq12.send(
			JSON.stringify({
				"email": this.state.email.value,
				"firstname": this.state.firstName.value,
				"lastname": this.state.lastName.value,
				"phone": this.state.phoneNumber.value,
				"domain": this.state.domainName.value
			}));
		}

	  onChange = (e) => {
		let state = this.state;
		state[e.target.name].value = e.target.value;

		this.setState(state);
	  }

	  onSubmit = (e) => {
		e.preventDefault();
		//this.resetValidationStates(); //reset states before the validation procedure is run.
		if (this.formIsValid()) { //run the validation, and if it's good move on.
		  //form processing here....
			this.CreateUserPostNext()
			}
	  }

	  formIsValid = () => {
		let state = this.state;

		if (!validator.isAlpha(state.firstName.value)) {
		  state.firstName.isValid = false;
		  state.firstName.message = 'Use only letters A-Z';

		  this.setState(state);
		  return false;
		}

		if (!validator.isAlpha(state.lastName.value)) {
		  state.lastName.isValid = false;
		  state.lastName.message = 'Use only letters A-Z';

		  this.setState(state);
		  return false;
		}

		if (!validator.isNumeric(state.phoneNumber.value)) {
		  state.phoneNumber.isValid = false;
		  state.phoneNumber.message = 'Use only numbers, no spaces or hyphens';

		  this.setState(state);
		  return false;
		}

		if (!validator.isURL(state.domainName.value)) {
		  state.domainName.isValid = false;
		  state.domainName.message = 'Invalid website URL';

		  this.setState(state);
		  return false;
		}

		//additional validation checks here

		return true;
	  }

		resetValidationStates = () => {
			let state = this.state;
			// eslint-disable-next-line
			Object.keys(state).map(key => {
		  if (state[key].hasOwnProperty('isValid')) {
			state[key].isValid = true;
			state[key].message = '';
		  }
		})
		return this.setState(state);
	  }

	  render() {
		let {firstName, lastName, phoneNumber, domainName} = this.state;
		/*
		Each of the group classes below will include the 'form-group' class, and will only
		include the 'has-error' class if the isValid value is false.
		*/
		let firstNameGroupClass = classNames('form-group', {'has-error': !firstName.isValid})
		let lastNameGroupClass = classNames('form-group', {'has-error': !lastName.isValid})
		let phoneNumberGroupClass = classNames('form-group', {'has-error': !phoneNumber.isValid})
		let domainNameGroupClass = classNames('form-group', {'has-error': !domainName.isValid})

		return (
		<div className="Register2">
		   <div className="row">
			<div className="col-sm-8 col-centered">
					<form  onSubmit={this.onSubmit}>

						<div className={firstNameGroupClass}>
							<div className="input-group">
							  <span className="input-group-addon"><i className="fa fa-user" /></span>
								<input type="text" name="firstName" className="form-control"
									required minLength="2" maxLength="50"
								  placeholder="First name" value={firstName.value} 
								  onChange={this.onChange} autoFocus />
						  </div>
						  <span className="help-block">{firstName.message}</span>
						</div>
						
						<div className={lastNameGroupClass}>
							<div className="input-group">
							  <span className="input-group-addon"><i className="fa fa-user" /></span>
								<input type="text" name="lastName" className="form-control"
									required minLength="2" maxLength="50"
								  placeholder="Last name" value={lastName.value} 
								  onChange={this.onChange} autoFocus />
						  </div>
						  <span className="help-block">{lastName.message}</span>
						</div>

						<div className={phoneNumberGroupClass}>
							<div className="input-group">
							  <span className="input-group-addon"><i className="fa fa-phone" /></span>
								<input type="tel" name="phoneNumber" className="form-control"
									required  maxLength="20"
								  placeholder="Phone number" value={phoneNumber.value} 
								  onChange={this.onChange} autoFocus />
						  </div>
						  <span className="help-block">{phoneNumber.message}</span>
						</div>

						<div className={domainNameGroupClass}>
							<div className="input-group">
							  <span className="input-group-addon"><i className="fa fa-window-maximize" /></span>
								<input type="text" name="domainName" className="form-control"
									required  maxLength="100"
								  placeholder="Website URL" value={domainName.value} 
								  onChange={this.onChange} autoFocus />
						  </div>
						  <span className="help-block">{domainName.message}</span>
						</div>

						<button  className="btn btn-block btn-login" type="submit">Register</button>
					</form>
				</div>
			</div>

			<div className="row row-footer">
				<div className="btn-group btn-group-justified" role="group">
					<div className="btn-group" role="group">
						<Link to="/forgotpassword">
							<button 
								onClick={() => history.push('/forgotpassword')} 
								type="button" className="btn" id="btn-left">
									<i className="fa fa-question" /> 
									Forgot Password
							</button>
						</Link>
					</div>
					<div className="btn-group" role="group">
						<Link to="/register">
							<button onClick={() => history.push('/register')} 
								type="button" className="btn" id="btn-right">
								<i className="fa fa-pencil" /> 
								Register
							</button>
						</Link>
					</div>
				</div>
		</div>

		</div>
		);
	  }
	};

	export default Register2
