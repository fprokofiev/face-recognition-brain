import React from 'react';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
	return(
		<div className="tc">
			<p className='f3 white'>
				{`This smart app will detect the face on photo. Give it a try!`}
			</p>
			<div className="flex justify-center">
				<div className="pa3 shadow-1">
					<input className='input-reset ba b--white f4 ma2 pa2 mb2 db white bg-transparent dib' type='text' onChange={ onInputChange } />
					<button className='ma2 ba b--white f4 pa2 link pointer ph3 pv2 dib white bg-transparent bg-animate hover-bg-light-purple' onClick={ onPictureSubmit }>Detect</button>
				</div>
				</div>
		</div>
	)
}

export default ImageLinkForm;