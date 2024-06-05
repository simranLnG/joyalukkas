import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import './RadiantSection.css';

const HeritageAndCulture = (data) => {

    // function applyAnimations() {
    //     var heading = document.querySelector('.heading');
    //     heading.style.animation = 'moveDown 1.65s ease-in-out forwards'
    //     var button = document.querySelector('button');
    //     button.style.backgroundColor = 'red';
    //   }

    const shopRedirectUrl = "https://www.joyalukkas.in/radiant-gold-womens-ring-ds1500086561.html?page=1";

    const slides = data?.data?.HomePage?.RadiantContainer?.Slides ? Object.values(data.data.HomePage.RadiantContainer.Slides) : [];

    return (
        <div>

            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                loop={true}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>

                        <div className="container">
                            <div className="column1">
                                <div>
                                    <p className='heading'>{slide.Heading}</p>
                                    <p className='text'>{slide.Text}</p>
                                    <p className='global-button'><a href="">{slide.GlobalButtonText}</a></p>
                                    <p className='small-image'>
                                        <a title="Gold Flower pendant" href={slide.SmallImage.RedirectUrl}>
                                            <img src={slide.SmallImage.ImageUrl} alt={slide.ImageText}
                                                style={{ width: "220px", height: "220px" }} />
                                        </a>
                                    </p>
                                    <p>
                                        <a className='shop-button' href={shopRedirectUrl}>Shop</a>
                                    </p>
                                </div>
                            </div>
                            <div className='column2'>
                                <img src={slide.BigImage.ImageUrl} alt={slide.ImageText}
                                    style={{ width: "100%", height: "500px" }}></img>
                            </div>
                        </div>

                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    );
};

export default HeritageAndCulture;
