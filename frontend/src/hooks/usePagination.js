import { useState } from "react";

export default function usePagination(dataPerPage) {
  const pageNumberLimit = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(3);
  const [minPageLimit, setMinPageLimit] = useState(0);

  const onPageChange= (pageNumber)=>{
    setCurrentPage(pageNumber);
  }
  const onPrevClick = ()=>{
      if((currentPage-1) % pageNumberLimit === 0){
          setMaxPageLimit(maxPageLimit - pageNumberLimit);
          setMinPageLimit(minPageLimit - pageNumberLimit);
      }
      setCurrentPage(prev=> prev-1);
   }

  const onNextClick = ()=>{
       if(currentPage+1 > maxPageLimit){
           setMaxPageLimit(maxPageLimit + pageNumberLimit);
           setMinPageLimit(minPageLimit + pageNumberLimit);
       }
       setCurrentPage(prev=>prev+1);
    }

    const paginationAttributes = {
      currentPage,
      maxPageLimit,
      minPageLimit,
    };

    return {paginationAttributes, onNextClick, onPrevClick, onPageChange};
}