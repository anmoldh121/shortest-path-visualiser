import React, { useEffect, useState } from 'react';
import { useCanvas } from '../Hooks/useCanvas';


export default function BFS() {

    const HEXSIZE = 20;
    const HEXORIGIN = {x: 30, y: 100};
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;

    const [ parameters, setParameter ] = useState();
    const [ localCoord, setLocalCoord ] = useState([]);
    const [ coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight, setFillCoordinate, fillCoordinate ] = useCanvas();

    useEffect(() => {
        let parameter = getHexParameter();
        
        setParameter(parameter);
        // drawHex(canvasRef.current, {x: 50, y: 50});
        drawHexes();
    }, []);

    const drawHexes = () => {
        let row = Math.floor(WIDTH/35.9);
        let col = Math.floor(HEIGHT/40);
        
        let backFactor = 0;
        for (let r=0; r<=col; r++ ){
            if (r%2==0 && r > 0) {
                backFactor++;
            }
            for (let q=0; q<=row; q++) {
                let center = hexToPixel(hex(q-backFactor, r));
                drawHex(canvasRef, center);
            }
        }
        setCoordinates(localCoord);
    }

    const handeleHexClick = (event) => {
        let x = event.clientX;
        let y = event.clientY;
        console.log (x, y)
        setFillCoordinate([...fillCoordinate, {x, y}]);
    }

    const getHexCorners = (center, i) => {
        let angle_deg = 60 * i + 30;
        let angle_rad = Math.PI / 180 * angle_deg;
        let x = center.x + HEXSIZE * Math.cos(angle_rad);
        let y = center.y + HEXSIZE * Math.sin(angle_rad);
        return point(x, y);
    }

    const drawHex = (canvasID, center) => {
        let coor = localCoord
        for (let i=0; i<6; i++) {
            let start = getHexCorners(center, i);
            let end = getHexCorners(center, i+1);

            coor.push({start, end});
        }
        coor = JSON.parse(JSON.stringify(coor))
        setLocalCoord(coor);
    }
 
    const point = (x, y) => {
        return { x, y };
    }

    const onClick = () => {
    }

    const getHexParameter = () => {
        let hexHeight = HEXSIZE*2;
        let hexWidth = Math.sqrt(3)/2 * hexHeight;
        let verDist = hexHeight * 3/4;
        let horDist = hexWidth;
        return { hexWidth, hexHeight, verDist, horDist };
    }

    const hexToPixel = (hex) => {
        let x = HEXSIZE * (Math.sqrt(3) * hex.q  +  Math.sqrt(3)/2 * hex.r) + HEXORIGIN.x;
        let y = HEXSIZE * (3./2 * hex.r) + HEXORIGIN.y;
        return point(x, y);
    }

    const hex = (q, r) => {
        return { q, r };
    }

    return (
        <div className="hexagon-canvas">
            <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} onClick={handeleHexClick}></canvas>
        </div>
    );
}