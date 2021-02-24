import React from 'react';
import './labels.css';

export default function Labels() {
    return (
        <div className ="label-container">
            <div className="label-desc">
                <div className ="label">
                    <i className="fas fa-play"></i>
                </div>
                <div className="desc"> 
                    Start Point
                </div>  
            </div>
            <div className="label-desc">
                <div className ="label">
                    <i className="fas fa-genderless"></i>
                </div>
                <div className="desc"> 
                    End Point
                </div>  
            </div>
            <div className="label-desc">
                <div className ="label" style={{padding: "10px 10px", margin: "0 10px", background: "blue"}}>
                </div>
                <div className="desc"> 
                    Selected Node
                </div>  
            </div>
            <div className="label-desc">
                <div className ="label" style={{padding: "10px 10px", margin: "0 10px", background: "red"}}>
                </div>
                <div className="desc"> 
                    Path
                </div>  
            </div>
        </div>
    );
}