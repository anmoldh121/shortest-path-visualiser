import React from 'react';
import './node.css';

export default function Node(props) {   
    return (
        <div onMouseDown={(e) => props.onMouseDown(e,props.index.colIndex, props.index.rowIndex)}
             onMouseEnter={() => props.onMouseEnter(props.index.colIndex, props.index.rowIndex)}
             onMouseUp={()=> props.onMouseUp(props.index.colIndex, props.index.rowIndex)} className="hexagon">
            <div className="inner-hex" style={{backgroundColor: props.properties.isPath ? "red" :
            props.properties.isStart || props.properties.isEnd? "grey" : props.properties.selected ? "blue": "white"}}>
                {props.properties.isStart? <p className="points">S</p> : props.properties.isEnd ? <p className="points">E</p> : ""}
            </div>
        </div>
    );
}
