import React from 'react';
import Product from './Product';
import ProductForAdmin from "./ProductForAdmin";

export default function Pagination(props) {
    const { dataPerPage, totalPages, data, currentPage, maxPageLimit, minPageLimit, admin} = props;
    const pages = [];
    const skip = (currentPage - 1) * dataPerPage;
    const end = currentPage * dataPerPage;
    let renderedData = data.slice(skip, end);

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
        <li data-testid="page-links" key={page} id={page} onClick={handlePageClick} 
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
    <div className={props.adminList ? "main full-width" : "main"}>
        <div className={props.adminList ? "mainData full-width-data" : "mainData"}>
          {renderedData.map((data) => {
            if (props.adminList) {
                return (<div key={data.email} className='admin-div'>
                    <div className="user" key={data.email}>{data.email} <span>{data.admin && <span className="user-admin">Admin</span>} <input onChange={() => props.changeAdmin(data._id)} checked={data.admin} type="checkbox" /></span></div>
                    </div>)
            }
            else if(admin) {
                return <ProductForAdmin removeProductAfterDelete={props.removeProductAfterDelete} key={data._id} details={data} />
            } 
            else {
                return <Product key={data._id} details={data}/> 
            }
          })}
        </div>
        <ul className="page-numbers"> 
           <li className='li-buttons'>
               {data && <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>Prev</button>}
           </li>
           {pageDecremenEllipses}
            {pageNumbers}
           {pageIncrementEllipses}
            <li className='li-buttons'>
              {data && <button onClick={handleNextClick} disabled={currentPage === pages[pages.length-1]}>Next</button>}
           </li>
        </ul>
    </div>
)
}
