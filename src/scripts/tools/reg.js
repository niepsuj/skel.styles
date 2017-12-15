const reg = {}
const generateId  = () => '_' + Math.random().toString(36).substr(2, 9)
const removeItem = (e) => {
  if(e.relatedNode === e.srcElement){
    reg[e.target.getAttribute('skel')] = null;
  }
}

export const set = (object, element) => {
  let id = generateId();
  element.setAttribute('skel', id);
  element.addEventListener('DOMNodeRemoved', removeItem);
  reg[id] = object;
}

export const get = (element) => reg[element.getAttribute('skel')]
