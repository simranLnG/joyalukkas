import React from "react";
import {Form} from 'informed';
import { func, shape, string } from 'prop-types';
import Field from '@magento/venia-ui/lib/components/Field';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import {FormattedMessage, useIntl} from 'react-intl';
import { useMyform } from './backendreviewform'
import Button from '@magento/venia-ui/lib/components/Button';
import {useStyle} from "@magento/venia-ui/lib/classify";

const MyForm = props =>
{
    const {productSku}=props;
    //console.log(productSku);

    const classes = useStyle();
    const talonProps =
        useMyform(
            {
                initialValues:props.initialValues,
                onSubmit:props.onSubmit,
                sku:productSku
            });
    const {
        
        handleSubmit,
        name,


    }=talonProps;

    const successmessage = ()=>{
        if (name){
            return(alert("Thank you for submit")||window.location.reload());
        }
    };

    //console.log(name);
    const {formatMessage}=useIntl();
   // const { who = "nobody" } = useParams();
    const submitButton=(
        <Button
            type="submit"
            priority="high"
            data-cy="form-submitButton" >
            <FormattedMessage
                id={'form.heading'}
                defaultMessage={"Submit"}

            />
        </Button>
    );

return (
        <Form data-cy="Myform"
              onSubmit={handleSubmit}
              initialValues={productSku}
              >
            <Field className={classes.button}
                   id="nickname"
                   label={formatMessage
                   ({
                       id:'myform.Nickname',
                       defaultMessage:'Nickname'
                   })} >
                <TextInput id="nick_name"
                           field="myform.nickname"
                           autoComplete="given-name"
                           data-cy="myform-nickname" />
            </Field>
            <Field
                id="last_name"
                label=
                    {formatMessage(
                        { id:"myform.summary",
                            defaultMessage:"Summary"
                        })}>
                <TextInput
                    field="myform.summary"
                    id="last_name"
                    autoComplete='family-name'
                    data-cy="myform-summary"/>

            </Field>
            <Field id="review"
                   label=
                       {
                           formatMessage(
                               {
                                   id:'myform.review',
                                   defaultMessage:'Review'
                               })}>
            <TextInput
                field="myform.review"
                id="message"
                autoComplete="review"
                data-cy="myform-review"
            />

            </Field>

            <TextInput type="hidden"
                      id="sku"
                      field="sku"/>
            <div
                className={classes.button}>
                {submitButton}
            </div>
            {successmessage()}
        </Form>

);
};

export default MyForm;