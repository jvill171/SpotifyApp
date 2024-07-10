import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { FaSpotify } from "react-icons/fa";
import FallbackImg from '../FallbackImg/FallbackImg';

import "./ImageCard.css"

interface ImageCardProps {
  cardImg?: string;
  textContent: string;
  clickLink: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ cardImg, textContent, clickLink }) =>{
    
  return (
    <div className='ImageCard'>
      <Tooltip
        title={
          <>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                lineHeight: "1.2",
              }}
            >
              Check on
              <br />
              Spotify
              <br />
              <FaSpotify color="#FFF" style={{ padding: "2px 0 0 0" }} />
            </Typography>
          </>
        }
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, 14],
                },
              },
            ],
            sx: {
              [`& .${tooltipClasses.tooltip}`]: {
                color: "#000",
                background: "rgba(29, 185, 84, 0.85)",
                border: "1px solid rgba(200, 255, 200, 0.2)",
              },
            },
          },
        }}
        arrow
        followCursor
      >
        <a
          href={clickLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card sx={{ height: "100%", width: "100%", position: "relative" }}>
            <div className="image-container">
              {cardImg ? (
                <CardMedia
                  component="img"
                  image={cardImg}
                  alt={textContent}
                  sx={{ height: "100%", width: "100%", objectFit: "cover", aspectRatio:"1/1" }}
                />
              ) : (
                <FallbackImg
                  fallbackComponent={<FaSpotify size="80%" color="#FFF" style={{ margin:"10%"}}/>}
                  fallbackStyles={{backgroundColor: "rgba(29, 185, 84)"}}
                />
              )}
            </div>

            <CardContent
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "2em",
                p: 0, m:0,
                background:
                  "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3) 75%, rgba(0, 0, 0, 0) 100%)",
                color: "white",
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  m: 0,
                  p: "5px 10px",
                  width: "90%",
                  textAlign: "left",
                  fontSize: '1.2rem',   // For screen size between: 600px && 900px
                  
                  // Responsive font size adjustment
                  '@media (max-width: 600px)': { // Smaller screens
                    fontSize: '0.9rem',
                  },
                  '@media (min-width: 900px)': { // Larger screens
                    fontSize: '1rem',
                  },
                }}
              >
                {textContent}
              </Typography>
            </CardContent>
          </Card>
        </a>
      </Tooltip>
    </div>
  );
};

export default ImageCard;
