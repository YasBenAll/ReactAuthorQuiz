import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route } from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import reportWebVitals from './reportWebVitals';
import {shuffle, sample} from 'underscore';
import AddAuthorForm from './AddAuthorForm';
// import { findAllByAltText } from '@testing-library/react';
const authors = [
  {
    name: 'Multatuli',
    imageUrl: 'images/Multatuli.gif',
    imageSource: 'Wikimedia Commons',
    books: ['Max Havelaar'],
  },
  {
    name: 'J.K. Rowling',
    imageUrl: 'images/Rowling.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Harry Potter and the Sorcerers Stone'],
  },
  {
    name: 'Stephen King',
    imageUrl: 'images/StephenKing.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['IT', 'The Shining'],
  },

];

function getTurnData(authors) {
  const allBooks = authors.reduce(function(p,c,i) {
    return p.concat(c.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0,4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find((author) => 
      author.books.some((title) =>
       title === answer
     )
    )
  }
}


function reducer(
  state = { authors, turnData: getTurnData(authors), highlight: ''}, 
  action) {
    switch (action.type) {
      case 'ANSWER_SELECTED':
        const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
        return Object.assign(
          {},
          state, {
            highlight: isCorrect ? 'correct' : 'wrong'
          });    
      case 'CONTINUE': 
        return Object.assign({}, state, {
          highlight: '',
          turnData: getTurnData(state.authors)
        });
        case 'ADD_AUTHOR':
          return Object.assign({}, state, {
            authors: state.authors.concat([action.author])
          });
      default: return state;  
    }
}

let store = Redux.createStore(reducer);



ReactDOM.render(
  <BrowserRouter>
    <ReactRedux.Provider store={store}>
      <React.Fragment>
        <Route exact path="/" component={AuthorQuiz} />
        <Route path="/add" component={AddAuthorForm} />
      </React.Fragment>
    </ReactRedux.Provider>
  </BrowserRouter>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
