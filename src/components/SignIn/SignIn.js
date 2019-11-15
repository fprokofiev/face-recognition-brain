import React from 'react';

const SignIn = ({ onRouteChange }) => {
	return(
		<div className='pa4 black mw5 center br3 pa4-ns mv3 ba b--black-10 tc'>
			<div className='measure center'>
				<fieldset id='sign_in' className='ba b--transparent ph0 mh0'>
					<legend className='f4 fw6 ph0 mh0'>Sign In</legend>
					<div className='mt3'>
						<label className='db fw6 lh-copy f6'>Email</label>
						<input className='pa2 input-reset ba bg-transparent hover-white w-100' type='email' name='email-address'  id='email-address' />
					</div>
					<div className='mv3'>
						<label className='db fw6 lh-copy f6'>Password</label>
						<input className='b pa2 input-reset ba bg-transparent hover-white w-100' type='password' name='password'  id='password' />
					</div>
				</fieldset>
				<div className=''>
					<input onClick={ () => onRouteChange('home') } className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' type='submit' value='Sign in' />
				</div>
				<div className='lh-copy mt3'>
					<p onClick={ () => onRouteChange('register') } className='f6 link dim black db pointer'>Register</p>
				</div>
			</div>
		</div>
	)
}

export default SignIn;