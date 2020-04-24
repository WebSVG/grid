
import {html,css,suid} from "../src/utils.js"

function scale_grid(parent,sheet,props){
    const id = `div_${suid()}`;

    sheet.insertRule(/*css*/`
    #${id} {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(${props.grid_side}px, 1fr));
        grid-gap: 10px;
        align-items: center;
        justify-items: center;
        background:rgb(250,250,240);
    }
    `);
    let comp = html(parent,/*html*/`
        <div    id=${id} 
                class="main" 
                data-side-min=${props.grid_side} 
                data-max-sides=${props.max_sides} 
                data-scale="1" 
        />
    `);
    comp.addEventListener('wheel',onWheel);
    return comp;
}


function onWheel(e){
    if(!e.shiftKey){
        return;
    }
    const main_element = e.target.classList.contains("main")?e.target:e.target.parentElement;
    let scale = main_element.getAttribute("data-scale");
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
    main_element.setAttribute("data-scale",scale.toFixed(2));
    console.log(`scale = ${scale}`);
    const elements = main_element.children;
    const min_width = Math.round(main_element.getAttribute("data-side-min") * scale);
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

class Grid{
    constructor(parent,grid_side,max_sides){
        this.sheet = new CSSStyleSheet()
        this.main_div = scale_grid(parent,this.sheet,{grid_side:grid_side,max_sides:max_sides});
        console.log(JSON.stringify(this.main_div))
    }

    get_div(props){
        let parent = this.main_div
        const side_size = parent.getAttribute("data-side-min");
        const max_nb_sides = parent.getAttribute("data-max-sides");
        const width = props.width;
        const height = props.height;
        const id = `div_${suid()}`;
        //TODO scale up and down to max width / height that keeps within a reasonable number of columns/rows
        //TODO derive the number of columns/rows out of the width and height
        const width_span = (width>side_size)?2:1;
        const height_span = (height>side_size)?2:1;
        css(this.sheet,/*css*/`
        #${id} {
            width:${width};
            grid-column:span ${width_span};
            grid-row:span ${height_span};
            height:${height};
            background: rgb(${props.r},${props.g},${props.b});
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

    apply(){
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, this.sheet];
    }
    
}


export{Grid};
