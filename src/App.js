import React from 'react'
import BigButtons from './BigButtons'
import './App.scss'
import { KickProvider } from './KickContext'


function App() {

	return (
		<KickProvider>
			<div className="container">
				<div className="header">BOOMER </div>
				<BigButtons />
				<div className="footer">
					<p> Jim Colby 2021 </p>
					<p><a href="https://github.com/jrcolby/boomer"> github </a></p>
				</div>
			</div>
		</KickProvider>
	);
}
export default App;

