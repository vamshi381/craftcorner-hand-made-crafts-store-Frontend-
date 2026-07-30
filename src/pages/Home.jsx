import React from 'react'
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import LatestProducts from '../components/LatestProducts';
import OfferBanner from '../components/offerBanner';
import About from '../components/About';
import CustomerReviews from '../components/CustomerReviews';

const Home = () => {
  return (
    <>
      <Hero />
      <Categories/>
      <FeaturedProducts/>
      <LatestProducts/>
      <OfferBanner/>
      <About/>
      <CustomerReviews/>
    </>
  )
}

export default Home
