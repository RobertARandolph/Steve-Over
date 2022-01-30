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
    var max_items_row;
    var imgs;
    var imgs_length;
    var theme_to_use;
    var theme_elements = ["button", "box", "img"];


    for ( var i = 0; i < main_div_length; i++) 
    {
	    max_items_row = ( main_div[i].getAttribute("maxitemsrow") > 0 ) ? main_div[i].getAttribute("maxitemsrow") : 4;
        imgs = main_div[i].getElementsByTagName("img");
        imgs_length = imgs.length; /* JS re-evals the imgs.length in the loops as you delete things. You have to store it statically. */

        theme_to_use = get_theme( main_div[i], theme_elements );
        add_theme ( theme_to_use, theme_elements );
        main_div[i].setAttribute("class", theme_to_use + "_box");

        w = img_maker( main_div[i], theme_to_use, imgs, imgs_length );

        main_div[i].setAttribute("width", w);
        link_writer( main_div[i], theme_to_use, max_items_row, imgs, imgs_length );
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
        // if(imgs[i].getAttribute("width") > div_width)
        div_width = imgs[i].getAttribute("width");
        if(imgs[i].getAttribute("height") > div_height)
            div_height = imgs[i].getAttribute("height");
    }

    div_to_use.setAttribute("style", "width: " + div_width + "px; height: auto;");

    new_img.setAttribute("src", imgs[0].src);
    new_img.setAttribute("id", "comparator" + imgs_uid);
    new_img.setAttribute("class", theme_to_use + "_img");
    div_to_use.appendChild(new_img);

    return div_width;
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

function link_writer ( div_to_use, theme_to_use, max_items_row, imgs, iterations ) 
{
    var cur_link_container = document.createElement("div");
    var num_imgs = imgs.length - 1; /* remember, we added a new image stack already */
    
    cur_link_container.setAttribute("class", theme_to_use + "_link_container");

    link_containers = []
    var elements_left = true;

        for (var i = 0; i < num_imgs; i++)
        {
            elements_left = true;
            var link_replacer = document.createElement("a");

            link_replacer.setAttribute("href", "#");
            link_replacer.setAttribute("onmouseover", "mouseOverImage(\'comparator" + imgs_uid + "\', \'" + imgs[i].getAttribute("src") + "\')");
            link_replacer.innerHTML = imgs[i].getAttribute("alt");
            link_replacer.setAttribute("class", theme_to_use + "_link");

            cur_link_container.appendChild( link_replacer ); /* -1 inserts in last position */

            if ((i+1) % max_items_row == 0) {
                link_containers.push(cur_link_container);
                cur_link_container = document.createElement("div");
                cur_link_container.setAttribute("class", theme_to_use + "_link_container");
                elements_left = false;
            }
        }
    if (elements_left)
        link_containers.push(cur_link_container);

    for (i = 0; i < link_containers.length; i++) {
        div_to_use.appendChild(link_containers[i]);
    }

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
