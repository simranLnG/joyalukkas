import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper';
import 'swiper/swiper-bundle.min.css';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

import '/media/simran/DATA/SimranData/VeniaProj/pwa-studio/packages/venia-concept/src/components/WeddingIdentitySlider/WeddingIdentitySlider.css';

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

export default function CmsPageContent() {
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

    const images = content?.HomePage?.WeddingIdentityContainer?.Slider ? Object.values(content.HomePage.WeddingIdentityContainer.Slider) : [];

    return (
        <div className="container">

            <div style={{textAlign:'center'}}>
                <p style={{ fontSize: '30px' }}> {content.HomePage.WeddingIdentityContainer.Heading.FirstLine}</p>
                <p style={{ fontSize: '60px' }}>{content.HomePage.WeddingIdentityContainer.Heading.SecondLine}</p>
            </div>

            <div>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
                    spaceBetween={30}
                    slidesPerView={3}
                    centeredSlides={true}
                    loop={true}
                    navigation
                    onSlideChange={(swiper) => {
                        const slides = swiper.slides;
                        slides.forEach(slide => {
                            slide.style.transform = 'scale(0.9)';
                            slide.style.zIndex = 5;
                        });
                        const activeSlide = slides[swiper.activeIndex];
                        activeSlide.style.transform = 'scale(1)';
                        activeSlide.style.zIndex = 10;
                        const nextSlide = slides[swiper.activeIndex + 1];
                        if (nextSlide) {
                            nextSlide.style.transform = 'scale(0.9)';
                        }
                        const prevSlide = slides[swiper.activeIndex - 1];
                        if (prevSlide) {
                            prevSlide.style.transform = 'scale(0.9)';
                        }
                    }}
                >
                    {images.map((slide, index) => (
                        <SwiperSlide key={index} >
                            <div className='slide-content'>
                                <img src={slide.ImageUrl} alt={slide.ImageText} />
                                <span><block>{slide.ImageText}</block></span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>

        </div>
    );
}
