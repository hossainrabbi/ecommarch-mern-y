import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import './App.css';
import Home from './components/Home/Home';
import Footer from './components/layout/Footer/Footer';
import Header from './components/layout/Header/Header';

export default function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
      <Route exact path="/" component={Home} />
      <Footer />
    </Router>
  );
}
