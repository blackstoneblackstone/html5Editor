$(function()
{
  /*
     * Multiselect
     */
    $('#multiselect-optgroup').multiSelect({ selectableOptgroup: true });
    $('#pre-selected-options').multiSelect();
    $('#multiselect-custom').multiSelect({
    	selectableHeader: "<div class='custom-header'>Selectable items</div>",
    	selectionHeader: "<div class='custom-header'>Selection items</div>",
    	selectableFooter: "<div class='custom-header custom-footer'>Selectable footer</div>",
    	selectionFooter: "<div class='custom-header custom-footer'>Selection footer</div>"
    });
    
});