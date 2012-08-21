/**
 * Nim Bot - simple node-xmpp bot to handle nimbits IM data
 **/
var sys = require('util');
var xmpp = require('/home/root/node_modules/node-xmpp');

// --- set up credentials
var jid = 'kegminder1.0@gmail.com';  // your bot's google id here
var password = 'kegminder'; // your bot's gmail  password here

// --- Create an XMPP client instance
var cl = new xmpp.Client({ jid: jid, password: password });

// --- Create a handler for the xmpp client "online" event
//     Basically, this handler, as written, will make
//     us show up on google chat as "available"
cl.on('online',
    function() {
		cl.send(new xmpp.Element('presence', { }).
			c('show').t('chat').up().
			c('status').t('nimbits node-xmpp i/o bot')
		);
	}
);

// --- create a handler for the xmpp client "stanza" event
//     this handler basically handles all incoming messages
cl.on('stanza',
	function(stanza) {
		if (stanza.is('message') &&
			// Important: never reply to errors!
			stanza.attrs.type !== 'error') {
				// --- extract sender info
				//     and <body> ... </body> from message
				var sender;
				var body;
				sender = stanza.attrs.from;
				body = '' + stanza.children[0]; // this coerces stanza.children[0] to string

				// --- echo info about sender
				sys.puts("from:" + sender);

				// --- See if this is from nimbits.com
				//     If it isn't, we just ignore it
				//     the address is nimbits1 AT appspot.com/bot
				if(sender == 'nimbits1@.../bot'){

					// --- Echo the json "blob"
					sys.puts(stanza.children[0].children[0]) ;

					// --- eval the json
					var nimbitsInfo;
					var nimbitsData;
					nimbitsInfo =  eval('(' + stanza.children[0].children[0] + ')');
					nimbitsData = eval('(' + nimbitsInfo.value  + ')');
					sys.puts(nimbitsInfo.name + '=' + nimbitsData.d);
				}
			}

      }
	);

// --- make error handler
cl.on('error',
      function(e) {
          sys.puts(e);
      });
