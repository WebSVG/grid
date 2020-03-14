
function css(sheet,text){
    sheet.insertRule(text);
}

function html(parent,text){
    const fragment = document.createRange().createContextualFragment(text);
    parent.appendChild(fragment);//this also returns fragment, not the newly created node
    return parent.childNodes[parent.childNodes.length-1];
}

function uid(){
    return Date.now()+"_"+Math.floor(Math.random() * 10000)
}

function suid(){
    let date = (Date.now()).toString();
    const sub = date.substring(date.length-6,date.length-1);
    return sub+"_"+Math.floor(Math.random() * 10000)
}

export{
    css,
    html,
    uid,
    suid
};