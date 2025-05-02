import React from 'react';

const ads = [
  {
    url: "https://appsiko.com",
    image: "https://appsiko.com/ad1.jpg",
    alt: "Ad 1",
  },
  {
    url: "https://appsiko.com",
    image: "https://appsiko.com/ad2.jpg",
    alt: "Ad 2",
  },
  {
    url: "https://appsiko.com",
    image: "https://appsiko.com/ad3.jpg",
    alt: "Ad 3",
  },

];

export default function Sidebar() {
  return (
    <div className="w-[300px] flex-shrink-0 space-y-4">
      {ads.map((ad, index) => (
        <div key={index} className="text-center">
          <a href={ad.url} target="_blank" rel="noopener noreferrer">
            <img
              src={ad.image}
              alt={ad.alt}
              className="w-[300px] h-[250px] object-cover"
            />
          </a>
        </div>
      ))}
    </div>
  );
}
