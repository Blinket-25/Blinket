import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const customImageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}&auto=format`;
};

export default function ImageContainer({
  src,
  height = ["12vmax", "12vmax", "15vmax", "10vmax"],
}) {
  const [error, setError] = useState(null);
  const fallbackImage = "/loading-img.jpg";

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <>
      <Box height={height} position={"relative"}>
        <Image
          loader={customImageLoader}
          fill={true}
          style={{
            objectFit: "contain",
          }}
          // src={src}
          onError={setError}
          src={error ? fallbackImage : src}
          // onError={(e) => (e.currentTarget.src = "/loading-img.jpg")}
          alt="product image"
          loading="lazy"
        />
      </Box>
    </>
  );
}
