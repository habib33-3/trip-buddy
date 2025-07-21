import { useRef } from "react";

import type { GlobeMethods } from "react-globe.gl";
import Globe from "react-globe.gl";

import useGetStats from "@/hooks/stats/useGetStats";

const GlobeBall = () => {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  const { stats, status } = useGetStats();

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error loading stats</div>;
  }

  if (!stats) {
    return null;
  }

  const { cities } = stats;

  return (
    <div>
      <Globe
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
        width={800}
        height={600}
        showGraticules
      />
    </div>
  );
};

export default GlobeBall;
