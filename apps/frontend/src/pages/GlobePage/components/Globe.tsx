/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Loader } from "lucide-react";
import type { GlobeMethods } from "react-globe.gl";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { getCityColorByCount } from "@/lib/utils";

import type { CityPoint, Stats } from "@/types/index";

import Legend from "./Legend";

const ReactGlobe = lazy(async () => import("react-globe.gl"));

type Props = {
  cities: Stats["cities"];
};

const Globe = ({ cities }: Props) => {
  const globeRef = useRef<GlobeMethods>(undefined);
  const [dimensions, setDimensions] = useState({ height: 600, width: 800 });

  const handleResize = useCallback(() => {
    setDimensions({
      height:
        window.innerWidth < 768 ? 360 : window.innerWidth < 1024 ? 500 : 600,
      width:
        window.innerWidth < 768
          ? window.innerWidth - 40
          : window.innerWidth < 1024
            ? 600
            : 800,
    });
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    const initializeGlobe = () => {
      if (!globeRef.current) return;

      globeRef.current.pointOfView({ altitude: 2, lat: 0, lng: 0 }, 0);

      const controls = globeRef.current.controls() as OrbitControls | undefined;
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.9;
      }
    };

    const timeoutId = setTimeout(initializeGlobe, 100);
    return () => clearTimeout(timeoutId);
  }, [cities.length]);

  const maxCount = useMemo(
    () => Math.max(...cities.map((city) => city.count || 1)),
    [cities]
  );

  return (
    <div className="relative w-full">
      <div className="flex aspect-square max-w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-800/90 shadow-2xl ring-1 ring-slate-700/50 backdrop-blur-md">
        <Suspense fallback={<Loader />}>
          <ReactGlobe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundColor="rgba(0,0,0,0)"
            pointColor={(city) =>
              getCityColorByCount((city as CityPoint).count)
            }
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
        </Suspense>
      </div>
      <Legend />
    </div>
  );
};

export default Globe;
