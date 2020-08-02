import React from 'react';

import Navbar from './navbar';
import Grid from './grid';
import './App.css';
import { StateProvider } from '../context';


export default function App () { 

    return (
        <StateProvider>
            <Navbar />
            <div className="grid-container">
                <Grid />
            </div>
        </StateProvider>
    );
}