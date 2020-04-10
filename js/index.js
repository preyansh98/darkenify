'use strict';

let _color = "black";
let _invert = "white";
const PAGE_LOAD_TIMEOUT = 250; 
const SPINNER_TIMEOUT = 2500;

//TODO: Stop Hardcoding :(
const invertCourseText = () => {
    if(window.location.href.indexOf('home') != -1){
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

const darkenElementsByClassName = (classesToDarken) => {
    for(const className of classesToDarken) {
        let collection = document.getElementsByClassName(className);
        
        if(collection.length > 0)
            collection[0].style.backgroundColor = _color; 
    }
}

const darken = () => {
    let classesToDarken = []; 

    //Body
    classesToDarken.push('d2l-body');

    //Front Page -> Navigation: 
    classesToDarken.push('d2l-branding-navigation-dark-foreground-color');
    classesToDarken.push('d2l-branding-navigation-background-color');
    classesToDarken.push('d2l-page-main');

    //Front Page -> Tiles:
    classesToDarken.push('d2l-tiles-container');

    //Content Page -> sidebar:
    classesToDarken.push('d2l-twopanelselector-side-padding');
    classesToDarken.push('d2l-twopanelselector-padding');

    let searchBarBg = document.getElementsByClassName('d2l-twopanelselector-side');
    if(searchBarBg.length > 0)
        searchBarBg[0].style.background = 'black';
    
    //Darken listed classes. 
    darkenElementsByClassName(classesToDarken);

    //Color all Tile Backgrounds
    let tiles = document.getElementsByClassName('d2l-tile');

    for (let i = 0; i<tiles.length; ++i)
        tiles[i].style.backgroundColor = _color;

    //Color Body Tag
    document.getElementsByTagName('body')[0].style.backgroundColor = 'black'; 

/* BEGIN INVERT */

    //Invert all Nav Links. 
    if(document.getElementsByClassName('d2l-navigation-s-group-text')[0])
        document.getElementsByClassName('d2l-navigation-s-group-text')[0].style.color = "white"
    
    let navLinks =  document.getElementsByClassName('d2l-navigation-s-link');
    for(let i = 0; i<navLinks.length; ++i)
        navLinks[i].style.color = _invert;

    //Invert all <p> tags except in 'discussions'
    if(window.location.href.indexOf('discussions') != -1){
        let texts = document.getElementsByTagName('p');
        for(let i = 0; i<texts.length; ++i)
            texts[i].style.color = _invert;
    }
    
    //Invert all headings.
    let headings = document.getElementsByClassName('d2l-heading vui-heading-4')
    for(let i = 0; i<headings.length; ++i)
        headings[i].style.color = _invert; 


    //Course Text
    setTimeout(invertCourseText, SPINNER_TIMEOUT); 
} 

setTimeout(darken, PAGE_LOAD_TIMEOUT); 