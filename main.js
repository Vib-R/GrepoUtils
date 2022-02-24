//============================================[CONTROL]=================================================\\
//Változók:
var player;

//Főszál:
(function() {
    'use strict';
	//Ennyit vár, miután betöltődött az oldal:
    setTimeout(AfterGameLoad, 5000);
})();

//Azután hajtódnak végre, miután betöltött a játék:
async function AfterGameLoad()
{
    //Hang hozzáadása:
    player = document.createElement('audio');
    player.src = GM_config.get('TozsdeBot_URL');
    player.preload = 'auto';
    //Vezérlőgomb hozzáadása:
    var zNode = document.createElement ('div');
    zNode.innerHTML = '<button id="btnTozsdeControl" type="button">'
                    + 'Beállítások</button>';
    zNode.setAttribute ('id', 'contTozsde');
    document.getElementsByClassName('nui_main_menu')[0].getElementsByClassName('middle')[0].getElementsByClassName('content')[0].appendChild(zNode);
    document.getElementById("btnTozsdeControl").addEventListener("click", ButtonClickAction, false);
    //MainMethod elindítása:
    CheckIfTozsdeIsOpen();
}

//Ha rákattintanak a tőzsde controlra.
function ButtonClickAction (zEvent)
{
    GM_config.open('MyConfig');
}
//========================================================================================================\\
//=======================================[Segéd metódusok]================================================\\
//Sleep metódus:
function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
//isTrue
function isTrue(value){
    if (typeof(value) === 'string'){
        value = value.trim().toLowerCase();
    }
    switch(value){
        case true:
        case "true":
        case 1:
        case "1":
        case "on":
        case "yes":
            return true;
        default: 
            return false;
    }
}
//========================================================================================================\\
//=======================================[Bot metódusok]==================================================\\
//Megnézi, hogy meg van-e nyitva a tőzsde:
async function CheckIfTozsdeIsOpen()
{
    var tozsde = document.getElementsByClassName('js-window-main-container classic_window market');
    if (tozsde.length === 0) //Ha nincs megnyitva a tőzsde, akkor vár
    {
        await setTimeout(CheckIfTozsdeIsOpen, parseInt(GM_config.get('TozsdeBot_TickInterval')));
    }
    else //Ha meg van nyitva a tőzsde:
    {
        try
        {
            //Átkattintja az eladásra:
            await document.getElementsByClassName('gp_page_caption js-page-caption js-page-caption-1')[0].click();
        }
        catch (err){console.log(err)}
        try
        {
            if (isTrue(GM_config.get('TozsdeBot_Enabled'))) await CheckResources();
        }
        catch (err){console.log(err)}
        await setTimeout(CheckIfTozsdeIsOpen, parseInt(GM_config.get('TozsdeBot_TickInterval')));
    }
}

//Megnézi, hogy van-e üres hely a tőzsdén:
async function CheckResources()
{
    document.getElementsByClassName('btn_next_town button_arrow right')[0].click(); //Következő város window_content js-window-content
    await sleep(500);
    //Lekéri a nyersanyagmennyiségeket:
    var resources = document.getElementsByClassName('js-window-main-container classic_window market')[0].getElementsByClassName('window_content js-window-content')[0].getElementsByClassName('game_border')[0].getElementsByClassName('gp_tab tab_premium_exchange')[0].getElementsByClassName('gp_tab_page js-page js-page-1 game_body active')[0].getElementsByClassName('resources_wrapper')[0].getElementsByClassName('resource');
    await sleep(250);
    var fa = resources[0].innerText.split('/');
    var ko = resources[1].innerText.split('/');
    var ezust = resources[2].innerText.split('/');

    //Megnézi, hogy lehet-e eladni:
    if (fa[0] < fa[1]-parseInt(GM_config.get('TozsdeBot_MinimalResource'))) //Ha lehet eladni fát
    {
        await SellResources(0);
    }
    if (ko[0] < ko[1]-parseInt(GM_config.get('TozsdeBot_MinimalResource'))) //Ha lehet eladni követ
    {
        await SellResources(1);
    }
    if (ezust[0] < ezust[1]-parseInt(GM_config.get('TozsdeBot_MinimalResource'))) //Ha lehet eladni ezüstöt
    {
        await SellResources(2);
    }
}
async function SellResources(resource)
{
    var capacity = await document.getElementsByClassName('gp_tab_page js-page js-page-1 game_body')[0].getElementsByClassName('pg_capacity single-progressbar')[0].getElementsByClassName('caption')[0].getElementsByClassName('value_container')[0].getElementsByClassName('curr')[0].innerText;
    if (capacity > parseInt(GM_config.get('TozsdeBot_MinimalResource')))
    {
        var res = await document.getElementsByClassName('ui_resources_bar')[0].children[resource].innerText; //Lekéri az elérhető nyersanyagot az adott fajtából
        if (res > parseInt(GM_config.get('TozsdeBot_MinimalResource'))) //Ha az elérhető nyersanyagfajtából van elég
        {
            for (let i = 0; i < 25; i++) //Hozzáadja a nyersanyagot
            {
                await document.getElementsByClassName('gp_tab_page js-page js-page-1 game_body active')[0].getElementsByClassName('resources_wrapper')[0].getElementsByClassName('resource')[resource].getElementsByClassName('spinner sp_resource')[0].getElementsByClassName('button_up')[0].click();
                await sleep(50);
            }
            //Rákattint az ajánlatok keresésére
            await document.getElementsByClassName('gp_tab_page js-page js-page-1 game_body active')[0].getElementsByClassName('button_container')[0].getElementsByClassName('button_new btn_find_rates')[0].click();
            await sleep(250);
            //Rákattint az elfogadás gombra
            await document.getElementsByClassName('confirm_order')[0].getElementsByClassName('button_container')[0].getElementsByClassName('button_new btn_confirm')[0].click();
            await sleep(500);
            var captcha = await document.getElementById('recaptcha_window');
            if(typeof(captcha) != 'undefined' && captcha != null && isTrue(GM_config.get('TozsdeBot_CaptchaDetection'))) player.play();
            while(typeof(captcha) != 'undefined' && captcha != null)
            {
                captcha = await document.getElementById('recaptcha_window');
                await sleep(100);
            }
    }
    }
}
//========================================================================================================\\
