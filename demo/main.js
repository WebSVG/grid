import {html,css,uid,suid} from "../src/utils.js"
import * as grid from "../src/index.js"

//https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
const sheet = new CSSStyleSheet();

function div(width,height,g,b){
    return /*html*/`<div style="width:${width}px;height:${height}px;border:thick solid #0000FF" />`
}

function div_comp(parent,sheet){
    const width = Math.round(Math.random()*200)+100;
    const height = Math.round(Math.random()*200)+100;
    const g = Math.round(Math.random()*155)+100;
    const b = Math.round(Math.random()*155)+100;
    const id = `div_${suid()}`;
    const width_span = (width>150)?2:1;
    const height_span = (height>150)?2:1;
    css(sheet,/*css*/`
    #${id} {
        width:${width};
        grid-column:span ${width_span};
        grid-row:span ${height_span};
        height:${height};
        background: rgb(150,${g},${b});
        //align-self: center;
        //justify-self: center;
    }
    `);
    return html(parent,/*html*/`
        <div id=${id} />
    `);
}

function main_div_comp(parent,sheet){
    const id = `div_${suid()}`;
    sheet.insertRule(/*css*/`
    .${id} {
        display: grid;
        //grid-template-columns: repeat(4, 1fr);
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        //grid-template-columns: repeat(3, fit-content(300px));
        grid-gap: 10px;
        align-items: center;
        justify-items: center;
        background:rgb(250,250,240);
    }
    `);
    return html(parent,/*html*/`
        <div id=${id} class=${id} />
    `);
}

function main(){
    let main_div = main_div_comp(document.body,sheet);
    
    for(let i=0;i<10;i++){
        div_comp(main_div,sheet);
    }

    document.adoptedStyleSheets = [sheet];
}

main();
