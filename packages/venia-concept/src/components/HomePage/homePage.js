import globalCSS from '/media/simran/DATA/SimranData/VeniaProj/pwa-studio/packages/venia-ui/lib/components/HomePage/homePage.module.css';
import React from 'react';
import { useState, useEffect } from 'react';

import RadiantSection from 'src/components/RadiantSection/RadiantSection.js';
import HeritageSection from 'src/components/HeritageSection/HeritageSection.js';
import WeddingSection from '../WeddingSection/WeddingSection';


import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';


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

// `MagentoRoute` renders the CMS page, so this component renders nothing.
// This file would be obsolete if the CMS could deliver a stylesheet.
const HomePage = () => {

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
        console.log(content);
    } catch (e) {
        console.error('Error parsing JSON:', e);
    }

    return (
        data &&
        <div>
            heyyy
            <RadiantSection data={content}/>
            <HeritageSection data={content}/>
            <WeddingSection data={content}/>
        </div>
    )
};

export default HomePage;

// Use the import to make webpack inject a stylesheet.
HomePage.globalCSS = globalCSS;
