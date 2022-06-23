
import './App.css'
import { useEffect, useState } from "react";
import { HiOutlineRefresh, HiOutlineArrowRight } from "react-icons/hi";

function App() {
  const [quotesCollection, setQuotesCollection] = useState(false);
  const [quotesArray, setQuotesArray] = useState([]);
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');


  useEffect(() => {
      randomQuote();
  }, []);

  const randomQuote = async () => {
      await fetch('https://quote-garden.herokuapp.com/api/v3/quotes/random')
        .then(res => res.json())
        .then(result => {
          setQuote(result.data[0].quoteText);
          setAuthor(result.data[0].quoteAuthor);
          setGenre(result.data[0].quoteGenre);
        });
  };

  const getAuthorQuotes = async () => {
    await fetch(`https://quote-garden.herokuapp.com/api/v3/quotes?author=${author}`)
      .then(res => res.json())
      .then(result => {
        const allQuotes = result.data.map(d => d.quoteText);
        setQuotesArray(allQuotes)
        setQuotesCollection(true);
      })
  };

  return (
    <div className="App">
      <nav>
        <button type='button' onClick={randomQuote}>random<HiOutlineRefresh className='icon' /></button>
      </nav>
        { !quotesCollection ? 
        <>
          <div className="quoteContainer">
              <p>"{quote}"</p>
          </div>
          <div className="btnAuthor" onClick={getAuthorQuotes}>
              <div>
                  <h3>{author}</h3>
                  <p>{genre}</p>
              </div>
              <HiOutlineArrowRight />
          </div>
          </>
          : <>
          <h1 onClick={() => setQuotesCollection(false)}>{author}</h1>

            { quotesArray.map(item => {
                return (
                  <div className="quoteContainer">
                    <p>"{item}"</p>
                </div>
                )
              })
            }
            
          </>
          
        }

      <footer>created by JosephPL - devChallenges.io</footer>
    </div>
  )
}

export default App
