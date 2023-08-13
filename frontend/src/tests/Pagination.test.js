import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Pagination from "../components/Pagination";
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter } from "react-router-dom";

describe('Pagination Environment Setup', () => {
  const pageNumberLimit = 3;
  let currentPage = 1;
  let maxPageLimit = 3;
  let minPageLimit = 0;

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

    const products = [{
        carbs: 34,
        description: "This is rice",
        image: "www.riceimage.com",
        name: "Rice",
        price: 5,
        price_id: "price3",
        protein: 4,
        salt: 8,
        storage: "This is stored in room temp",
        _id: 1
    },
    {
        carbs: 10,
        description: "This is bread",
        image: "www.breadimage.com",
        name: "Bread",
        price: 5,
        price_id: "price4",
        protein: 4,
        salt: 8,
        storage: "This is stored in room temp",
        _id: 2
    },
    {
        carbs: 4,
        description: "This is lettuce",
        image: "www.lettuceimage.com",
        name: "Lettuce",
        price: 3,
        price_id: "price2",
        protein: 4,
        salt: 8,
        storage: "This is stored in room temp",
        _id: 3
    },
    {
        carbs: 9,
        description: "This is Yogurt",
        image: "www.yougrtimage.com",
        name: "Yogurt",
        price: 5,
        price_id: "price1",
        protein: 4,
        salt: 8,
        storage: "This is stored in room temp",
        _id: 4
    }];

    let initialState= {
        user: null,
        cart: []
    };

const mockStore = configureStore();

it('Should render pagination properly with products', () => {
    let store = mockStore(initialState);

    render(<Provider store={store}><BrowserRouter><Pagination {...paginationAttributes} 
        onPrevClick={onPrevClick} 
        onNextClick={onNextClick}
        onPageChange={onPageChange}
        admin={false}
        data={products}
        totalPages={Math.ceil(products.length / 3)}
        dataPerPage={3}/></BrowserRouter></Provider>);

    const renderedProducts = screen.getAllByRole("heading");
    const links = screen.getAllByTestId("page-links");
    const PrevBtn = screen.getByText("Prev");
    const quantityIcon = screen.getByText("1");
    
    expect(renderedProducts.length).toBe(3);
    expect(links.length).toBe(2);
    expect(PrevBtn.disabled).toBe(true);
    expect(quantityIcon).toBeInTheDocument();
})
});