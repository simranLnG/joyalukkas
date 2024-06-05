import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import './WeddingSection.css';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

// Function to unescape HTML entities
function unescapeHtml(html) {
    return html
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, "\"")
        .replace(/&#039;/g, "'");
}

// Function to extract JSON from the unescaped HTML content
function extractJsonFromHtml(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    const innerDiv = div.querySelector("[data-content-type='html']");
    if (innerDiv) {
        const jsonString = innerDiv.textContent.trim();
        return unescapeHtml(jsonString); // Unescape again to convert the inner JSON string
    }
    return '{}';
}

const WeddingSection = () => {

    const GET_RECORD = gql`
        {
            cmsBlocks(identifiers: "joyalukkas-content") {
                items {
                    identifier
                    title
                    content
                }
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_RECORD, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const [jsonString, setJsonString] = useState('{}');

    useEffect(() => {
        if (data) {
            const htmlString = data.cmsBlocks.items[0].content;
            const unescapedHtml = unescapeHtml(htmlString);
            const extractedJsonString = extractJsonFromHtml(unescapedHtml);
            setJsonString(extractedJsonString);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    let content = {};
    try {
        content = JSON.parse(jsonString);
        // console.log(content);
        // console.log(content.HomePage.WeddingIdentityContainer.Heading);
    } catch (e) {
        console.error('Error parsing JSON:', e);
    }

    const slides = content?.HomePage?.WeddingIdentityContainer?.Slider ? Object.values(content.HomePage.WeddingIdentityContainer.Slider) : [];


    return (
        <div>
            <div className='heading-container'>
                <div className='heading1'>
                    {content.HomePage.WeddingIdentityContainer.Heading.FirstLine}
                </div>

                <div className='heading2'>
                    {content.HomePage.WeddingIdentityContainer.Heading.SecondLine}

                </div>
            </div>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
                spaceBetween={20}
                slidesPerView={3}
                centeredSlides={true}
                navigation
                onSlideChange={(swiper) => {
                    const slides = swiper.slides;
                    slides.forEach(slide => {
                        slide.style.transform = 'scale(0.8)';
                        slide.style.zIndex = 5;
                    });
                    const activeSlide = slides[swiper.activeIndex];
                    activeSlide.style.transform = 'scale(1)';
                    activeSlide.style.zIndex = 10;
                    const nextSlide = slides[swiper.activeIndex + 1];
                    if (nextSlide) {
                        nextSlide.style.transform = 'scale(0.8)';
                    }
                    const prevSlide = slides[swiper.activeIndex - 1];
                    if (prevSlide) {
                        prevSlide.style.transform = 'scale(0.8)';
                    }
                }}
                loop={true}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>

                        <div>

                            <div className='slide-content'>
                                <img src={slide.ImageUrl} alt={slide.ImageText}
                                // style={{ width: '300px', height: '250px', objectFit: 'cover' }}
                                />
                                <span><div>{slide.ImageText}</div></span>
                            </div>
                        </div>

                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    );
};

export default WeddingSection;
