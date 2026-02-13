import { useAnalyzer } from "@/components/hooks/useAnalyzer.ts";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";

interface TextAudioVisualizerWidgetProps {
    spaceId: string;
}

const countRows = 4

const colors = [
    "#ff45b4",
    "#ff9528",
    "#dddd25",
    "#1beb9e",
]

function createDefaultGrid() {
    const defaultGrid = Array<string[]>(countRows);

    for (let i = 0; i < countRows; i++) {
        defaultGrid[ i ] = Array(32).fill(" ");
    }
    return defaultGrid;
}
const fftSize = 64
export const TextAudioVisualizerWidget = (props: TextAudioVisualizerWidgetProps) => {
    const { spaceId } = props;
    const { analyser } = useAnalyzer({spaceId, fftSize});

    const [dimensions,] = useState({ width: 300, height: 150 });
    const [grid, setGrid] = useState<string[][]>(createDefaultGrid());



    const dataArray = useRef(new Uint8Array(fftSize / 2));
    const timeArray = useRef(new Uint8Array(fftSize));


    const drawVisualizer = useCallback((width: number, height: number) => {
        const size = dataArray.current.length;
        const symbols = "_.-•:*^º\'";
        const newGrid = createDefaultGrid();

        // const newArray = Array.from(dataArray.current);
        // for (let i = 0; i < size; i++) {
        //     const ind = (i - size / 4 + size) % size;
        //     newArray[i] = dataArray.current[ind];
        // }


        for (let i = 0; i < size; i++) {
            const ind = (i - size / 4 + size) % size;
            let smoothFreq = (
                dataArray.current[ind] * 2
                + (dataArray.current[(ind + 1)%size])
                + (dataArray.current[(ind + 2)%size])
                + (dataArray.current[(ind + 3)%size])
                + (dataArray.current[(ind + 4)%size])
                + (dataArray.current[(ind + 5)%size])
                + (dataArray.current[(ind + 6)%size])
                + (dataArray.current[(ind + 7)%size])
            ) / 8;

            let newValue = Math.min(Math.floor(smoothFreq * 36 / 256), countRows * symbols.length - 1);
            try {
                newGrid[ Math.floor(newValue / 9) ][ i ] = symbols[ newValue % 9 ];
            } catch (e) {
                console.log({ newValue, array: dataArray.current});
            }
        }
        setGrid(newGrid);
    }, [dataArray.current, dimensions.width, dimensions.height, timeArray.current]);

    // 256 db - 36 pos
    // a db - x pos
    // x pos = a * 36 / 256
    useEffect(() => {
        let requestId: number | undefined;
        const draw = (width: number, height: number) => {
            requestId = requestAnimationFrame(() => draw(width, height));
            if (!analyser.current) return;
            analyser.current.getByteFrequencyData(dataArray.current);
            analyser.current.getByteTimeDomainData(timeArray.current);
            drawVisualizer(width, height);
        };
        draw(dimensions.width, dimensions.height);
        return () => {
            if (requestId) {
                cancelAnimationFrame(requestId);
            }
        }
    }, [dimensions, analyser.current]);




    return (
        <div className="audio-visualizer">
            <div style={{
                alignItems: "stretch",
                fontFamily: "monospace",
            }} className="flex-start pad grey pr-0 pb-0 pt-0 visualizer-container flex-col">
                {
                    grid.toReversed().map((row, index) => {
                        return (<Fragment key={colors[ index ]}>
                            <span style={{
                                fontSize: "24px",
                                whiteSpace: "nowrap",
                                whiteSpaceCollapse: "preserve-spaces",
                                color: colors[ index ],
                                width: "32ch",
                            }}>{row.join("")}</span>
                            <br/>
                        </Fragment>)
                    })
                }

            </div>
        </div>
    )
}