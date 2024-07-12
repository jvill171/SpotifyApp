import React from 'react';
import CardList from '../CardList/CardList';

import resp from "../_data/albums.json";   // Dummy album data

const AlbumsList: React.FC = () => {
  return (
    <CardList
      items={resp.items}
      getId={(album) => album.id}
      getImageUrl={(album) => album.images[1]?.url || ''}
      getName={(album) => album.name}
      getLink={(album) => album.external_urls.spotify}
    />
  );
};

export default AlbumsList;
