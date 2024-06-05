import { useCallback, useState } from 'react';
import {useMutation, } from '@apollo/client';
import DEFAULT_OPERATIONS from './reviewfromsubmission.gql';
import mergeOperations from "@magento/peregrine/lib/util/shallowMerge";
import {useFormState} from "informed";
import React from "react";
export const useMyform = props=>{
        const{sku}=props;
      //console.log(sku);
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const { createAccount } = operations;
    const[name,setName]=useState(false);
    const [isSubmitting,setIsSubmitting]=useState(false);
    const [createProductReview,]=useMutation(
        createAccount,{
            fetchPolicy:
                'no-cache' }
    );
    const handleSubmit = useCallback( async formValues => {

            setIsSubmitting(true);
            try{
                console.log(formValues);
                await createProductReview({ variables:{
                    sku:sku,
                        nickname:formValues.myform.nickname,
                        summary:formValues.myform.summary,
                        text:formValues.myform.review,
                    } });

                setName(true);
            }
            catch  (e) { console.error(e);
                setIsSubmitting(false); } },
        [createProductReview,setName] );


    return{
        handleSubmit,
        name
    }; };