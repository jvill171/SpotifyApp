import React from 'react';

type FallbackImgProps = {
  src?: string;
  fallbackComponent?: React.ReactNode; 
  fallbackStyles?: object; 
  alt?: string;
  className?: string;
};

const FallbackImg: React.FC<FallbackImgProps> = ({ src, fallbackComponent, fallbackStyles = {backgroundColor: 'gray'}, alt = 'Fallback Image', className = '' }) => {

  return(
    <div className={className} style={fallbackStyles}>
    {fallbackComponent ? (
        <div style={{height: "100%", width: "100%"}}>{fallbackComponent}</div>
    ) : src ? (
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: "contain" }} />
    ) :
      <p>No fallback image found</p>  // Should only ever appear in development, unless something went horribly wrong
    }
    </div>
  )
}

export default FallbackImg;