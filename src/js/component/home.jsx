import React, {useState, useEffect, useRef} from "react";

//create your first component
const Home = () => {
	const [songList, setSongList]=useState([]);
	const [song, setSong] = useState([0,""]);
	const songRef = useRef(null);
	const urlSource = "https://assets.breatheco.de/apis/sound/"
	const playList = songList.length;
	const [songStatus, setSongStatus] = useState("fas fa-play");

	// Busca las canciones en la API
	function getSongs() {
		fetch('https://assets.breatheco.de/apis/sound/songs') //ir a busca
			.then((response) => response.json()) //promesa 1
			.then((data) => setSongList(data)) //promesa 2
			.catch((err) => console.log(err))
	}

// Comienza la playlist segun la seleccion

	const clickPlay = (index,url) => {	
		setSongStatus("fas fa-pause")
		setSong([index, url])
		songRef.current.src = url;
		songRef.current.play();
		// setShow(show);
	}
// Alterna entre play/pause
	const togglePlayPause = () => {
		// option ? :songRef.current.paused
		// option === "play" ? songRef.current.	pause() : songRef.current.play()
		console.log(songStatus);
		
		if (!songRef.current.paused) {
			setSongStatus("fas fa-play")
			songRef.current.pause()
		}
		else {
			setSongStatus("fas fa-pause")
			songRef.current.play()
		}
	}
// Siguiente cancion
	const clickNext = () => {
		if (song[0] === playList-1) {
			setSong([0, urlSource+songList[0].url])
			songRef.current.src = urlSource+songList[0].url;
		}
		else{
			setSong([song[0]+1, urlSource+songList[song[0]+1].url])
			songRef.current.src = urlSource+songList[song[0]+1].url;
		}
		songRef.current.play();
		console.log(songRef)
		console.log(songRef.current.paused);
	}
// Cancion anterior
	const clickPrevious = () => {
		// Si el indice es 0, va al final
		if (song[0] === 0) {
			setSong([playList-1, urlSource+songList[playList-1].url])
			songRef.current.src = urlSource+songList[playList-1].url;
		}
		//Si el indice es el final de la playlist, va al principio
		else{
			setSong([song[0]-1, urlSource+songList[song[0]-1].url])
			songRef.current.src = urlSource+songList[song[0]-1].url;
		}

		songRef.current.play();
		console.log(songRef)
		console.log(songRef.current.paused);
	}

	useEffect(()=>{
		getSongs()
	},[])
	return (
<div className="bg-dark">
			<div className="list-group bg-dark">
			<li className="list-group-item list-group-item-action d-inline text-white bg-dark sticky-top">Playlist length : {songList.length}</li>
			{songList.map((item, index) => 
			<button type="button" onClick={()=>clickPlay(index,urlSource+item.url)} className="lista list-group-item list-group-item-action d-flex" key={index}>
			<audio ref={songRef} src=""></audio>
			{index+1} : {item.name}</button>)}
		</div>
	<div className="navbar navbar-expand-sm bg-dark navbar-dark position-sticky bottom-0 text-center p-3 text-white">
	<div className="navbar navbar-expand-sm bg-dark navbar-dark position-sticky bottom-0 text-center p-3 text-white d-flex justify-content-center">
			<button onClick={()=>clickPrevious()} className="bg-dark text-white border-dark d-flex"><i className="fas fa-backward "></i></button>
			<button onClick={()=>togglePlayPause()} className="bg-dark text-white border-dark mx-2 d-flex"><i className={songStatus}></i></button>
			<button onClick={()=>clickNext()} className="bg-dark text-white border-dark d-flex"><i className="fas fa-forward"></i></button>
			<audio ref={songRef} src=""></audio>
		</div>
		<div className="d-flex justify-content-end">
		© 2022 Copyright: Nintendo
		</div>
	</div>
</div>
	);
};

export default Home;