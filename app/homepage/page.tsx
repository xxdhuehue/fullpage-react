import React from 'react';
import Fullpage from "../../components/fullpage-scroll/components/fullpage";
import Slide from "../../components/Slide";

const HomePage = () => {
  return (
    <div>
        <Fullpage initialSlide={0} slidesCount={5} duration={700}>
            <Slide>this is page one</Slide>
            <Slide>this is page two</Slide>
            <Slide>this is page three</Slide>
            <Slide>this is page four</Slide>
            <Slide>this is page five</Slide>
        </Fullpage>
    </div>
  )
}

export default HomePage