import { useState } from "react";

const LazyBackgroundImage = ({
  srcSet,
  srcFallback,
  sizes = "100vw",
  loading = "eager",
  children,
  className,
  alt,
  placeholder,
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url(${placeholder})`,
      }}
      className={className}
    >
      {/* Main high-res AVIF */}
      <img
        src={srcFallback}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={loading}
        fetchPriority={loading === "eager" ? "high" : undefined}
        decoding="async"
        onLoad={(e) => {
          setLoaded(true);
        }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          filter: loaded ? "blur(0px)" : "blur(20px)",
          transition: "filter 400ms ease, transform 400ms ease",
        }}
      />

      {/* App/content shows once background is ready */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          opacity: loaded ? 1 : 0,
          transition: "opacity 300ms ease",
        }}
      >
        {loaded && children}
      </div>
    </div>
  );
};

export default LazyBackgroundImage;
