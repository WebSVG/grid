# grid
Smart CSS grid for arraging HTML elements of different sizes with a known min and max width. Scaling elements on mouse wheel also scales the grid to Keep the expected responsiveness.

# Live Demo

<img src="./media/view.png" href="https://websvg.github.io/grid/" target="_blank">

https://websvg.github.io/grid/

* reload the page to get new random size shapes
* change the window size to let the elements responsively reorganise
* shitKey+mouse wheel : scale shapes up and down together with the grid, keeping responsive reorganisation

# Web docs
## CSS Style Sheet Constructors
* https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet

## CSS Grid Layout
* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout


# Note on development
* the build script is not cross os given the poor default cross platform capabilities available
* it is not necessary to recreate the wheel, in stead of re-writing a new cross platform copy script, the option of using an existing minimal bundler is being analyzed
* here some development priorization rules :
  * provide a running demo on the same repo
  * provide a ready to use file after install (optionally after build if possible to have it 100% cross platform and automated)
  * minimize file storage duplication, and keep a simple repo directory structure
  * automate the build process
  * use a budler if needed but minimize balck magic lock in and rely rather on tested standards
