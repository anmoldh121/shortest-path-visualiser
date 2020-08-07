import React from 'react';
import './node.css';

export default function Node(props) {   
    return (
        <div onMouseDown={(e) => props.onMouseDown(e,props.index.colIndex, props.index.rowIndex)}
             onMouseEnter={() => props.onMouseEnter(props.index.colIndex, props.index.rowIndex)}
             onMouseUp={()=> props.onMouseUp(props.index.colIndex, props.index.rowIndex)} className="hexagon">
            <div className="inner-hex" style={{backgroundColor: props.properties.isPath ? "red" :
            props.properties.selected ? "blue":
            "white"}}>
                {props.properties.isStart? 
                <div className="points">
                    <i className="fas fa-play"></i>
                </div> : props.properties.isEnd ? 
                <div className="points" style={{fontSize: "40px", marginTop: "-4px", marginLeft: "6px"}}>
                    <i className="fas fa-genderless"></i>
                </div> : ""}
            </div>
        </div>
    );
}
