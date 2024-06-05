const moduleOverridePlugin = require('../moduleOverrideWebpackPlugin');
const { Targetables } = require('@magento/pwa-buildpack');
const componentOverrideFooter = module.exports = {
    ['@magento/venia-ui/lib/components/Footer']: 'src/components/Footer'
};

const componentOverrideHomePage = module.exports = {
    ['@magento/venia-ui/lib/components/HomePage']: 'src/components/HomePage'
};

module.exports = targets => {
    // targets.of("@magento/venia-ui").routes.tap(routes => {
    //     routes.push({
    //         name: "HelloworldCustomRouter",
    //         pattern: "/helloworlds",
    //         path: require.resolve("../components/Helloworld/helloworld.js")
    //     });
    //     return routes;
    // });
    targets.of("@magento/venia-ui").routes.tap(routes => {
        routes.push({
            name: "MyCustomCmsBlock",
            pattern: "/customcmsblock",
            path: require.resolve("../components/CustomCmsBlock/customCmsBlock.js")
        });
        return routes;
    });

    targets.of("@magento/venia-ui").routes.tap(routes => {
        routes.push({
            name: "HelloWorldCustomRouter",
            pattern: '/helloworld',
            path: require.resolve('../components/HelloWorld/HelloWorld.js')
        })
        return routes;
    });

    targets.of("@magento/venia-ui").routes.tap(routes => {
        routes.push({
            name: "TestQueryCustomRouter",
            pattern: '/testquery',
            path: require.resolve('../components/TestQuery/TestQuery.js')
        })
        return routes;
    });
    
    targets.of("@magento/venia-ui").routes.tap(routes => {
        routes.push({
            name: "JoyalukkasSliderTwoCustomRouter",
            pattern: '/slider2',
            path: require.resolve('../components/JoyalukkasSliderTwo/JoyalukkasSliderTwo.js')
        })
        return routes;
    });

    targets.of("@magento/venia-ui").routes.tap(routes => {
        routes.push({
            name: "CmsPageContentCustomRouter",
            pattern: '/cmspagecontent',
            path: require.resolve('../components/CMSPageContent/CmsPageContent.js')
        })
        return routes;
    });

    targets.of("@magento/venia-ui").routes.tap(routes => {
        routes.push({
            name: "RenderWidgetCustomRouter",
            pattern: '/widget',
            path: require.resolve('../components/RenderWidget/renderWidget.js')
        })
        return routes;
    });

    // targets.of("@magento/venia-ui").routes.tap(routes => {
    //     routes.push({
    //         name: "FormikFormCustomRouter",
    //         pattern: '/formikform',
    //         path: require.resolve('../components/Formik/FormikForm/FormikForm.js')
    //     })
    //     return routes;
    // });

    targets.of("@magento/venia-ui").routes.tap(routes => {
        routes.push({
            name: "CorouselCustomRouter",
            pattern: '/corousel',
            path: require.resolve('../components/SwiperCorousel/SwiperCorousel.js')
        })
        return routes;
    });
    
    targets.of("@magento/venia-ui").routes.tap(routes => {
        routes.push({
            name: "WeddingIdentitySliderCustomRouter",
            pattern: "/weddingidentityslider",
            path: require.resolve("../components/WeddingIdentitySlider/WeddingIdentitySlider.js")
        });
        return routes;
    });

    targets.of("@magento/venia-ui").routes.tap(routes => {
        routes.push({
            name: "HeritageCustomRouter",
            pattern: "/heritage",
            path: require.resolve("../components/HeritageSection/HeritageSection.js")
        });
        return routes;
    });

    targets.of("@magento/venia-ui").routes.tap(routes => {
        routes.push({
            name: "RadiantCustomRouter",
            pattern: "/radiant",
            path: require.resolve("../components/RadiantSection/RadiantSection.js")
        });
        return routes;
    });

    targets.of("@magento/venia-ui").routes.tap(routes => {
        routes.push({
            name: "WeddingCustomRouter",
            pattern: "/wedding",
            path: require.resolve("../components/WeddingSection/WeddingSection.js")
        });
        return routes;
    });


    targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
        new moduleOverridePlugin(componentOverrideFooter).apply(compiler);
    });

    targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
        new moduleOverridePlugin(componentOverrideHomePage).apply(compiler);
    });

    const targetables = Targetables.using(targets);
    const ProductDetails = targetables.reactComponent(
        '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js'
    );

    const MainComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/Main/main.js'
    );
    const Productreview = ProductDetails.addImport(
        "Reviews from 'src/components/reviews/review.js'"
    );
    ProductDetails
        .insertAfterJSX('<Form />', `<${Productreview} />`)
        .setJSXProps('Reviews', {
            'classes': '{classes}',
            'productDetails': '{productDetails}',
        });

    // const Corousel1 = ProductDetails.addImport(
    //     "Reviews from 'src/components/SwiperCorousel/SwiperCorousel.js'"
    // )    
    // ProductDetails
    // .insertAfterJSX('<Form />', `<${Corousel1} />`);


    // const LinkedProducts = ProductDetails.addImport(
    //     "LinkedProducts from 'src/components/LinkedProducts/linkedProducts.js'"
    // );

    //     ProductDetails
    //     .insertAfterJSX('<Form />', `<${LinkedProducts} />`)
    //     .setJSXProps('Reviews', {
    //         'classes': '{classes}',
    //         'productDetails': '{productDetails}',
    //         'options': '{options}',
    //         'meadiaGalleryEntries': '{mediaGalleryEntries}',
    //     });


    // const LinkedProductsCorousel = ProductDetails.addImport(
    //     "LinkedProductsCorousel from 'src/components/LinkedProductsCorousel/linkedProductsCorousel.js'"
    // );

    // ProductDetails
    //     .insertAfterJSX('<Form />', `<${LinkedProductsCorousel} />`)
    //     .setJSXProps('Reviews', {
    //         'classes': '{classes}',
    //         'productDetails': '{productDetails}',
    //         'options': '{options}',
    //         'meadiaGalleryEntries': '{mediaGalleryEntries}',
    //     });


    // const NestedCorousel = ProductDetails.addImport(
    //     "LinkedProductsCorousel from 'src/components/NestedCorousel/nestedCorousel.js'"
    // );
    // ProductDetails
    //     .insertAfterJSX('<Form />', `<${NestedCorousel} />`)
    //     .setJSXProps('Reviews', {
    //         'classes': '{classes}',
    //         'productDetails': '{productDetails}',
    //         'options': '{options}',
    //         'meadiaGalleryEntries': '{mediaGalleryEntries}',
    //     });


    // const HelloWorld = ProductDetails.addImport(
    //     "Reviews from 'src/components/HelloWorld/HelloWorld.js'"
    // );

    // ProductDetails
    //     .insertAfterJSX('<Form />', `<${HelloWorld} />`)


    // const testWidget = ProductDetails.addImport(
    //     "Widget from 'src/components/RenderWidget/renderWidget.js'"
    // )    
    // ProductDetails 
    // .insertAfterJSX('<Form />', `<${testWidget} />`);



    const Widget = MainComponent.addImport(
        "Widget from 'src/components/RenderWidget/renderWidget.js'"
    )    
    MainComponent 
    .insertAfterJSX('<Header/>', `<${Widget} />`);


    const testWidget = ProductDetails.addImport(
        "Widget from 'src/components/RenderWidget/renderWidget.js'"
    )    
    ProductDetails 
    .insertAfterJSX('<Form />', `<${testWidget} />`);

};