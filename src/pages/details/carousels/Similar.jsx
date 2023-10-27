import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Similar = ({ mediaType, id, data }) => {
  // const [endpoint, setEndpoint] = useState("GP12");
  // const url = `${endpoint}`;
  // const { loading } = useFetch(url);

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <Carousel
      title={title}
      data={data}
      // loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Similar;
