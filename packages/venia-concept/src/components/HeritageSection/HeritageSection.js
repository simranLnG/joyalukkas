import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import './HeritageSection.css';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

const HeritageAndCulture = (data) => {

    const slide1 = data.data?.HomePage?.OurHeritageContainer?.Column2?.Slider?.Slide1? Object.values(data.data.HomePage.OurHeritageContainer.Column2.Slider.Slide1) : [];
    
    const initialImageUrl = slide1[1];
    const initialImageText = slide1[2];

    const [imageUrl, setImageUrl] = useState(initialImageUrl);
    const [imageText, setImageText] = useState(initialImageText);

const slides= data?.data?.HomePage?.OurHeritageContainer?.Column2?.Slider? Object.values(data.data.HomePage.OurHeritageContainer.Column2.Slider) : [];


    return (
        <div>
            <div className="container">
                <div className="left-part">
                    <div className='image-banner'>
                        <img
                            src={imageUrl}
                            alt="Heritage"
                            style={{
                                marginLeft: '0%',
                                width: '600px',
                                height: '580px',
                                objectFit: 'cover',
                                paddingRight: '20px'
                            }}
                        />
                        <div className="home-heritage-left-content">
                            <h2 id="bride-title-home">{imageText}</h2>
                            <a className="global-primary-button" id="bride-link-home" href={data.data.HomePage.OurHeritageContainer.Column1.RedirectUrl}>{data.data.HomePage.OurHeritageContainer.Column1.ButtonText}</a>
                        </div>
                    </div>
                </div>
                <div className="right-part">
                    <div className="right-top-part">
                        <p className='heading1'>{data.data.HomePage.OurHeritageContainer.Column2.Heading.FirstLine}</p>
                        <p className='heading2'> {data.data.HomePage.OurHeritageContainer.Column2.Heading.SecondLine}</p>
                        <p>{data.data.HomePage.OurHeritageContainer.Column2.Text}</p>
                    </div>
                    <div className="right-bottom-part">
                        <div>
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
                                spaceBetween={20}
                                slidesPerView={3}
                                navigation
                                loop={true}
                            >
                                {slides.map((slide, index) => (
                                    <SwiperSlide key={index} className="ImageDiv" style={{ width: '300px', height: '450px', objectFit: 'cover', paddingTop: '10%', bottom: '40px' }} >
                                        <div className='slide-content'>
                                            <img src={slide.ImageUrl} alt={slide.ImageText}
                                                style={{ width: '300px', height: '250px', objectFit: 'cover' }}
                                                onClick={() => {
                                                    setImageUrl(slide.ImageUrl);
                                                    setImageText(slide.ImageText)
                                                }} />
                                            <span><div>{slide.ImageText}</div></span>
                                        </div>

                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeritageAndCulture;
