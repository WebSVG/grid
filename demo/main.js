import {html,css,uid,suid} from "../src/utils.js"
import * as grid from "../src/index.js"

//https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
const sheet = new CSSStyleSheet();

let scale = 1;

function div(width,height,g,b){
    return /*html*/`<div style="width:${width}px;height:${height}px;border:thick solid #0000FF" />`
}

function div_comp(parent,sheet){
    const mean_width = 150;
    const width = Math.round(Math.random()*200)+100;
    const height = Math.round(Math.random()*200)+100;
    const g = Math.round(Math.random()*155)+100;
    const b = Math.round(Math.random()*155)+100;
    const id = `div_${suid()}`;
    const width_span = (width>mean_width)?2:1;
    const height_span = (height>mean_width)?2:1;
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
    let c_comp = html(parent,/*html*/`
        <div id=${id} class="child" data-width=${width} data-height=${height} />
    `);
    c_comp.addEventListener('wheel',onWheel);
    return c_comp;
}

function main_div_comp(parent,sheet){
    const id = `div_${suid()}`;
    const mean_width = 150;

    sheet.insertRule(/*css*/`
    #${id} {
        display: grid;
        //grid-template-columns: repeat(4, 1fr);
        grid-template-columns: repeat(auto-fit, minmax(${mean_width}px, 1fr));
        //grid-template-columns: repeat(3, fit-content(300px));
        grid-gap: 10px;
        align-items: center;
        justify-items: center;
        background:rgb(250,250,240);
    }
    `);
    let comp = html(parent,/*html*/`
        <div id=${id} class="main" data-mean=${mean_width} />
    `);
    comp.addEventListener('wheel',onWheel);
    return comp;
}

function onWheel(e){
    if(!e.shiftKey){
        return;
    }
    const min_scale = 0.5;
    const max_scale = 2;
    if(e.deltaY > 0){
        scale = scale / 1.2;
    }else if (e.deltaY < 0){
        scale = scale * 1.2;
    }
    if(scale > max_scale){
        scale = max_scale;
    }else if(scale < min_scale){
        scale = min_scale;
    }
    console.log(`scale = ${scale}`);
    const main_element = e.target.classList.contains("main")?e.target:e.target.parentElement;
    const elements = main_element.children;
    const min_width = Math.round(main_element.getAttribute("data-mean") * scale);
    //console.log(`id = ${main_element.id} ; min width= '${min_width}'`);
    main_element.style.gridTemplateColumns = `repeat(auto-fit, minmax(${min_width}px, 1fr))`;
    for(let i=0;i<elements.length;i++){
        const element = elements[i];
        element.style.width = element.getAttribute("data-width") * scale;
        element.style.height = element.getAttribute("data-height") * scale;
    }
    e.preventDefault();
    e.stopPropagation();
}

function main(){
    let main_div = main_div_comp(document.body,sheet);
    
    for(let i=0;i<20;i++){
        div_comp(main_div,sheet);
    }

    document.adoptedStyleSheets = [sheet];
}

main();
