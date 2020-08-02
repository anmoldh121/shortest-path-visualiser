import React, {useContext} from 'react';
import "./grid.css";
import { store } from '../context';

import Node from './Node';

export default function Grid() {
    
    const [mouseClickFlag, setMouseClickFlag] = React.useState(false);
    const {state, dispatch} = useContext(store);
    const [ifPointsClicked, setPointsClicked] = React.useState(false);
    const [currentPoint, setCurrentPoint] = React.useState({});

    React.useEffect(() => {
        getHex();
    }, []); 

    const getHex = () => {
        let width = Math.floor(window.innerWidth/32);
        let height = Math.floor(window.innerHeight/50);
        let startCol = Math.floor(width/4);
        let startRow = Math.floor(height/2);
        let endCol = startCol*3;
        let endRow = startRow;

        let col = [];
        let row = [];
        
        for (let i=0; i<height; i++) {
            col = Array();
            for (let j=0; j<width; j++) {
                col.push({
                    selected: false,
                    node: {x: i, y: j},
                    isStart: false,
                    isEnd: false,
                    isPath: false,
                });
            }
            col = JSON.parse(JSON.stringify(col));
            row.push(col)
        }
        console.log(startCol, startRow);
        console.log(endCol, endRow);    
        row[startRow][startCol].isStart = true;
        row[endRow][endCol].isEnd = true;
        
        dispatch({ type: "SETDATA", payload: row });
        dispatch({ type: "SETSTART", payload: { x: startRow, y: startCol } });
        dispatch({ type: "SETEND", payload: {x: endRow, y: endCol} });
    }
    const changeNodeColor = (colIndex, rowIndex) => {
        let rowData = [...state.data];
        rowData[colIndex][rowIndex].selected = true;
        dispatch({ type: "SETDATA", payload: rowData });
    }

    const onMouseDown = (e,colIndex, rowIndex) => {
        if (state.data[colIndex][rowIndex].isStart || state.data[colIndex][rowIndex].isEnd) {
            setCurrentPoint({colIndex, rowIndex});
            setPointsClicked(true);
            setMouseClickFlag(true);
            console.log(colIndex, rowIndex);
        } else {
            setMouseClickFlag(true);
            e.preventDefault()
            changeNodeColor(colIndex, rowIndex);
        }
    } 
    const onMouseEnter = (colIndex, rowIndex) => {
        console.log(ifPointsClicked);
        console.log(mouseClickFlag);
        if (mouseClickFlag) {
            console.log(ifPointsClicked);
            if (ifPointsClicked) {
                console.log("herer");
                if (state.data[currentPoint.colIndex][currentPoint.rowIndex].isStart) {
                    state.data[currentPoint.colIndex][currentPoint.rowIndex].isStart = false;
                    state.data[colIndex][rowIndex].isStart = true;
                    dispatch({ type: "SETSTART", payload: {x: colIndex, y: rowIndex} });
                    console.log(colIndex, rowIndex);
                } 
                if (state.data[currentPoint.colIndex][currentPoint.rowIndex].isEnd) {
                    state.data[currentPoint.colIndex][currentPoint.rowIndex].isEnd = false;
                    dispatch({ type: "SETEND", payload: {x: colIndex, y: rowIndex} });
                    state.data[colIndex][rowIndex].isEnd = true;
                } 
                dispatch({ type: "SETDATA", payload: state.data });
                setCurrentPoint({ colIndex, rowIndex });
            } else {
                changeNodeColor(colIndex, rowIndex);
            }
        }
    }
    const onMouseUp = () => {
        setMouseClickFlag(false);
        setPointsClicked(false);
    }

    return (
        <div id="grid-row" style={{marginTop: "70px", marginLeft: "50px"}}>
            {state.data.map((column, colIndex) => 
            <div id="grid" className="clear">
                {column.map((col, rowIndex) => 
                    <div className="list">
                        <Node 
                            properties={col}
                            index={{colIndex, rowIndex}}
                            onMouseDown={onMouseDown}
                            onMouseEnter={onMouseEnter}
                            onMouseUp={onMouseUp}
                            key={rowIndex}
                        />
                    </div >
                )}
                
            </div>
            )}
        </div>
    )
}