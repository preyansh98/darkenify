'use strict';

/*Colors */ 
let _color = "black";
let _cardColor = "#121212";
let _invert = "white";

/* Intervals */ 
const INVERT_TITLES_INTERV = 100;  

/* Timeouts */ 
const SHADOW_TIMEOUT = 100;
const PAGE_LOAD_TIMEOUT = 250; 
const SPINNER_TIMEOUT = 2500;

//TODO: Stop Hardcoding :(
const invertCourseText = () => {
    if(document.URL.includes('home')){
        try{
            if(document.getElementsByTagName('d2l-my-courses').length > 0){
                let tiles = document.getElementsByTagName('d2l-my-courses')[0]
                            .shadowRoot["firstElementChild"]
                            .shadowRoot["firstElementChild"]
                            .shadowRoot["children"][2]
                            .children[1]
                            .shadowRoot["children"][1]; 
                
                for(let i = 0; i<tiles["childElementCount"]; ++i)
                    tiles["children"][i].style.color = _invert; 
            }
        } catch (err) {
            console.log("Failed to invert course text");
            console.error(err); 
        }
    }
}

const invertPageTitles = () => {
    let _invertPageTitles = () => {
        let invertElements = (className) => {
            if(document.getElementsByClassName(className).length > 0)
                document.getElementsByClassName(className)[0].style.color = _invert; 
        }

        if(document.URL.includes('content')){
            invertElements('d2l-page-title');
            invertElements('d2l-heading-1');
        }
    }

    _invertPageTitles(); 

    const listener = new MutationObserver((mutations) => {
        _invertPageTitles(); 
    });

    listener.observe(document.querySelector('title'),
        {attributes: true, childList: true, subtree: true});
}   

const invertNavIcons = () => {
    try {
        for(let i = 0; i<=3; ++i) {
         document.getElementsByClassName('d2l-dropdown-opener')[i]
                    .shadowRoot["children"][1]
                    .children[0]
                    .children[0]
                    .shadowRoot
                    .children[0]
                    .style.color = _invert;
        }
    } catch(err) {
        console.log("Failed to invert nav icons");
        console.error(err);
    }

    let profileNameWrapper = document.getElementsByClassName('d2l-navigation-s-personal-menu-wrapper');
    if(profileNameWrapper.length > 0)
        profileNameWrapper[0].style.color = _invert;
}

const darkenElementsByClassName = (classesToDarken) => {
    for(const className of classesToDarken) {
        let collection = document.getElementsByClassName(className);
        
        if(collection.length > 0)
            collection[0].style.backgroundColor = _cardColor; 
    }
}

const darken = () => {
    let classesToDarken = []; 

    //Body
    if(document.getElementsByClassName('d2l-body').length > 0)
        document.getElementsByClassName('d2l-body')[0].style.backgroundColor = _color;

    document.getElementsByTagName('body')[0].style.backgroundColor = _color; 
        
    let searchBarBg = document.getElementsByClassName('d2l-twopanelselector-side');
    if(searchBarBg.length > 0)
        searchBarBg[0].style.background = _color;
    
    //Front Page -> Navigation: 
    classesToDarken.push('d2l-branding-navigation-dark-foreground-color');
    classesToDarken.push('d2l-branding-navigation-background-color');

    //Content Page -> sidebar:
    classesToDarken.push('d2l-twopanelselector-side-padding');
    classesToDarken.push('d2l-twopanelselector-padding');

    //Darken listed classes. 
    darkenElementsByClassName(classesToDarken);

    //Color all Tile Backgrounds
    let tiles = document.getElementsByClassName('d2l-tile');

    for (let i = 0; i<tiles.length; ++i)
        tiles[i].style.backgroundColor = _cardColor;

/* BEGIN INVERT */

    //Invert all Nav Links. 
    if(document.getElementsByClassName('d2l-navigation-s-group-text')[0])
        document.getElementsByClassName('d2l-navigation-s-group-text')[0].style.color = _invert;
    
    let navLinks =  document.getElementsByClassName('d2l-navigation-s-link');
    for(let i = 0; i<navLinks.length; ++i)
        navLinks[i].style.color = _invert;

    //Invert all <p> tags except in 'discussions' and 'news'
    if(!document.URL.includes('discussions') && 
        !document.URL.includes('news') &&
        !document.URL.includes('quizzing')){
        let texts = document.getElementsByTagName('p');
        for(let i = 0; i<texts.length; ++i)
            texts[i].style.color = _invert;
    }

    //Invert all textblocks on "content" page
    if(document.URL.includes('content')){
        let textBlocks = document.getElementsByClassName('d2l-textblock');
        for(let i = 0; i<textBlocks.length; ++i){
            if(textBlocks[i].title) continue;
            textBlocks[i].style.color = _invert; 
        }
    }
    
    //Invert all headings.
    let headings = document.getElementsByClassName('d2l-heading vui-heading-4')
    for(let i = 0; i<headings.length; ++i)
        headings[i].style.color = _invert; 

    if(document.getElementsByClassName('vui-heading-1').length > 0)
        document.getElementsByClassName('vui-heading-1')[0].style.color = _invert; 

    if(document.URL.includes('content'))
        invertPageTitles(); 

    //Nav Icons
    setTimeout(invertNavIcons, SHADOW_TIMEOUT);

    //Course Text
    setTimeout(invertCourseText, SPINNER_TIMEOUT); 
} 

setTimeout(darken, PAGE_LOAD_TIMEOUT); 
