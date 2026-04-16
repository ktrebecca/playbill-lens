/* import packages and css */

import { useEffect, useRef, useState } from "react";
import OpenSeadragon from "openseadragon";
import "./App.css";

/*set urls*/

const image_url =
  "https://iiif.bodleian.ox.ac.uk/iiif/image/3e751ba1-4e22-4848-a555-a54f033b12b8/info.json";

function App() {
  const [active, setActive] = useState(null); /* set initial states */

  const viewerRef =
    useRef(
      null,
    ); /* create reference to DOM element - needed for OSD in React */

  useEffect(() => {
    if (!viewerRef.current) return;

    const viewer = OpenSeadragon({
      element: viewerRef.current,
      prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
      tileSources: image_url,
      showNavigator: true,
      crossOriginPolicy: "Anonymous",
    });

    /* destroy openseadragon on umount to prevent memory leaks */
    return () => viewer.destroy();
  }, []);

  /* rendered JSX/divs */

  return (
    <div className="viewer">
      <div className="image-wrap">
        <div ref={viewerRef} className="osd-viewer" />
      </div>

      <aside className="info-panel"></aside>
    </div>
  );
}

export default App;
