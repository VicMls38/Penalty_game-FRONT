import React, { useEffect, useState } from 'react';
import Score from '../components/score';
import Playground from '../components/playground';
import '../css/Game.css';
import io from 'socket.io-client';
import { socket } from '../main';

interface MyData {
  Code: string;
}

function Game() {
  const [jsonData, setJsonData] = useState<MyData | null>(null);

  useEffect(() => {

    socket.on('data', (data: MyData) => {
      console.log('Données reçues du serveur:', data);
      setJsonData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className='page play-page'>
      <Score />
      <Playground />
      <h1>TEST :</h1>
      {jsonData && (
        <ul>
          <li>Key: {jsonData.Code}</li>
          {/* Ajoutez d'autres éléments au besoin en fonction de votre structure JSON */}
        </ul>
      )}
    </div>
  );
}

export default Game;
