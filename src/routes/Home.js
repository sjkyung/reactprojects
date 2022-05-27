import { useEffect, useState } from 'react';
import Movie from '../components/Movie';
import styles from "./Home.module.css";


function Home(){
    const [loading, setLoading] =useState(true);
    const [movies, setMovies] = useState([]);
    const getMovies =async() => {
      const json = await (
        await fetch(
          `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
          )
      ).json();
      // const  json = await response.json();
      setMovies(json.data.movies);
      setLoading(false);
    };


    useEffect(()=> {
      getMovies()

    } ,[])
    console.log(movies);
    
    return(
    <div className={styles.container}>
    {loading ? 
    <div className={styles.loader}>
      <h1>Loading... </h1>
    </div> :   
    (<div className={styles.movies}>
        {movies.map(movie =>(
        <Movie 
            key={movie.id}
            id={movie.id}
            coverImg={movie.medium_cover_image} 
            title={movie.title} 
            summary={movie.summary} 
            genres={movie.genres} 
            year ={movie.year}>
        </Movie>
        ))}
        </div> )}
    </div>
    );
}

export default Home;