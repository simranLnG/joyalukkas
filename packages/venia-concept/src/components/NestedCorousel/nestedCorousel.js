import React from "react";
import { useQuery } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { GET_LINKED_PRODUCTS } from "../talons/linkedProducts.gql";
import { fullPageLoadingIndicator } from "@magento/venia-ui/lib/components/LoadingIndicator";
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import ErrorView from "@magento/venia-ui/lib/components/ErrorView";
import Image from "@magento/venia-ui/lib/components/Image";
import Price from "@magento/venia-ui/lib/components/Price";
import { useStyle } from "@magento/venia-ui/lib/classify";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper';
import 'swiper/swiper-bundle.min.css';

const IMAGE_HEIGHT = 180;
const IMAGE_WIDTH = 180;
const mystyles = {
    display: 'flex',
};
const NestedCorousel = props => {
    const productSku = 'MS07';
    const { loading, error, data } = useQuery(GET_LINKED_PRODUCTS, {
        variables: { sku: productSku },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
    const classes = useStyle(props.classes);

    if (!data) {
        if (loading) {
            return fullPageLoadingIndicator;
        }

        if (error) {
            return <ErrorView message={error.message} />;
        }
    }

    const product = data.products.items.length > 0 ? data.products.items[0] : null;
    const relatedProductsData = product ? product.related_products : null;
    const relatedProducts = relatedProductsData && relatedProductsData.length > 0 ? relatedProductsData : null;

    const relatedItems = relatedProducts ? relatedProducts.map((item) => {
        const productLink = resourceUrl(`/${item.url_key}${item.url_suffix || ''}`);

        return (
            <SwiperSlide key={item.id}>
                <Link to={productLink} className={classes.images}>
                    <Image
                        alt={item.small_image.label}
                        classes={{ image: classes.image, root: classes.imageContainer }}
                        // height={IMAGE_HEIGHT}
                        // resource={item.small_image.url}
                        height={450}
                        resource="https://images.unsplash.com/photo-1528528338041-d2c8c2ebab7d?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        width={300}

                        // width={IMAGE_WIDTH}
                    />
                </Link>
                <Link to={productLink} className={classes.name}>
                    <span>{item.name}</span>
                </Link>
                <div className={classes.price}>
                    <Price
                        value={item.price_range.minimum_price.regular_price.value}
                        currencyCode={item.price_range.minimum_price.regular_price.currency}
                    />
                </div>
            </SwiperSlide>
        );
    }) : null;


//    const upsellItems = upsellProducts ? upsellProducts.map((item) => {

//    const productLink = resourceUrl(`/${item.url_key}${item.url_suffix || ''}`);

//    return (
//     <SwiperSlide key={item.id}>
//         <Link to={productLink} className={classes.images}>
//             <Image
//                 alt={item.small_image.label}
//                 classes={{ image: classes.image, root: classes.imageContainer }}
//                 // height={IMAGE_HEIGHT}
//                 // resource={item.small_image.url}
//                 height={450}
//                 resource="https://images.unsplash.com/photo-1528528338041-d2c8c2ebab7d?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                 width={300}

//                 // width={IMAGE_WIDTH}
//             />
//         </Link>
//         <Link to={productLink} className={classes.name}>
//             <span>{item.name}</span>
//         </Link>
//         <div className={classes.price}>
//             <Price
//                 value={item.price_range.minimum_price.regular_price.value}
//                 currencyCode={item.price_range.minimum_price.regular_price.currency}
//             />
//         </div>
//     </SwiperSlide>
// );
// }) : null;

    // const crosssellItems = crosssellProducts ? crosssellProducts.map((item) => {

    //     const productLink = resourceUrl(`/${item.url_key}${item.url_suffix || ''}`);

    //     return (
    //         <SwiperSlide key={item.id}>
    //             <Link to={productLink} className={classes.images}>
    //                 <Image
    //                     alt={item.small_image.label}
    //                     classes={{ image: classes.image, root: classes.imageContainer }}
    //                     // height={IMAGE_HEIGHT}
    //                     // resource={item.small_image.url}
    //                     height={450}
    //                     resource="https://images.unsplash.com/photo-1528528338041-d2c8c2ebab7d?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //                     width={300}

    //                     // width={IMAGE_WIDTH}
    //                 />
    //             </Link>
    //             <Link to={productLink} className={classes.name}>
    //                 <span>{item.name}</span>
    //             </Link>
    //             <div className={classes.price}>
    //                 <Price
    //                     value={item.price_range.minimum_price.regular_price.value}
    //                     currencyCode={item.price_range.minimum_price.regular_price.currency}
    //                 />
    //             </div>
    //         </SwiperSlide>
    //     );
    // }) : null;

    // return (
    //     <div className={classes.productsContainer}>
    //         <Swiper
    //                 modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
    //                 direction={'horizontal'}
    //                 spaceBetween={50}
    //                 slidesPerView={3}
    //                 navigation
    //                 pagination={{ clickable: true }}
    //                 scrollbar={{ draggable: true }}
    //                 effect={"cube"}
    //                 cubeEffect={{
    //                     shadow: true,
    //                     shadowScale: 0.94,
    //                 }}
    //             >
                
    //                 {/* <SwiperSlide>
    //                     <h3 className={classes.heading}>
    //                         <FormattedMessage
    //                             id={'linkedProducts.related'}
    //                             defaultMessage={'Related Products'}
    //                         />
    //                     </h3>
    //                     {relatedItems && (
    //                         <Swiper
    //                             modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
    //                             direction={'vertical'}
    //                             spaceBetween={50}
    //                             slidesPerView={3}
    //                             navigation
    //                             pagination={{ clickable: true }}
    //                             scrollbar={{ draggable: true }}
    //                             effect={"cube"}
    //                             cubeEffect={{
    //                                 shadow: true,
    //                                 shadowScale: 0.94,
    //                             }}
    //                         >
    //                             {relatedItems}
    //                         </Swiper>
    //                     )}
    //                 </SwiperSlide> */}

    //                 {/* <SwiperSlide>
    //                     <h3 className={classes.heading}>
    //                         <FormattedMessage
    //                             id={'linkedProducts.related'}
    //                             defaultMessage={'Related Products'}
    //                         />
    //                     </h3>
    //                     {upsellItems && (
    //                         <Swiper
    //                             modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
    //                             direction={'vertical'}
    //                             spaceBetween={50}
    //                             slidesPerView={3}
    //                             navigation
    //                             pagination={{ clickable: true }}
    //                             scrollbar={{ draggable: true }}
    //                             effect={"cube"}
    //                             cubeEffect={{
    //                                 shadow: true,
    //                                 shadowScale: 0.94,
    //                             }}
    //                         >
    //                             {relatedItems}
    //                         </Swiper>
    //                     )}
    //                 </SwiperSlide> */}

    //                 {/* <SwiperSlide>
    //                     <h3 className={classes.heading}>
    //                         <FormattedMessage
    //                             id={'linkedProducts.related'}
    //                             defaultMessage={'Related Products'}
    //                         />
    //                     </h3>
    //                     {crosssellItems && (
    //                         <Swiper
    //                             modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
    //                             direction={'vertical'}
    //                             spaceBetween={50}
    //                             slidesPerView={3}
    //                             navigation
    //                             pagination={{ clickable: true }}
    //                             scrollbar={{ draggable: true }}
    //                             effect={"cube"}
    //                             cubeEffect={{
    //                                 shadow: true,
    //                                 shadowScale: 0.94,
    //                             }}
    //                         >
    //                             {relatedItems}
    //                         </Swiper>
    //                     )}
    //                 </SwiperSlide> */}


    //             </Swiper>
    //     </div>
    // );

    return (
        <>
          <Swiper
            className="mySwiper swiper-h"
            spaceBetween={50}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
          >
            <SwiperSlide>Horizontal Slide 1</SwiperSlide>
            <SwiperSlide>
              <Swiper
                className="mySwiper2 swiper-v"
                direction={'vertical'}
                spaceBetween={50}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
              >
                <SwiperSlide>Vertical Slide 1</SwiperSlide>
                <SwiperSlide>Vertical Slide 2</SwiperSlide>
                <SwiperSlide>Vertical Slide 3</SwiperSlide>
                <SwiperSlide>Vertical Slide 4</SwiperSlide>
                <SwiperSlide>Vertical Slide 5</SwiperSlide>
              </Swiper>
            </SwiperSlide>
            <SwiperSlide>Horizontal Slide 3</SwiperSlide>
            <SwiperSlide>Horizontal Slide 4</SwiperSlide>
          </Swiper>
        </>
      );
    }

export default NestedCorousel;
