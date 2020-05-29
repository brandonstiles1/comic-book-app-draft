import React, { useState } from 'react';
import './App.css';

function App () {
  // Create an array to hold comic book cover images
  const arrayOfComicCovers = [];

  // 1. Take pictures of comic - push each picture into array
  // phoneCamera.takePicture().push(arrayOfComicCovers);

  // 2. Send array to Google Vision API to extract titles; store its response in a variable
  // const arrayOfComicTitles =  GoogleVisionAPI.getTextFromImages(arrayOfComicCovers);

  // 3. Send that variable to a Comic Book API to get ISBN number; store the returned object in an array
  // const arrayOfComicISBNnumbers = ComicBookAPI.getISBNfromTitles(arrayOfComicCovers);

  // 4. Take those ISBN number variable, enter them into eBay API to get last sold prices. Store that response in an array called 'Last Sold Prices'
  // for (comic of arrayOfComicISBNnumbers){
  //   const comicPrice = eBayAPI.getPricesOfLastSoldItem(comic);
  //   // 5. If 'comicPrice' is higher than $300, return the title back
  //   if (comicPrice > minimumDesiredProfit){
  //     alert('Buy this comic!' + comic)
  //   }
  // }

  const [comicsList, setComicsList] = useState([]);


  const findComics = async () => {
    console.log('Clicked');
    const comicBookArray = await fetch(`https://gateway.marvel.com/v1/public/comics?apikey=${process.env.REACT_APP_MARVEL_KEY}`);
    const formattedResponse = await comicBookArray.json();
    console.log(formattedResponse);
    setComicsList(formattedResponse.data.results);
    console.log(formattedResponse.data.results);
  };

  return (
    <div className="App">
      <h1>Johnny's Comic Book App</h1>
      <button className='button' onClick={ () => findComics() }>Get Comics</button>
      { comicsList.length ? (
        comicsList.map(comic => (
          <div className='comic'>
            <img alt='Comic Book Cover' src={ comic.thumbnail.path } />
            <h3>TITLE: { comic.title }</h3>
            <p>Id: { comic.id }</p>
            <p>Page Count: { comic.pageCount } </p>
            <p>Price: ${ comic.prices[0].price } </p>
          </div>
        ))
      ) : ('') }
    </div>
  );
}

export default App;