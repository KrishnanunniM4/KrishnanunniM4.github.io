
$(document).ready(function(){

    var id = 1;
    var currentElement = '';

    $('#btnNew').click(function(){
        var newNote = $("<div class='sticky gradient1' id='sticky" + id +"'><textarea>Add your Note.....</textarea><span class='ui-icon ui-icon-trash'></span></div>").resizable().draggable({stack:'.sticky'});
        currentElement = 'sticky' + id;
        id++;
        $('#container').append(newNote);

        var left = $(this).position().left;
        var top = $(this).position().top + 50;
        $('.sticky').each(function(){
            $(this).css({left:left + 'px', top:top + 'px', position: 'absolute'});
            left += 235;
        });
        
    });

    $('#container').on('click', '.sticky', function(){
        currentElement = $(this).attr('id');
    });

    $('#container').on('click', 'span.ui-icon-trash', function(){
        $(this).parent().remove();
    });

    $('#container').on('click', 'textarea', function(){
        var maximum = getMax('.sticky');
        $(this).parent().css('z-index', (maximum+1));
    });

    $('.box').click(function(){
        if(currentElement != '')
        {
            var color = $(this).attr('class').split(' ')[0];
            $('#' + currentElement).removeClass();
            $('#' + currentElement).addClass('sticky ' + color);
        }
    });

}); 

function getMax(items)
{
    var max = 0;
    $(items).each(function(){
        var z = $(this).css('z-index');
        if(z == 'auto')
        {
            z = 1;
        }
        max = Math.max(max, z);
    });
    return max;
}
