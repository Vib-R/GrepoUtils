//====================================[USER SETTINGS]====================================\\
//A városváltás között eltelt idő (milisecond):
var TickInterval = 1000 * 5;

//A minimális nyersanyag, ami a szerveren 1 aranyat ér:
var MinimalValue = 100;

//Be legyen-e kapcsolva a captcha érzékelése? :
var CaptchaDetection = true;

//A zenefájl, amit lejátszik, ha captchát érzékel:
var Music = 'https://notificationsounds.com/storage/sounds/file-sounds-1134-open-up.mp3';
//=======================================================================================\\

//============================================[CONTROL]=================================================\\
//Változók:
var player;
var isRunning;

//Főszál:
(function() {
    'use strict';
    isRunning = false;
    setTimeout(AfterGameLoad, TickInterval);
})();

//Azután hajtódnak végre, miután betöltött a játék:
async function AfterGameLoad()
{
    //Hang hozzáadása:
    player = document.createElement('audio');
    player.src = Music;
    player.preload = 'auto';
    //Vezérlőgomb hozzáadása:
    var zNode = document.createElement ('div');
    zNode.innerHTML = '<button id="btnTozsdeControl" type="button">'
                    + 'Indítás</button>';
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
    if (isRunning) //Ha fut a program
    {
        document.getElementById('btnTozsdeControl').innerText = "Indítás";
        isRunning = false;
    }
    else
    {
        document.getElementById('btnTozsdeControl').innerText = "Leállítás";
        isRunning = true;
    }
}
//========================================================================================================\\
//=======================================[Segéd metódusok]================================================\\
//Sleep metódus:
function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
//========================================================================================================\\
//=======================================[Bot metódusok]==================================================\\
//Megnézi, hogy meg van-e nyitva a tőzsde:
async function CheckIfTozsdeIsOpen()
{
    var tozsde = document.getElementsByClassName('js-window-main-container classic_window market');
    if (tozsde.length === 0) //Ha nincs megnyitva a tőzsde, akkor vár
    {
        await setTimeout(CheckIfTozsdeIsOpen, TickInterval);
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
            if (isRunning) await CheckResources();
        }
        catch (err){console.log(err)}
        await setTimeout(CheckIfTozsdeIsOpen, TickInterval);
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
    if (fa[0] < fa[1]-MinimalValue) //Ha lehet eladni fát
    {
        await SellResources(0);
    }
    if (ko[0] < ko[1]-MinimalValue) //Ha lehet eladni követ
    {
        await SellResources(1);
    }
    if (ezust[0] < ezust[1]-MinimalValue) //Ha lehet eladni ezüstöt
    {
        await SellResources(2);
    }
}
async function SellResources(resource)
{
    var capacity = await document.getElementsByClassName('gp_tab_page js-page js-page-1 game_body')[0].getElementsByClassName('pg_capacity single-progressbar')[0].getElementsByClassName('caption')[0].getElementsByClassName('value_container')[0].getElementsByClassName('curr')[0].innerText;
    if (capacity > MinimalValue)
    {
        var res = await document.getElementsByClassName('ui_resources_bar')[0].children[resource].innerText; //Lekéri az elérhető nyersanyagot az adott fajtából
        if (res > MinimalValue) //Ha az elérhető nyersanyagfajtából van elég
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
            if(typeof(captcha) != 'undefined' && captcha != null && CaptchaDetection) player.play();
            while(typeof(captcha) != 'undefined' && captcha != null)
            {
                captcha = await document.getElementById('recaptcha_window');
                await sleep(100);
            }
    }
    }
}
//========================================================================================================\\
