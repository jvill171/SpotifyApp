import React from 'react';
import CardList from '../CardList/CardList';

import resp from "../_data/artists.json";   // Dummy artist data

const ArtistsList: React.FC = () => {
  return (
    <CardList
      items={resp.artists.items}
      getId={(artist) => artist.id}
      getImageUrl={(artist) => artist.images[0]?.url || ''}
      getName={(artist) => artist.name}
      getLink={(artist) => artist.external_urls.spotify}
    />
  );
};

export default ArtistsList;
