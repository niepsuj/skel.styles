const CLASS_PANEL_CONTAINER = 'navbar__panel-container'

import * as dom from '../tools/dom'
import NavbarPanel from './NavbarPanel'

export default class Navbar{
  constructor(root){
    this.$root = root
    this.active = null
    this.initPanelContainer()
    window.addEventListener('resize', this.onWindowResize.bind(this))
  }

  initPanelContainer(){
    this.$panelContainer = this.$root.querySelector('.' + CLASS_PANEL_CONTAINER)
    if(null === this.$panelContainer){
      this.$panelContainer = document.createElement('div')
      this.$panelContainer.classList.add(CLASS_PANEL_CONTAINER)
      this.$root.appendChild(this.$panelContainer)
    }
  }

  activatePanel(panel){
    if(panel instanceof NavbarPanel){
      if(null !== this.active) this.active.close()
      dom.cleanup(this.$panelContainer)
      panel.render(this.$panelContainer)
      this.active = panel;
      this.countPanelContainerPosition()
    }
  }

  countPanelContainerPosition(){
    if(null !== this.active){
      let panelContentWidth = this.$panelContainer.offsetWidth
      let panelTriggerLeft = this.active.triggerLeft
      let panelTriggerWidth = this.active.triggerWidth
      let barWidth = this.$root.offsetWidth

      switch(true){
        // ----------######----------------------------
        //          ################
        case (barWidth - panelTriggerLeft) > panelContentWidth:
          this.$panelContainer.style.left = 'calc('+(panelTriggerLeft)+'px - 0.5rem)'
          this.$panelContainer.style.right = 'auto'
          break;
        // ------------------------------------#######-
        //                             ################
        default:
          this.$panelContainer.style.left = 'auto'
          this.$panelContainer.style.right = '0'
          break;
      }
    }
  }

  onWindowResize(){
    this.countPanelContainerPosition()
  }
}
