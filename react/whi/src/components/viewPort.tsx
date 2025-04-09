import LogoBar from "./logoBar";
import TimeBar from "./timeBar";
import MapPanel from "./mapPanel";
import DetailPanel from "./detailPanel";

export default function ViewPort() {
    return (
        <div
            className="viewPort">
                <LogoBar />
                <div
                    className="panelsRow">
                        <MapPanel />
                        <DetailPanel /> 
                </div>
                <TimeBar />
        </div>
    ); 
}