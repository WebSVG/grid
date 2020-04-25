import {Grid} from "./index.js"

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
}

main();
