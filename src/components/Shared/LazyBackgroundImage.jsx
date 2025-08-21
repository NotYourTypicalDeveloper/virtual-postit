import { useState } from "react";

const LazyBackgroundImage = ({
  srcSet,
  children,
  style,
  className,
  alt,
  fallback,
  placeholder,
  sizes = "100vw",
  loading = "eager",
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      className={className}
    >
      {/* Blurred placeholder */}
      {placeholder && (
        <img
          src={placeholder}
          alt={alt}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            filter: "blur(20px)",
            transform: "scale(1.1)",
            transition: "opacity 300ms ease",
            opacity: loaded ? 0 : 1,
          }}
        />
      )}
      {/* Main high-res AVIF */}
      <img
        src={fallback}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          transition: "opacity 500ms ease",
          opacity: loaded ? 1 : 0,
        }}
      />
      {/* Overlay content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          opacity: loaded ? 1 : 0,
          transition: "opacity 300ms ease",
        }}
      >
        <div>{loaded && children}</div>
      </div>
    </div>
  );
};

export default LazyBackgroundImage;
