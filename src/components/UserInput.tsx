"use client";

import { useState } from "react";
import Globe from "./Globe";

export default function UserInput() {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <Globe lat={lat} long={long} />

      <form>
        <input
          type="number"
          placeholder="Lat"
          className="border px-3 py-2 "
          required
          value={lat}
          onChange={(e) => setLat(e.target.valueAsNumber)}
        />
        <input
          type="number"
          placeholder="Long"
          className="border px-3 py-2 "
          required
          value={long}
          onChange={(e) => setLong(e.target.valueAsNumber)}
        />
      </form>
      <div className="">
        lat {lat} long {long}
      </div>
    </div>
  );
}
