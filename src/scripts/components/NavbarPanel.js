const CLASS_TRIGGER = 'navbar__panel-trigger'
const CLASS_CONTENT = 'navbar__panel-content'
const CLASS_COMPACT = 'navbar__panel--compact'
const CLASS_ACTIVE = 'navbar__panel--active'

import * as dom from '../tools/dom'
import * as reg from '../tools/reg'

export default class NavbarPanel{
  constructor(root) {
    this.$root = root
    this.$trigger = root.querySelector('.'+CLASS_TRIGGER)
    this.navbar = reg.get(dom.parent('.navbar', root))

    window.addEventListener('resize', this.onWindowResize.bind(this))
    this.updateCompact()
    this.initTrigger()
    this.initContent()
  }

  get triggerEnabled() {
    return 'enabled' === window
      .getComputedStyle(this.$trigger, ':before')
      .getPropertyValue('content')
  }

  get isActive() {
    return this.$root.classList.contains(CLASS_ACTIVE)
  }

  get triggerLeft() {
    return this.$root.offsetLeft
  }

  get triggerWidth() {
    return this.$root.offsetWidth
  }

  render($container){
    $container.appendChild(this.$content)
  }

  close(){
    this.$root.appendChild(this.$content)
    this.$root.classList.remove(CLASS_ACTIVE)
    this.navbar.active = null
  }

  initContent() {
    if(this.isActive){
      this.$content = this.navbar.$panelContainer.querySelector('.'+CLASS_CONTENT)
      this.navbar.activatePanel(this)
    }else{
      this.$content = this.$root.querySelector('.'+CLASS_CONTENT)
    }
  }

  initTrigger() {
    if(null !== this.$trigger){
      this.$trigger.addEventListener('click', (e) => {
        e.preventDefault()
        if(this.$root.classList.toggle(CLASS_ACTIVE)){
          this.navbar.activatePanel(this);
        }else{
          this.close()
        }
      });
    }
  }

  onWindowResize() {
    this.updateCompact()
    this.close()
  }

  updateCompact() {
    if( this.triggerEnabled && !this.compact ){
      this.$root.classList.add(CLASS_COMPACT)
    }else if( !this.triggerEnabled && this.compact ){
      this.$root.classList.remove(CLASS_COMPACT)
    }
  }
}
