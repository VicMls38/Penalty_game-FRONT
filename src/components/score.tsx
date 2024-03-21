import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { socket } from '../main';

interface Score {
    scoreTireur: number;
    scoreGardien: number;
}

function Score() {
    const [score, setScore] = useState<Score | null>(null);

    useEffect(() => {

        socket.on('connect', () => {
            console.log('Connecté au serveur Socket.io');
            socket.emit('getScore');
        });

        socket.on('score', (data: Score) => {
            console.log('Score reçu du serveur:', data);
            setScore(data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className='Score'>
            <div className='J1'>
                <h1>Tireur : {score?.scoreTireur}</h1>
            </div>
            <div className='J2'>
                <h1>Gardien : {score?.scoreGardien}</h1>
            </div>
        </div>
    );
}

export default Score;
