import React, { useEffect } from 'react';
import './index.css';

function App() {
  const fetchDogPics = async () => {
    const apiURL = 'https://api.thedogapi.com/v1';
    const xapiKey =
      'live_JsDYsVfjuLZk9R7bt4dpuU4IPEpTEas8sTHKFRQQEdZUTChcpRCkWQ3kNDa0mDSM';
    const limitPic = 2;

    try {
      const response = await fetch(
        `${apiURL}/images/search?limit=${limitPic}`,
        {
          method: 'GET',
          headers: { 'x-api-key': xapiKey },
        }
      );

      const dogPictures = await response.json();
      const imagesContainer = document.getElementById('container');

      dogPictures.forEach((picture) => {
        const img = document.createElement('img');
        img.src = picture.url;
        img.style.maxWidth = '30%';
        img.style.height = '200px';
        imagesContainer.appendChild(img);
      });
    } catch (error) {
      console.error('Error fetching dog pictures:', error);
    }
  };

  useEffect(() => {
    document
      .querySelector('.dog--button')
      .addEventListener('click', fetchDogPics);

    const refreshButton = document.getElementById('buttonRefresh');
    refreshButton.addEventListener('click', () => window.location.reload());

    return () => {
      document
        .querySelector('.dog--button')
        .removeEventListener('click', fetchDogPics);
      refreshButton.removeEventListener('click', () =>
        window.location.reload()
      );
    };
  }, []);

  return (
    <div className="container">
      <button className="dog--button">Dog Pictures</button>
      <button id="buttonRefresh" type="button">
        Refresh
      </button>
      <div id="container"></div>
      <p>
        Click <strong>Dog Pictures</strong> to view 2 pictures at a time
        <b>|</b> Click again to add 2 more or hit <strong>Refresh</strong> to
        start over
      </p>
    </div>
  );
}

export default App;

