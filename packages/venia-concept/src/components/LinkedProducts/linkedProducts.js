import React from "react";
import { useQuery } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { GET_LINKED_PRODUCTS } from "./linkedProducts.gql";
import { fullPageLoadingIndicator } from "@magento/venia-ui/lib/components/LoadingIndicator";
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import ErrorView from "@magento/venia-ui/lib/components/ErrorView";
import Image from "@magento/venia-ui/lib/components/Image";
import Price from "@magento/venia-ui/lib/components/Price";
import {useStyle} from "@magento/venia-ui/lib/classify";
const IMAGE_HEIGHT=180;
const IMAGE_WIDTHS=180;
const mystyles = {

};
const LinkedProducts = props => {
    const productSku = props.productDetails.sku;

    const { loading, error, data } = useQuery(GET_LINKED_PRODUCTS, {
        variables: { sku: productSku},
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
const classes = useStyle(props.classes);
    console.log( productSku);
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
    const relatedProducts = relatedProductsData.length > 0 ? relatedProductsData : null;

    const upsellProductsData = product ? product.upsell_products : null;
    const upsellProducts = upsellProductsData.length > 0 ? upsellProductsData : null;

    const crosssellProductsData = product ? product.crosssell_products : null;
    const crosssellProducts = crosssellProductsData.length > 0 ? crosssellProductsData : null;

    const relatedItems = relatedProducts ? relatedProducts.map((item) => {

        const productLink = resourceUrl(`/${item.url_key}${item.url_suffix || ''}`);


        return (
            <div className={classes.root}>
                <Link
                    to={productLink}
                    className={classes.images}>
                    <Image
                        alt={item.small_image.label}
                        classes={{
                            image: classes.image,
                            root: classes.imageContainer
                        }}
                        height={IMAGE_HEIGHT}
                        resource={item.small_image.url}
                        width={IMAGE_WIDTHS}
                    />
                </Link>
                <Link
                    to={productLink}
                    className={classes.name}
                >
                    <span>{item.name}</span>
                </Link>
                <div className={classes.price}>
                    <Price
                        value={item.price_range.minimum_price.regular_price.value}
                        currencyCode={item.price_range.minimum_price.regular_price.currency}
                    />
                </div>
            </div>
        );
    }) : null;

    const upsellItems = upsellProducts ? upsellProducts.map((item) => {

        const productLink = resourceUrl(`/${item.url_key}${item.url_suffix || ''}`);


        return (
            <div className={classes.root}>
                <Link
                    to={productLink}
                    className={classes.images}>
                    <Image
                        alt={item.small_image.label}
                        classes={{
                            image: classes.image,
                            root: classes.imageContainer
                        }}
                        height={IMAGE_HEIGHT}
                        resource={item.small_image.url}
                        width={IMAGE_WIDTHS}
                    />
                </Link>
                <Link
                    to={productLink}
                    className={classes.name}
                >
                    <span>{item.name}</span>
                </Link>
                <div className={classes.price}>
                    <Price
                        value={item.price_range.minimum_price.regular_price.value}
                        currencyCode={item.price_range.minimum_price.regular_price.currency}
                    />
                </div>
            </div>
        );
    }) : null;
    const crosssellItems = crosssellProducts ? crosssellProducts.map((item) => {

        const productLink = resourceUrl(`/${item.url_key}${item.url_suffix || ''}`);


        return (
            <div className={classes.root}>
                <Link
                    to={productLink}
                    className={classes.images}>
                    <Image
                        alt={item.small_image.label}
                        classes={{
                            image: classes.image,
                            root: classes.imageContainer
                        }}
                        height={IMAGE_HEIGHT}
                        resource={item.small_image.url}
                        width={IMAGE_WIDTHS}
                    />
                </Link>
                <Link
                    to={productLink}
                    className={classes.name}
                >
                    <span>{item.name}</span>
                </Link>
                <div className={classes.price}>
                    <Price
                        value={item.price_range.minimum_price.regular_price.value}
                        currencyCode={item.price_range.minimum_price.regular_price.currency}
                    />
                </div>
            </div>
        );
    }) : null;

    return (
        <div className={classes.productsContainer}>
            <h3 className={classes.heading}>
                <FormattedMessage
                    id={'linkedProducts.related'}
                    defaultMessage={'Related Products'}
                />
            </h3>
            <div>{relatedItems}</div>
            <h3 className={classes.heading}>
                <FormattedMessage
                    id={'linkedProducts.upsell'}
                    defaultMessage={'Upsell Products'}productsContainer
                />
            </h3>
            <div>{upsellItems}</div>
            <h3 className={classes.heading}>
                <FormattedMessage
                    id={'linkedProducts.crosssell'}
                    defaultMessage={'Crosssell Products'}
                />
            </h3>


            <div>{crosssellItems}</div>
        </div>

    );
};

export default LinkedProducts;