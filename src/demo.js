import {Grid} from "./index.js"
import {html} from "./web-js-utils-2.0.2.js"

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
    let grid = new Grid(document.body,150)
    for(let i=0;i<20;i++){
        let div = grid.get_div(get_custom_div_props());
        console.log(`created comp : ${div.id}`);
    }

    grid.apply()


    html(document.body,/*html*/`<a>
    <p align="center">
        <p align="center">"shift+mouse wheel" : scale grid</p>
    </p>
    </a>`)

    html(document.body,/*html*/`<a>
        <p align="center">
            <a href="https://github.com/WebSVG/grid" target="_blank">
            <img src=./media/github.png width=40 href="https://github.com/WebSVG/grid">
            <p align="center">Readme & Source Code</p>
        </p>
    </a>`)


}

main();
