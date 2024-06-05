import React from "react";
import { useQuery } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import { GET_PRODUCTS_REVIEWS } from "../talons/review.gql.js";
import { fullPageLoadingIndicator } from "@magento/venia-ui/lib/components/LoadingIndicator";
import ErrorView from "@magento/venia-ui/lib/components/ErrorView";
import {useStyle} from "@magento/venia-ui/lib/classify";
import DEFAULT_CLASSES from "./reviews.module.css";
import MyForm from "./reviewfrom";
//import ReviewForm from "./form"


const Reviews = props => {

     const productSku = props.productDetails.sku;
    // const productSku = props.productDetails ? props.productDetails.sku : null;
    // const productSku = 'MS07';

    console.log(productSku);

    const mystyles ={
        border: "groove"

    };
    const Classes=useStyle(DEFAULT_CLASSES);

    const { loading, error, data } = useQuery(GET_PRODUCTS_REVIEWS, {
        variables: { sku: productSku},
        // variables: 'MS07',
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
    const classes = useStyle(DEFAULT_CLASSES,props.classes);

    if (!data) {
        if (loading) {
            return fullPageLoadingIndicator;
        }

        if (error) {
            return <ErrorView message={error.message} />;
        }
    }


    // console.log(data.products.items[0].reviews.items.data);



    const Getreviews = data.products.items[0].reviews.items; //displaying the console data in frontend

    // console.log(data.products.items[0].reviews.items.data);

    const relatedItems = Getreviews.map((item) => {

            return (
                <div className={classes.root} style={mystyles}>


                    <div >
                        <div>
                            <h1>Nick Name :</h1>
                            {item.nickname}
                        </div>


                        <div>
                            <h1>Average Rating :</h1>
                            <div
                                className={Classes.starCss} style={{backgroundImage:"linear-gradient( to right,gold 0%,gold "+item.average_rating+"%,transparent 10.333%,transparent 100%)"}}/>



                        </div>

                        <h1>Summary  :</h1>
                        <div>
                            {item.summary}

                        </div>
                        <div>
                            <h1>text :</h1>
                            {item.text}
                        </div>


                    </div></div>

            );


        }
    );

    return (
        <div>
            <h1 className={classes.heading}>
                <FormattedMessage
                    id={'reviews.review'}
                    defaultMessage={' Products reviews'}
                />
            </h1>
            <MyForm productSku={productSku}/>

            <div>{relatedItems}</div>



        </div>

    );
};

export default Reviews;