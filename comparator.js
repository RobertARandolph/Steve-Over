// <![CDATA[

/* Variables!
 *  
 * Some clown, or two clowns, have gotten a hold of my memoirs. 
 */

var imgs_uid = 0; /* _Global_ UID for single comparators. I did this sloppy, because there is no not-sloppy way to do it. */
var div_width = 500;
var div_height = 500;

/* Main function
 *
 * No. No, I'm sorry, I don't know the number to, uh, my savings account,
 * because believe it or not I don't spend my entire day sitting around trying to memorize the fucking numbers to my fucking bank accounts! Moron! 
 */

window.onload = function () 
{
    var main_div = document.getElementsByName("steveover");
    var main_div_length = main_div.length;
    var max_rows;
    var imgs;
    var imgs_length;
    var theme_to_use;
    var theme_elements = ["button", "box", "img"];


    for ( var i = 0; i < main_div_length; i++) 
    {
	max_rows = ( main_div[i].getAttribute("maxrows") > 0 ) ? main_div[i].getAttribute("maxrows") : 2;

	imgs = main_div[i].getElementsByTagName("img");
	imgs_length = imgs.length; /* JS re-evals the imgs.length in the loops as you delete things. You have to store it statically. */

	theme_to_use = get_theme( main_div[i], theme_elements );
	add_theme ( theme_to_use, theme_elements );
	main_div[i].setAttribute("class", theme_to_use + "_box");

	img_maker( main_div[i], theme_to_use, imgs, imgs_length );
	link_writer( main_div[i], theme_to_use, main_div[i].getAttribute( "maxrows"), imgs, imgs_length );
	img_fucker( main_div[i], imgs, imgs_length );
	increment_uid();
    }
}

/* Mouse over image switcher-a-do-dealie
 *  
 * I'm not set up to mold hard rubber. 
 */

function mouseOverImage( comparator_uid, image ) {  
    document.getElementById(comparator_uid).src = image;  
}  

/* Building the Comparator
 *
 * I don't fuckin' know either. I guess we learned not to do it again. I'll be fucked if I know what we did. 
 */

function img_maker ( div_to_use, theme_to_use, imgs, iterations ) 
{
    var new_img = document.createElement("img");

    for (var i = 0; i < iterations; i++) 
    {
	if(imgs[i].getAttribute("width") > div_width)
	    div_width = imgs[i].getAttribute("width");
	if(imgs[i].getAttribute("height") > div_height)
	    div_height = imgs[i].getAttribute("height");
    }

    div_to_use.setAttribute("style", "width: " + div_width + "px; height: auto;");

    new_img.setAttribute("src", imgs[0].src);
    new_img.setAttribute("id", "comparator" + imgs_uid);
    new_img.setAttribute("class", theme_to_use + "_img");
    div_to_use.appendChild(new_img);
}

/* This is so we strictly control the UID. This gets messy quick.
 *
 * We've been over, and over, and over this, first you say you can't commit, and then... would you come down from there? 
 */

function increment_uid () 
{
    imgs_uid++;
}

/* Get the theme style for the current element. /themename/button|box|img.css will be used
 *
 * But eh, no, I mean, you now he could be one of these guys that cruises the internet. 
 */

function get_theme( div_to_use, theme_elements )
{
    var cur_theme = div_to_use.getAttribute( "class" );

    if ( !cur_theme )
	return "default_theme";

    for (var i = 0; i < theme_elements; i++)
    {
	if (!style_exists( cur_theme + "/" + theme_elements[i] + ".css"))
	    	return "default_theme";
    }

    return cur_theme;
}

/* Check for the style CSS
 *
 * They should call this Mr.Loser.com
 */

function style_exists( url )
{
    var http = new XMLHttpRequest();

    http.open('GET', url + ".css", false);
    http.send();

    if (http.status == 0 || http.status == 200) /* 0 == local success, 200 == http success */
	return true;
    else
	return false;
}

/* Insert the theme css into the document
 *
 * Organs?
 */

function add_theme ( theme, theme_elements )
{
    var style_sheet;

    for (var i = 0; i < theme_elements.length; i++)
    {
	style_sheet = document.createElement("link");
	style_sheet.setAttribute("rel", "stylesheet");
	style_sheet.setAttribute("type", "text/css");
	style_sheet.setAttribute("href", theme + "/" + theme_elements[i] + ".css");
	document.getElementsByTagName("head")[0].appendChild( style_sheet );
    }
}

/* Link writing 
 * 
 * Appearances can be... deceptive. 
 */

function link_writer ( div_to_use, theme_to_use, max_rows, imgs, iterations ) 
{
    var optimal_cells = Math.ceil( iterations / max_rows );
    var link_container = document.createElement("div");
    var link_table = document.createElement("table");
    var cur_link = 0;
    
    link_container.setAttribute("class", theme_to_use + "_link_container");
    link_container.setAttribute("style", "width: " + div_width + "px;");

    div_to_use.appendChild(link_container);

    for (var i = 0; i < max_rows; i++)
    {
	var cur_row = link_table.insertRow(-1); /* -1 inserts in last position */

	for (var k = 0; k < optimal_cells; k++)
	{
	    var link_replacer = document.createElement("a");

	    if (cur_link >= iterations)
		break; 

	    link_replacer.setAttribute("href", "#");
	    link_replacer.setAttribute("onmouseover", "mouseOverImage(\'comparator" + imgs_uid + "\', \'" + imgs[cur_link].getAttribute("src") + "\')");
	    link_replacer.innerHTML = imgs[cur_link].getAttribute("alt");

	    /* Allow for left and right links to be floated or aligned to edges if wanted. */
	    switch ( k )
	    {
	    case 0:
		link_replacer.setAttribute("class", theme_to_use + "_first_link "   + theme_to_use + "_link");
		break;
	    case optimal_cells - 1:
		link_replacer.setAttribute("class", theme_to_use + "_last_link "    + theme_to_use + "_link");
		break;
	    default:
		link_replacer.setAttribute("class", theme_to_use + "_middle_links " + theme_to_use + "_link");
	    }

	    cur_row.insertCell(-1).appendChild( link_replacer ); /* -1 inserts in last position */
	    cur_link++;
	}
    }

    link_table.setAttribute("width", "100%");
    link_table.setAttribute("padding", "0");
    link_table.setAttribute("margin", "0");

    link_container.appendChild(link_table);
}

/* Deleting the old images
 *
 * Oh my fuck... I just killed a fucking spook! 
 */

function img_fucker ( div_to_use, imgs, fuckers_to_fuck ) 
{
    for (var i = 0; i < fuckers_to_fuck; i++) 
    {
	div_to_use.removeChild(div_to_use.getElementsByTagName("img")[0]);
    }
}


// ]]>
