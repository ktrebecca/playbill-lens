/* import packages and css */

import { useEffect, useRef, useState } from "react";
import OpenSeadragon from "openseadragon";
import "./App.css";

/*set urls*/

const image_url =
  "https://iiif.bodleian.ox.ac.uk/iiif/image/3e751ba1-4e22-4848-a555-a54f033b12b8/info.json";

const manifest_url =
  "https://iiif.bodleian.ox.ac.uk/iiif/manifest/3e751ba1-4e22-4848-a555-a54f033b12b8.json";

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

      <aside className="info-panel">
        <div className="playbill-info">
          <h1>Overview</h1>
        </div>

        <div className="app-info">
          <h4>Application</h4>
          <p>
            This application is built using React and Vite, using the {"  "}
            <a href="https://openseadragon.github.io/" target="_blank">
              OpenSeadragon
            </a>{" "}
            IIIF viewer.
          </p>
        </div>

        <div className="dynamic-box">
          <div className="tips-box">
            <h3>Tips</h3>

            <h3>Playbill Notes</h3>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default App;
