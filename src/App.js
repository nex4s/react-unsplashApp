import React, { useEffect, useState } from 'react';

const client_id = 'PQcfzFaoU4aWTpPwGTE25RcTCqeDcUNbgbYhBy_H3Ww';

function UnsplashApp() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1); // Add page state
  const [queryInput, setQueryInput] = useState(''); // Separate state for query input
  const [pageInput, setPageInput] = useState(''); // Separate state for page input

  useEffect(() => {
    function getImages() {
      const requestUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${client_id}&page=${page}`;

      fetch(requestUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            const regularImageUrls = data.results.map((image) => image.urls.regular);
            setImages(regularImageUrls);
            setCurrentIndex(0);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }

    if (query && page) {
      getImages();
    }
  }, [query, page]);

  const handleQueryKeyPress = (e) => {
    if (e.key === 'Enter') {
      setQuery(e.target.value);
      setPage(pageInput); // Update the page state after pressing Enter for query
    }
  };

  const handlePageKeyPress = (e) => {
    if (e.key === 'Enter') {
      setPage(e.target.value);
      setQuery(queryInput); // Update the query state after pressing Enter for page
    }
  };

  function next() {
    setCurrentIndex((currentIndex + 1) % images.length);
  }

  function previous() {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  }

  return (
    <div style={{ backgroundColor: '#000000', height: '100vh' }}>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="border-transparent max-w-3xl mx-auto rounded-2xl border-2 border-solid p-6 backdrop-blur-sm bg-purple/40 text-center flex flex-col items-center">
          <div className="gallery mb-5">
            <img
              id="avatar"
              className="border-solid rounded-lg border-gray-400 border-opacity-50"
              src={images[currentIndex]}
              height="350px"
              width="350px"
              alt="Avatar"
            />
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center w-full text-gray-400 mt-5">
            <div className="flex items-center mb-2 md:mb-0">
              <button onClick={previous} className="mr-2">
                ◀
              </button>
              <input
                className="input-field z-1 flex-grow"
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                onKeyDown={handleQueryKeyPress}
                placeholder="Enter query..."
              />
            </div>

            <div className="flex items-center mt-2 md:mt-0">
              <input
                className="input-field z-1"
                type="number"
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onKeyDown={handlePageKeyPress}
                placeholder="Enter page..."
              />
              <button onClick={next} className="ml-2">
                ▶
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnsplashApp;
