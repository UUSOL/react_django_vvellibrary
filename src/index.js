import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter } from 'react-router-dom';
import Login from './components/authentication/Login';
import { CookiesProvider } from 'react-cookie';
import Library from './components/bibliothek/Library';
import Search from './components/bibliothek/Search';
import Book from './components/book/Book';
import UserContent from './components/usercontent/UserContent';
import Header from './components/index/Header';
import Footer from './components/index/Footer';

function Router() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Route path='/' component = {Header} />

        <Route path='/' exact component = {App} />
        <Route path='/login' exact component = {Login} />
        <Route path='/signup' exact component = {Login} />
        <Route path='/genres/:genres' component = {Library} />
        <Route path='/search' component = {Search} />
        <Route path='/books/:id' component = {Book} />
        <Route path='/choice' component={UserContent} />

        <Route path='/' component={Footer} />
      </BrowserRouter>
    </CookiesProvider> 
  )
}
/*
create book/:id
rename genres/:genre to catalog/:genre
 
*/




ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
