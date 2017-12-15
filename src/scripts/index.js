import 'babel-polyfill';
import NavbarPanel from './components/NavbarPanel'
import Navbar from './components/Navbar'
import * as dom from './tools/dom'

dom.mount('.navbar', Navbar)
dom.mount('.navbar__panel', NavbarPanel)
