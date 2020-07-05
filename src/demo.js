import {Grid} from "./index.js"
import {html} from "../lib/web-js-utils.js"

async function add_svg(parent,file,props){
    console.log(`fetching file '${file}'`);
    const response = await fetch(file);
    const svg_text = await response.text();
    parent.insertAdjacentHTML("beforeend",svg_text);
    let elements = parent.getElementsByTagName("svg");
    let res_svg =  elements[elements.length-1];
    const bb = res_svg.getBBox()
    res_svg.setAttribute("viewBox",`${bb.x} ${bb.y} ${bb.width} ${bb.height}`)
    return res_svg;
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
    let grid = new Grid(document.body,150)
    let d1
    for(let i=0;i<20;i++){
        let props = get_custom_div_props()
        let div = grid.get_div(props);
        console.log(`created comp : ${div.id}`);
        div.classList.add("inside")
        let mysvg = add_svg(div,"media/tiger.svg",props)
        .then((res)=>{
            let div_pz = panzoom(res, {
                bounds: false,
                boundsPadding: 1.0,
                maxZoom: 3,
                minZoom: 0.5,
                beforeWheel: function(e) {
                    // allow wheel-zoom only if altKey is down. Otherwise - ignore
                    let shouldIgnore = !e.altKey;
                    return shouldIgnore;
                  }
            });
        })
    }

    grid.apply()


    html(document.body,/*html*/`<a>
    <p align="center">
        <p align="center">"shift+mouse wheel" : scale grid</p>
        <p align="center">"alt+mouse wheel"   : zoom svg element</p>
        <p align="center">"mouse wheel"       : default page vertical scroll</p>
        <p align="center">"ctrl+mouse wheel"  : default page zoom (not recommended)</p>
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
