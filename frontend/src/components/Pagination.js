import React from 'react';
import Product from './Product';
import ProductForAdmin from "./ProductForAdmin";

export default function Pagination(props) {
    const { totalPages, products, currentPage, maxPageLimit, minPageLimit, admin} = props;
    const pages = [];
    const skip = (currentPage - 1) * 4;
    const end = currentPage * 4;
    let renderedProducts = products.slice(skip, end);

    for(let i=1 ; i<=totalPages; i++){
        pages.push(i);
    }

    const handlePrevClick = ()=>{
        props.onPrevClick();
    }
    const handleNextClick = ()=>{
        props.onNextClick();
    }
    const handlePageClick = (e)=>{
        props.onPageChange(Number(e.target.id));
    }

    const pageNumbers = pages.map(page => {
        if(page <= maxPageLimit  && page > minPageLimit) {
            return(
        <li key={page} id={page} onClick={handlePageClick} 
            className={currentPage === page ? 'active' : null }>
            {page}
        </li>
            );
        } else {
            return null;
        }
    }
 );

   let pageIncrementEllipses = null;
   if(pages.length > maxPageLimit){
       pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>
   }
   let pageDecremenEllipses = null;
   if(minPageLimit >=1){
       pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li> 
   }

return (
    <div className="main">
        <div className="mainData">
          {renderedProducts.map((product) => {
            if(admin) {
                return <ProductForAdmin removeProductAfterDelete={props.removeProductAfterDelete} key={product._id} details={product} />
            } else {
                return <Product key={product._id} details={product}/> 
            }
          })}
        </div>
        <ul className="page-numbers"> 
           <li className='li-buttons'>
               <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>Prev</button>
           </li>
           {pageDecremenEllipses}
            {pageNumbers}
           {pageIncrementEllipses}
            <li className='li-buttons'>
               <button onClick={handleNextClick} disabled={currentPage === pages[pages.length-1]}>Next</button>
           </li>
        </ul>
    </div>
)
}
