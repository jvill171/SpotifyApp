import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const item = {
  url: "https://i.scdn.co/image/ab676161000051745475238e8f6d1af5428e8e89?w=320&h=320",
  title: "Image 1",
  author: "Author 1"
};

const TestComponent = () => (
  <Card style={{ marginTop: "200px" }}>
    <CardMedia
      component="img"
      alt={item.title}
      height="300"
      image={`${item.url}?w=400&fit=crop&auto=format`}
      srcSet={`${item.url}?w=400&fit=crop&auto=format&dpr=2 2x`}
      loading="lazy"
    />
    <CardContent>
      <Typography variant="h6">
        {item.title}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        by: {item.author}
      </Typography>
    </CardContent>
  </Card>
);

export default TestComponent;
