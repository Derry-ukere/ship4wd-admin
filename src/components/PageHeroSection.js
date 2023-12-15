/* eslint-disable react/prop-types */
import React from 'react';

const PageHeroSection = ({ title, desc }) => (
  <div className="app-relative hero-currencies">
    <div className="overlay1" />
    <div className="fade-appear-done fade-enter-done" style={{ paddingBottom: '6rem', paddingTop: '2rem' }}>
      <h1 className="center app-relative white-text">{title}</h1>
      <p className="app-relative center white-text">{desc} </p>
    </div>
  </div>
);

export default PageHeroSection;
