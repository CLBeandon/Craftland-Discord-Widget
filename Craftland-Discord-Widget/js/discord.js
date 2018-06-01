var serverID = getParameterByName('serverID');
var title = getParameterByName('title') ? getParameterByName('title') : false;
var invite = getParameterByName('invite') ? getParameterByName('invite') : false;
var theme = getParameterByName('theme') ? getParameterByName('theme') : 'dark';

$.getJSON('https://discordapp.com/api/servers/' + serverID + '/widget.json', function(data) {
	$("head").append('<link rel="stylesheet" href="css/' + theme + '.css" />');




	$('.discord-channel').html('There are currently ' + data.members.length + ' users online!');
    
    
    var admins = ["247440554617602056", "168901714542460928", "176501341194158081", "186998154707599360", "160449870916747274", "339355329462796289"];
    var mods = ["170538991693725696", "181322956419497984", "242501757333143555", "136674161937481728"];
    var helpers = ["238049391804547072", "310071204709007373", "239390783285886976", "160507548670230528", "281873143012917248"];
    
    var listCheck = [admins, mods, helpers];
    
    
for (o = 0; o < 4; o++) {
	for (i = 0; i < data.members.length; i++) {
        if (o != 3 && listCheck[o].includes(data.members[i].id) || o==3 && !helpers.includes(data.members[i].id) && !mods.includes(data.members[i].id) && !admins.includes(data.members[i].id)) {
        
		var item = document.createElement('li');
		item.setAttribute('class', 'discord-user');
		var img = document.createElement('img');
		img.setAttribute('src', data.members[i].avatar_url);
		img.setAttribute('class', 'discord-avatar');
		var div = document.createElement('div');
		if(data.members[i].status == 'online') {
			div.setAttribute('class', 'discord-user-status discord-online');
		} else if(data.members[i].status == 'idle') {
			div.setAttribute('class', 'discord-user-status discord-idle');
		} else {
            div.setAttribute('class', 'discord-user-status discord-busy');
        }
        
        var rank = document.createTextNode("");
        var userid = data.members[i].id;
        
        var rankdiv = document.createElement('div');
        rankdiv.setAttribute('style', 'display: inline-block;');
        
        // Hardset Helpers
        if (userid == "238049391804547072" || userid == "310071204709007373" || userid == "239390783285886976" || userid == "160507548670230528" || userid == "281873143012917248") {
            rankdiv.setAttribute('class', 'rank-helper');
            rankdiv.innerHTML = "Helper"
        }
        // Hardset Mods
        if (userid == "170538991693725696" || userid == "181322956419497984" || userid == "242501757333143555" || userid == "136674161937481728") {
            rankdiv.setAttribute('class', 'rank-mod');
            rankdiv.innerHTML = "Mod";
        }
        // Hardset Admins
        if (userid == "247440554617602056" || userid == "168901714542460928" || userid == "176501341194158081" || userid == "186998154707599360" || userid == "160449870916747274" || userid == "339355329462796289") {
            rankdiv.setAttribute('class', 'rank-admin');
            rankdiv.innerHTML = "Admin";
        }
        
        
        var text = document.createTextNode(data.members[i].nick);
        if (data.members[i].nick == undefined) {
            text = document.createTextNode(data.members[i].username);
        }
		item.appendChild(img);
		item.appendChild(div);
        item.appendChild(rankdiv);
        item.appendChild(rank);
		item.appendChild(text);

		$('.discord-userlist').append(item);
        
        var titlebar = ``;
        $('.discord-title').html(titlebar);
        }
	}
}
});



function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}