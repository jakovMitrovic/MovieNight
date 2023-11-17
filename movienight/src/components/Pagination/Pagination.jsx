import React from 'react'
import {Typography} from "@mui/material"
import useStyles from './styles'
import { ArrowForward, ArrowBack } from '@mui/icons-material'


const Pagination = ({currentPage, totalPages, setPage}) => {
    const classes = useStyles()
  

    const handlePrev = () => {
        if(currentPage !== 1 ){
            setPage((prevPage)=> prevPage - 1);
        }
    };

    const handleNext = () => {
        if(currentPage !== totalPages ){
            setPage((prevPage)=> prevPage + 1);
        };
    }

    if(totalPages===0) return null;



  return (
    <div className={classes.container}>
      <ArrowBack onClick={handlePrev} className={classes.button} variant='contained' />
      <Typography variant='h4' className={classes.pageNum}>{currentPage}</Typography>
      <ArrowForward onClick={handleNext} className={classes.button} variant='contained' type='button' />
    </div>
  )
}

export default Pagination
