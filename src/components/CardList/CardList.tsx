import { Box, Grid } from '@mui/material';
import ImageCard from '../ImageCard/ImageCard';


interface CardListProps<T> {
  items: T[];
  getId: (item: T) => string;
  getImageUrl: (item: T) => string;
  getName: (item: T) => string;
  getLink: (item: T) => string;
}

const CardList = <T,>({ items, getId, getImageUrl, getName, getLink }: CardListProps<T>) => {
  return (
    <Box sx={{ flexGrow: 1, p: 2, pt: 3 }}>
      <Grid container spacing={4}>
        {items.map((item) => (
          <Grid item xs={6} sm={6} md={3} lg={2.4} key={getId(item)}>
            <ImageCard
              cardImg={getImageUrl(item)}
              textContent={getName(item)}
              clickLink={getLink(item)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardList;