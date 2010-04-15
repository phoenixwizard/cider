/*
 * Cursor - Canvas Plugin
 *
 * Licensed under the MIT (LICENSE.txt)
 * 
 */

(function(cider) {

  cider.plugins.cursor = function(editor) {
    // cursor position
    var pos = {col: 0, row: 0},self = this, ctx = editor.context();
console.log("cursor...");
    // set up key press event listener
    // TODO: calls to keybinder plugin
    document.addEventListener('keydown', function(event){
      console.log("heh")
      editor.pos(pos.row, pos.col).append(event.character);
      /*editor.lines[pos.row] = (editor.lines[pos.row])                  ? 
                               editor.lines[pos.row] + event.character :
                               event.character;*/
    }, false);
    
    var hideDuration     = 500,
        showDuration     = 500,
        opacity          = 0.5,
        color            = "#ff6600",
        x                = 10,
        y                = 10,
        charWidth        = 11,
        charHeight       = 16,
        currentOperation = null;

    editor.bind("cider.render",  function() {
        currentOperation();
    });
    
    var show = function() {
      if (editor.lines(pos.row)) {
          var currPos = editor.lines(pos.row).length();
      } else {
          var currPos = 0;
      }

      if (currPos == 0) {
          var posx = 10, posy = 10;
      } else {
          posx = currPos*charWidth+12;
      }
      ctx.save();
      ctx.fillStyle = "white";//"rgba(255,102,51,255)";
      ctx.fillRect(posx,10,2,charHeight);
      ctx.restore();
    };
    
    var hide = function() {
        // fade out or whatever..
    };
      
    var cycleRenderOperation = function() {
        if (currentOperation === hide) {
            currentOperation = show;
            setTimeout(cycleRenderOperation, showDuration);
        } else {
            currentOperation = hide;
            setTimeout(cycleRenderOperation, hideDuration);
        }
    };

    cycleRenderOperation();
  };

})(cider);
