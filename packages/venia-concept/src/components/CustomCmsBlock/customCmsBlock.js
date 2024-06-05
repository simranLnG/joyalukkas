import React from "react";
import CmsBlockGroup from "@magento/venia-ui/lib/components/CmsBlock";
import 'src/components/CustomCmsBlock/customCmsBlock.css';
const CustomCmsBlock = () =>
{
    return (
        <div>
            <div>This this my cms page</div>
            <CmsBlockGroup identifiers={['home-page-block']} />
            <CmsBlockGroup identifiers={['test-block-simran']} />
            <CmsBlockGroup identifiers={['test']} />
        </div>

    );
};
export default CustomCmsBlock