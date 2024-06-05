import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper';
import 'swiper/swiper-bundle.min.css';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

import 'src/components/JoyalukkasSliderTwo/JoyalukkasSliderTwo.css';

// Function to unescape HTML entities
function unescapeHtml(html) {
    return html
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, "\"")
        .replace(/&#039;/g, "'");
}

// Function to create markup for dangerouslySetInnerHTML
function createMarkup(html) {
    return { __html: html };
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

export default function CmsPageContent() {
    const GET_RECORD = gql`
        {
            cmsBlocks(identifiers: "joyalukkas") {
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


    let slides = {};
    try {
        slides = JSON.parse(jsonString);
        console.log(slides);
        console.log(slides.slider2.textCloumn.homeHeading);
    } catch (e) {
        console.error('Error parsing JSON:', e);
    }


    const images = slides?.slider2?.sliderColumn ? Object.values(slides.slider2.sliderColumn) : [];


    return (
        <div className="container">
            <div className="flex-container">
                <div className="column column1">
                    <div className="column-root-INf pagebuilder-column">
                        <div className="text-root-iY-" role="presentation">
                            <div className="enjoy-the-moments-container">
                                {/* <p className="jas-home-heading">EN<span className="joy-word">JOY</span> THE</p> */}
                                <p className="jas-home-heading">{slides.slider2.textCloumn.homeHeading}</p> 
                                <p className="jas-home-subheading">{slides.slider2.textCloumn.homeSubheading}</p>
                                <p className="enjoy-the-moments-subtext">{slides.slider2.textCloumn.textLine1}<br /> {slides.slider2.textCloumn.textLine2}</p>
                                <a href="/jewellery.html">
                                    <button className="enjoy-the-moments-btn global-primary-button">{slides.slider2.textCloumn.buttonText}</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column column2">
                <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
                        spaceBetween={30}
                        slidesPerView={1.2}
                        navigation
                        loop={true}
                        // onSlideChange={() => console.log('slide change')}
                        // onSwiper={(swiper) => console.log(swiper)}
                    >
                        {images.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <div className='slide-content'>
                                    <img src={slide.url} alt={slide.text} />
                                    <span><block>{slide.text}</block></span>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>


        </div>
    );
}
