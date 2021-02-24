import { useRef, useState, useEffect } from 'react';

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

export function useCanvas() {

    const canvasRef = useRef();
    const [coordinates, setCoordinates] = useState([]);
    const [fillCoordinate, setFillCoordinate] = useState([]);
    const [changeDom, setChangeDom] = useState(false);

    useEffect(() => {
        const canvasObj = canvasRef.current;
        const ctx = canvasObj.getContext('2d');
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        console.log("coor", coordinates);
        coordinates.forEach(({start, end}) => {
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.strokeStyle = "#D3D3D3";
            ctx.stroke();
            ctx.closePath();
        });
        fillCoordinate.forEach((coordinate) => {
            let stack = Array();
            stack.push(coordinate);
            while(stack.length > 0) {
                let currpoint = stack.pop();
                let pixelData = ctx.getImageData(coordinate.x, coordinate.y, 1, 1).data;
                console.log("color", pixelData);  
                if (pixelData[0] == 0 && pixelData[1] == 0 && pixelData[2] == 0 && pixelData[3] == 0) {
                    ctx.fillStyle = "#008081";
                    ctx.fillRect(coordinate.x, coordinate.y, 1, 1);
                    stack.push(currpoint.x+1, currpoint.y);
                    stack.push(currpoint.x, currpoint.y+1);
                    stack.push(currpoint.x-1, currpoint.y);
                    stack.push(currpoint.x, currpoint.y-1);
                }  
            }
            setChangeDom(prev => !prev);

        })

    });

    return [ coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight, setFillCoordinate, fillCoordinate ]; 
}