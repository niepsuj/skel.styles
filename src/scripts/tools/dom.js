import * as reg from './reg';

export const mount = (query, component) => {
  let elements = document.querySelectorAll(query), i = elements.length;
  for(;--i;) reg.set(new component(elements[i]), elements[i])
}

export const parent = (query, element) => {
  let pe = element.parentElement
  if(pe.name === 'BODY' || pe.matches(query)) return pe
  else return parent(query, pe)
}

export const cleanup = (element) => {
  while(element.firstChild) element.removeChild(element.firstChild)
}
