/* eslint-disable @typescript-eslint/no-magic-numbers */
import { useEffect, useRef, useState } from "react";

import ReactGlobe from "react-globe.gl";
import type { GlobeMethods } from "react-globe.gl";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { getCityColorByCount } from "@/lib/utils";

import type { CityPoint, Stats } from "@/types/index";

import Legend from "./Legend";

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

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const initializeGlobe = () => {
      if (globeRef.current) {
        globeRef.current.pointOfView({ altitude: 2, lat: 0, lng: 0 }, 0);

        const controls = globeRef.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.9;
      }
    };

    const timeoutId = setTimeout(initializeGlobe, 100);
    return () => clearTimeout(timeoutId);
  }, [cities.length]);

  const maxCount = Math.max(...cities.map((city) => city.count || 1));

  return (
    <div className="relative w-full">
      <div className="flex aspect-square max-w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-800/90 shadow-2xl ring-1 ring-slate-700/50 backdrop-blur-md">
        <ReactGlobe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)"
          pointColor={(city) => getCityColorByCount((city as CityPoint).count)}
          pointRadius={(city) =>
            0.3 + ((city as CityPoint).count / maxCount) * 1.2
          }
          pointAltitude={(city) =>
            0.02 + ((city as CityPoint).count / maxCount) * 0.3
          }
          pointsData={cities}
          pointsMerge
          showAtmosphere
          showGraticules
          width={dimensions.width}
          height={dimensions.height}
        />
      </div>
      <Legend />
    </div>
  );
};

export default Globe;
