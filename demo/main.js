import {scale_grid,scale_grid_div} from "../src/index.js"

//https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet

function div(width,height,g,b){
    return /*html*/`<div style="width:${width}px;height:${height}px;border:thick solid #0000FF" />`
}

function get_custom_div_props(){
    return {
        width:Math.round(Math.random()*200)+100,
        height : Math.round(Math.random()*200)+100,
        r : 150,
        g : Math.round(Math.random()*155)+100,
        b : Math.round(Math.random()*155)+100
    }
}

function main(){
    const sheet = new CSSStyleSheet();

    let main_div = scale_grid(document.body,sheet,{grid_side:150,max_sides:2});
    
    for(let i=0;i<20;i++){
        const props = get_custom_div_props();
        let div = scale_grid_div(main_div,sheet,props);
        console.log(`created comp : ${div.id}`);
    }

    document.adoptedStyleSheets = [sheet];
}

main();
