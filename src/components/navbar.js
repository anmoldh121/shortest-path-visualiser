import React,{ useContext } from 'react';
import "./navbar.css";
import { store } from '../context';
import BFS from '../shortestPathAlgo';

export default function Navbar(props) {
    const {state, dispatch} = useContext(store);
    
    const runAlgo = () => {
        BFS(state.data, state.start, state.end, (response) => { 
            if (response) {
                console.log(response);
                let end = state.end;
                let key = end.x.toString() + end.y.toString();
                // console.log(prev[key]);
                let path = findPath(response, state.start, key)
                path.forEach((el) => {
                    state.data[el.x][el.y].isPath = true;
                })

                dispatch({type: "SETDATA", payload: state.data});
            } else {
                alert("not posible")
            }
        })
    }
    const findPath = (prev, start, endKey) => {
        let path = [];
        while (true) {
            let previous = prev[endKey];
            endKey = previous.x.toString() + previous.y.toString();
            path.push(previous);

            if (previous.x === start.x && previous.y === start.y) {
                break;
            }
        }
        return path;
    }

    return (
        <div className="navbar-container">
            <div className="nav-elements">element</div>
            <div className="nav-elements">element</div>
            <div className="nav-elements" onClick={runAlgo}>RUN</div>
            <div className="nav-elements">element</div>
        </div>
    );
}