/* eslint-disable @typescript-eslint/no-magic-numbers */
import { useEffect, useRef, useState } from "react";

import ReactGlobe from "react-globe.gl";
import type { GlobeMethods } from "react-globe.gl";

import type { Stats } from "@/types/index";

type Props = {
  cities: Stats["cities"];
};

const Globe = ({ cities }: Props) => {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ height: 600, width: 800 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerWidth < 768 ? 360 : 600,
        width: window.innerWidth < 768 ? window.innerWidth - 40 : 800,
      });
    };

    handleResize(); // initial
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ altitude: 2, lat: 0, lng: 0 }, 0);
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.9;
    }
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl bg-slate-800/90 shadow-2xl ring-1 ring-slate-700/50 backdrop-blur">
      <ReactGlobe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        pointColor={() => "#FF5733"}
        pointLabel="name"
        pointRadius={0.5}
        pointAltitude={0.1}
        pointsData={cities}
        pointsMerge
        showAtmosphere
        showGraticules
        width={dimensions.width}
        height={dimensions.height}
      />
    </div>
  );
};

export default Globe;
