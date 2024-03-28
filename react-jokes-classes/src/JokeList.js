import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Joke from './Joke';

function JokeList({ numJokesToGet = 5 }) {

  //State-hooks for managing storage values of the joke array and loading splash:
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //Fetches API data through Axios
  const getJokes = async () => {
    try {
      let jokes = [];
      let seenJokes = new Set();
      
      //Retrieves jokes until a desired number is reached:
      while (jokes.length < numJokesToGet) {
        let res = await axios.get('https://icanhazdadjoke.com', {
          headers: { Accept: 'application/json' }
        });
        //Stores the kvp of the data-fetch into an object-literal:
        let { ...joke } = res.data;
          console.log( {...joke});
          //Ensures that each joke is unique before adding to a list:
        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);
          jokes.push({ ...joke, votes: 0 });
        } else {
          console.log('duplicate found!');
        }
        console.log(seenJokes);
      }

      //Updates the state-hook with new jokes and ends loading:
      setJokes(jokes);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  //Rerenders the requesting and storing of API-data within the jokes array, without having to rerender the DOM:
  useEffect(() => {
    getJokes();
  }, []);

  //Triggers the refresh of jokes:
  const generateNewJokes = () => {
    setIsLoading(true);
    setJokes([]);
    getJokes();
  };

  //Updates the vote count for a specific joke
  const vote = (id, delta) => {
    setJokes(jokes => 
      jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    );
  };

  // Sorts the indexes of the jokes array in descending order
  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

  // Splash-loading screen while jokes are being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto p-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={generateNewJokes}
        >
          Get New Jokes
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {sortedJokes.map(joke => (
            <Joke
              key={joke.id}
              text={joke.joke}
              id={joke.id}
              votes={joke.votes}
              vote={setJokes}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


export default JokeList;
