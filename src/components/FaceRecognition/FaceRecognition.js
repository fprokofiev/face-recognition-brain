import React from 'react';

const FaceRecognition = ({ imageUrl, boxes }) => {
	const BoxDivs = [];
	if (boxes.length > 0) {
		for (let [i,box] of boxes.entries()) {
			BoxDivs.push(
				<div key={i} className='bounding-box absolute pointer flex flex-wrap justify-center ba bw1 b--near-white' style={{top: box.top, right: box.right, bottom: box.bottom, left: box.left}}></div>
			)
		}
	}

	return(
		<div className='tc flex justify-center ma3'>
			<div className='relative white f3 dib'>
				<img className='shadow-1' id='input-image' width='500px' alt='' src={ imageUrl } />
					{ BoxDivs }
			</div>
		</div>
	)
}

export default FaceRecognition;