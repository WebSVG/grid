import {html,css,uid,suid} from "../src/utils.js"
import * as grid from "../src/index.js"

//https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
const sheet = new CSSStyleSheet();

function div(width,height,g,b){
    return /*html*/`<div style="width:${width}px;height:${height}px;border:thick solid #0000FF">H</div>`
}

function div_comp(parent,sheet){
    const width = Math.round(Math.random()*200)+100;
    const height = Math.round(Math.random()*200)+100;
    const g = Math.round(Math.random()*155)+100;
    const b = Math.round(Math.random()*155)+100;
    const id = `div_${suid()}`;
    css(sheet,/*css*/`
    #${id} {
        width:${width};
        height:${height};
        background: rgb(150,${g},${b});
    }
    `);
    return html(parent,/*html*/`
        <div id=${id} >H</div>
    `);
}

function main_div_comp(parent,sheet){
    const id = `div_${suid()}`;
    sheet.insertRule(/*css*/`
    .${id} {
        color: blue
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
