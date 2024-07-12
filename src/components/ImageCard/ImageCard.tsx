import React, { useState, useEffect, ReactNode } from 'react';
import { Card, CardMedia, CardContent, Typography, useTheme, Paper, Skeleton, Link } from '@mui/material';
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { FaSpotify } from "react-icons/fa";
import FallbackImg from '../FallbackImg/FallbackImg';
import useHover from '../../hooks/useHover.ts'
import "./ImageCard.css"

import { getAverageColor } from "../../helpers/GetAvgColor.ts"

interface ImageCardProps {
  cardImg?: string;
  textContent: string;
  clickLink: string;
  tooltipContent?: ReactNode;
}

const ImageCard: React.FC<ImageCardProps> = ({ cardImg, textContent, clickLink, tooltipContent }) =>{
  const theme = useTheme()
  const [isHovered, handleMouseEnter, handleMouseLeave] = useHover();
  const [averageColor, setAverageColor] = useState<string>(theme.palette.primary.main);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    if(cardImg){
      getAverageColor(cardImg)
        .then(averageColor => {
          setAverageColor(averageColor);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setLoading(false);
        });
    }else{
      setAverageColor(theme.palette.primary.main);
    }
    setLoading(false);
  }, [cardImg, theme.palette.primary.main]);

   // Default tooltip content
  //  const defaultTooltipContent = (
  //   <Typography sx={{ textAlign: "center", fontWeight: "bold", lineHeight: "1.2" }}>
  //     Check on <br /> Spotify <br />
  //     <FaSpotify color="#FFF" style={{ padding: "2px 0 0 0" }} />
  //   </Typography>
  // );


  return (
    <>
      { loading ?
        (
          <Skeleton variant="rounded" width="100%" height="100%" />
        ) : (
          <Link href={clickLink} >
            <Paper className='ImageCard'
              sx={{ boxShadow: isHovered ? `0 0 20px 10px ${averageColor}` : 'none' }}
              square={false}
              elevation={3}
              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
            >
              <Tooltip
                arrow
                followCursor
                title={ tooltipContent || "" }
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: { offset: [0, 20] },
                      },
                    ],
                    sx: {
                      [`& .${tooltipClasses.tooltip}`]: {
                        background: `${theme.palette.primary.main}FF`,
                        border: `1px solid ${theme.palette.primary.light}`,
                        color: `${theme.palette.primary.contrastText}`
                      },
                    },
                  },
                }}
              >
                <Card sx={{ height: "100%", width: "100%", position: "relative"}}>
                  <div className="image-container">
                    {cardImg ? (
                      <CardMedia
                        component="img"
                        image={cardImg}
                        alt={textContent}
                        sx={{ width: "100%", height: "100%", objectFit: "cover", aspectRatio:"1/1" }}
                      />
                    ) : (
                      <FallbackImg
                        fallbackComponent={<FaSpotify size="75%" color={theme.palette.text.primary} style={{ margin:"10%"}}/>}
                        fallbackStyles={{ backgroundColor: theme.palette.primary.main }}
                      />
                    )}
                  </div>

                  <CardContent
                    sx={{
                      position: "absolute", bottom: 0,
                      p: 0, m:0,
                      width: "100%", height: "2em",
                      background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3) 75%, rgba(0, 0, 0, 0) 100%)",
                      color: "#FFF",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="p"
                      sx={{
                        position: "absolute", bottom: 0,
                        p: "5px 10px", m: 0,
                        width: "90%",
                        textAlign: "left",
                        // Responsive font size adjustment
                        textShadow: "1px 1px 2px black, 0 0 1em black, 0 0 0.2em black",
                        '@media (max-width: 599px)': { fontSize: '0.8rem',  }, // Smaller screens
                        '@media (min-width: 600px)': { fontSize: '1.2rem', }, // Medium screens
                        '@media (min-width: 900px)': { fontSize: '1rem', },   // Larger screens
                      }}
                    >
                      {textContent}
                    </Typography>
                  </CardContent>
                </Card>
              </Tooltip>
            </Paper>
          </Link>
        ) 
      }
    </>
  );
};

export default ImageCard;