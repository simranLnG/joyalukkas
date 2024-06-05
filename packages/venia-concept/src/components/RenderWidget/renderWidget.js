import React, { useEffect, useState } from "react";
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import 'swiper/swiper-bundle.min.css';

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

// Function to replace widget directive with actual block content
function replaceWidgetDirective(content, blockId, blockContent) {
    const widgetDirective = new RegExp(`{{widget type="Magento\\\\Cms\\\\Block\\\\Widget\\\\Block" template="widget/static_block/default.phtml" block_id="${blockId}"}}`, 'g');
    return content.replace(widgetDirective, blockContent);
}

export default function RenderWidget() {
    const GET_RECORD = gql`
        {
            cmsBlocks(identifiers: ["test", "test1"]) {
                items {
                    identifier
                    content
                }
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_RECORD, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        if (data) {
            const testBlock = data.cmsBlocks.items.find(item => item.identifier === "test");
            const test1Block = data.cmsBlocks.items.find(item => item.identifier === "test1");
            let content = unescapeHtml(testBlock.content);

            // Replace widget directive with test1 block content
            content = replaceWidgetDirective(content, "29", unescapeHtml(test1Block.content));
            setHtmlContent(content);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <div dangerouslySetInnerHTML={createMarkup(htmlContent)} />
        </div>
    );
}
