import React from 'react';

import Navbar from './navbar';
import Grid from './grid';
import Labels from './labels';

import './App.css';
import { StateProvider } from '../context';


export default function App () { 

    return (
        <StateProvider>
            <Navbar />
            <Labels />
            <div className="grid-container">
                <Grid />
            </div>
        </StateProvider>
    );
}