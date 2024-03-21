import { useEffect, useState } from 'react';
import { socket } from '../main';
//import useSound from 'use-sound';

//import Soundsifflet from '/sounds/sifflet.mp3';

function Playground() {

  //const [play, { stop }] = useSound(Soundsifflet); // Charger le son
  //const [shouldPlaySound, setShouldPlaySound] = useState(false);

  const [role, setRole] = useState(null);
  const [isGameOver, setGameOver] = useState(false);
  const [resultText, setResultText] = useState('');
  const [nbRestart, setnbRestart] = useState('0/2');
  const [attJoueur, setAttJoueur] = useState('');

  const [choixGardienEnd, setChoixGardien] = useState(0)
  const [choixTireurEnd, setChoixTireur] = useState(0)

  useEffect(() => {
    socket.on('response', (data) => {
      console.log('Réponse du serveur:', data);
      setRole(data);
    });

    socket.on('AttenteJoueur', (role) => {
      setAttJoueur(role);
    });

    socket.on("anim-end", (choixGardien, choixTireur) => {
      navigator.vibrate(500);
      console.log('anim end socket event', choixGardien, choixTireur);
      
      setChoixGardien(choixGardien)
      setChoixTireur(choixTireur)
    })

    socket.on('win', () => {
      setResultText("Gagné !");
      setGameOver(true);
      navigator.vibrate(1500);
      //setShouldPlaySound(true); // Activer la lecture du son
    });
    socket.on('loose', () => {
      setResultText("Perdu !");
      setGameOver(true);
      navigator.vibrate(1500);
    });
    socket.on('egality', () => {
      setResultText("Egalité !");
      setGameOver(true);
      navigator.vibrate(1500);
    });

    socket.on('Restart?', (nbPlayerRestart) => {
      setnbRestart(nbPlayerRestart);
    });

    socket.on("RESTART", () => {
      setGameOver(false);
      window.location.reload();
    });
    
 /*   if (shouldPlaySound) {
      play();
    } else {
      stop();
    }
*/
    return () => {
      console.log('Role in cleanup:', role);
    };
  }/*, [shouldPlaySound, play, stop]*/);

  const handleClick = (choice: number) => {
    setChoixGardien(0)
    setChoixTireur(0)
    if (!isGameOver) {
      socket.emit('choixJoueur', choice);
    }
  };

  const handleRestart = () => {
    socket.emit('restart');
    setGameOver(true); // Mise à jour de l'état pour éviter les clics pendant le redémarrage
  };

  return (
    <div className='Field'>
      <div className='textInGame'>
      <h1 className='role'>Vous êtes {role} !</h1>
      {attJoueur !== "" && <h4>En attente du {attJoueur}</h4>}
      <div className='soleil'></div>
      <div className='nuages'></div>
      {isGameOver && (
        <>
          <h4 className='restartText'>Restart ? {nbRestart}</h4>
          <button className="restart" onClick={handleRestart}>
            Restart
          </button>
          <h1 className='result'>{resultText}</h1>
        </>
      )}
      </div>
      <div className='cage'>
        <div className='choixJoueur'>
          {/* Ajoutez un gestionnaire d'événements pour chaque lien */}
          <a onClick={() => handleClick(1)}></a>
          <a onClick={() => handleClick(2)}></a>
          <a onClick={() => handleClick(3)}></a>
        </div>
        <div className={`gardien ${choixGardienEnd !== 0 ? (choixGardienEnd === 1 ? 'gardien-anim-left' : (choixGardienEnd === 2 ? '' : (choixGardienEnd === 3 ? 'gardien-anim-right' : ''))) : ''}`}></div>
      </div>
      <div className={`ballon ${choixTireurEnd !== 0 ? (choixTireurEnd === 1 ? 'tireur-anim-left' : (choixTireurEnd === 2 ? 'tireur-anim-middle' : (choixTireurEnd === 3 ? 'tireur-anim-right' : ''))) : ''}`}></div>
      <div className='dirt'></div>
    </div>
  );
}

export default Playground;
