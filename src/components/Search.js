import React, { useState, useEffect } from 'react';
import '../style.css';

function Search() {
  const [serachItem, setSerachItem] = useState('');
  const [suggestionData, setSuggestionData] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  const fetchData = async () => {
    try {
      const result = await fetch(
        `https://dummyjson.com/products/search?q=${serachItem}`
      );
      const { products } = await result.json();
      setSuggestionData(products);
    } catch (error) {
      setSuggestionData([]);
      console.error(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (serachItem) {
        fetchData();
      } else {
        setSuggestionData([]);
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [serachItem]);

  const handleSearch = (item) => {
    setSelectedItem([...selectedItem, item]);
    setSuggestionData((prev) => prev.filter((i) => i.title != item.title));
  };

  const handleClose = (item) => {
    setSelectedItem((prev) => prev.filter((i) => i.id != item.id));
    setSuggestionData((prev) => [...prev, item]);
  };

  console.log('selectedItem', selectedItem);
  console.log('suggestionData', suggestionData);

  return (
    <div className="container">
      <div className="search-container">
        <div className="selected-item">
          {selectedItem?.map((item) => (
            <div>
              <img
                src={item?.thumbnail}
                alt={item.title}
                style={{ height: '20px' }}
              />
              <span>{item?.title}</span>
              <span onClick={() => handleClose(item)}>❌</span>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={serachItem}
          className="input"
          placeholder="Search..."
          onChange={(e) => setSerachItem(e.target.value)}
        />
      </div>
      <div className="search-data">
        {suggestionData?.map((item) => (
          <div
            className="item-search"
            key={item?.id}
            onClick={() => handleSearch(item)}
          >
            <img
              src={item?.thumbnail}
              alt={item.title}
              style={{ height: '20px' }}
            />
            <span>{item?.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
