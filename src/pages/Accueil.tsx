import { useState, useEffect } from 'react';
import '../css/Accueil.css';
import { socket } from '../main';

function Accueil() {
  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {

    socket.on('playerCount', (count) => {
      console.log('Nombre de joueurs connectés:', count);
      setPlayerCount(count);
    });

    socket.on('startGame', () => {
      console.log('Début du jeu');
      // Redirection vers la page de jeu
      window.location.href = '/game';
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
     <div className='AccueilScreen'>
        <h1 className='PlayTitle'><a href='/game'>Play !</a></h1>
        <p>Nombre de joueurs connectés : {playerCount}</p>
     </div>
    </>
  );
}

export default Accueil;
