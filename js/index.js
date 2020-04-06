'use strict';

let _color = "black";
let _invert = "white";

const darkenElementsByClassName = (classesToDarken) => {
    for(const className of classesToDarken) {
        let collection = document.getElementsByClassName(className);
        
        if(collection.length > 0)
            collection[0].style.backgroundColor = _color; 
    }
}

const darken = () => {
    let classesToDarken = []; 

    //Front Page -> Navigation: 
    classesToDarken.push('d2l-branding-navigation-dark-foreground-color');
    classesToDarken.push('d2l-branding-navigation-background-color');
    classesToDarken.push('d2l-page-main');

    //Front Page -> Tiles:
    classesToDarken.push('d2l-tiles-container');
    
    //Darken listed classes. 
    darkenElementsByClassName(classesToDarken);

    //Color all Tile Backgrounds
    let tiles = document.getElementsByClassName('d2l-tile');

    for (let i = 0; i<tiles.length; i++){
        tiles[i].style.backgroundColor = _color;
    }

/* BEGIN INVERT */

    //Color all Nav Links White. 
    let navLinks =  document.getElementsByClassName('d2l-navigation-s-link');
    for(let i = 0; i<navLinks.length; ++i)
        navLinks[i].style.color = _invert;

    //Color all p elements White. 
    let texts = document.getElementsByTagName('p');
    for(let i = 0; i<texts.length; ++i)
        texts[i].style.color = _invert;
    

    //Course Text
} 

setTimeout(darken,300); 