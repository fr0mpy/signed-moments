import React, { useEffect, useRef, useState } from 'react'
import { srcToFile } from '../../../Helpers/file';
import { useAppSelector } from '../../../Redux/store';
import { storage } from '../../../services/web3Storage';
import { CanvasContainer, StyledCanvas } from './styledComponents';

const calculateRatio = (srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number) => {
    return Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
}

/**
 * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 *
 * @param {Number} srcWidth width of source image
 * @param {Number} srcHeight height of source image
 * @param {Number} maxWidth maximum available width
 * @param {Number} maxHeight maximum available height
 * @return {Object} { width, height }
 */
const calculateAspectRatioFit = (srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number) => {

    const ratio = calculateRatio(srcWidth, srcHeight, maxWidth, maxHeight);

    return { width: srcWidth * ratio, height: srcHeight * ratio };
}

// const lockBodyScroll = () => {
//    const bodyEl = document.getElementById('body');

//    bodyEl?.style.scroll
// }

///////////////////////////
///////////////////////////
export const Canvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(new Image());

    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();
    const [imgResolution, setImgResolution] = useState<{ imgX: number, imgY: number }>({ imgX: 0, imgY: 0 });
    const [drawing, setDrawing] = useState<boolean>(false);
    const { imgDataURL } = useAppSelector(state => state.image);

    useEffect(() => {
        // first thing
        if (!imgDataURL) return;
        handleImgResolution();
    }, [imgDataURL]);

    useEffect(() => {
        // second thing
        if (!imgResolution.imgX || !imgResolution.imgY) return;
        setCanvasContext();
    }, [imgResolution]);

    useEffect(() => {
        // third thing
        if (!ctx) return;
        handleDrawImg();
    }, [ctx]);

    const handleImgResolution = () => {
        if (!imgDataURL) return;

        imgRef.current.src = imgDataURL.toString();

        imgRef.current.onload = () => {

            const { width, height } = calculateAspectRatioFit(
                imgRef.current.naturalWidth,
                imgRef.current.naturalHeight,
                window.screen.width,
                window.screen.height
            );

            setImgResolution({ imgX: width, imgY: height });
            imgRef.current = new Image();
        };
    };

    const handleDrawImg = () => {

        imgRef.current.src = imgDataURL.toString();
        console.log(3)
        imgRef.current.onload = () => {

            ctx?.drawImage(
                imgRef.current,
                0,
                0,
                Math.round(imgResolution.imgX),
                Math.round(imgResolution.imgY)
            );

            console.log(4)

        };
    };

    const setCanvasContext = () => {
        if (!canvasRef.current) return;

        const context = canvasRef.current.getContext('2d');

        setCtx(context);
    };

    const handleMouseDown = (e: any) => {

        if (!ctx) return;

        const { clientX, clientY } = e.touches['0'];
        const { x = 0, y = 0 } = canvasRef.current?.getBoundingClientRect() ?? {};
        setDrawing(true);
        ctx?.beginPath();
        ctx?.moveTo(clientX - x, clientY - y);
        ctx.lineTo(clientX - x, clientY - y);
        ctx.stroke();
        // e.preventDefault();
    }

    const handleMouseMove = (e: any) => {
        // e.preventDefault();
        if (!ctx) return;

        if (drawing) {
            const { clientX, clientY } = e.touches['0'];
            const { x = 0, y = 0 } = canvasRef.current?.getBoundingClientRect() ?? {};
            ctx.lineWidth = 14;
            ctx.strokeStyle = 'white';
            ctx.lineCap = 'round';
            ctx.lineTo(clientX - x, clientY - y);
            ctx.stroke();
        }
    };

    const handleMouseUp = (e: any) => {
        setDrawing(false);
    };

    const handleCreate = async () => {
        const canvasImgDataURL = canvasRef.current?.toDataURL();
        if (canvasImgDataURL) {
            const file = await srcToFile(canvasImgDataURL, 'test.jpg', 'image/png');
            const cid = await storage.put([file], { onRootCidReady, onStoredChunk });
            const web3ResponseObject = await storage.get(cid);
            const files = await web3ResponseObject?.files(); // return your files
        }
    }

    const onRootCidReady = (cid: string) => {
        console.log('uploading files with cid:', cid)
    }

    const onStoredChunk = (size: number) => {
        console.log('chunk', size)
        // uploaded += size
        // const pct = totalSize / uploaded
        // console.log(`Uploading... ${pct.toFixed(2)}% complete`)
    }

    return (
        <>
            <button onClick={handleCreate}>create</button>
            <CanvasContainer>
                <StyledCanvas
                    ref={canvasRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleMouseDown}
                    onTouchMove={handleMouseMove}
                    onTouchEnd={handleMouseUp}
                    height={imgResolution.imgY}
                    width={imgResolution.imgX}
                />
            </CanvasContainer>
        </>
    );
};
