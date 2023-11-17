import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;



export const tmdbApi = createApi({
    reducerPath:'tmdbApi',
    baseQuery: fetchBaseQuery({baseUrl:''}),
    endpoints:(builder)=>({

        getGenres: builder.query({
            query: ()=>`https://api.themoviedb.org/3/genre/movie/list?api_key=${tmdbApiKey}`    
        }),


        //get movies by type
        getMovies: builder.query({
            query: ({genreIdOrCategoryName, page, searchQuery})=>{

                //search
                if(searchQuery){
                    return `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`
                }
                
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string'){
                    return `https://api.themoviedb.org/3/movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`
                }
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number'){
                    
                    return `https://api.themoviedb.org/3/discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`

                }

                return `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${tmdbApiKey}`

                
            }    
        }),

        getMovie: builder.query({
            query: (id) => `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
        }),
        getRecommended: builder.query(({
            query: ({movie_id, list}) =>`https://api.themoviedb.org/3/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`
        })) ,



        getActorDetails: builder.query({
            query: (id)=> `https://api.themoviedb.org/3/person/${id}?api_key=${tmdbApiKey}`
        }),
        
        getMoviesByActor: builder.query({
            query: ({id, page})=> `https://api.themoviedb.org/3/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`
        }),





        getUserDetails: builder.query({
            query: (id)=> `http://localhost:3001/auth/getUser/${id}`
        }),

        getSavedMovies: builder.query({
            query: (id)=> `http://localhost:3001/movies/savedMovies/${id}`
        }),

    }),
})

export const {
    useGetGenresQuery,
    useGetMoviesQuery,
    useGetMovieQuery,
    useGetRecommendedQuery,
    useGetActorDetailsQuery,
    useGetMoviesByActorQuery,
    useGetUserDetailsQuery,
    useGetSavedMoviesQuery
} = tmdbApi;