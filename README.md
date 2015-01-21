# hipchat-message
Send a simple Hipchat Message

This extension does not do any more than just that - send an html message to a Hipchat room.

## Install

    npm install hipchat-message

## Use
    var HipChat = require('hipchat-message');

    var hipchat = new HipChat({
        'auth_token': '8a9cf80b45445999c5fef17c8c8615',
        'room_id'   : 'TEST',
        'from'      : 'hipchat-message',
        title       : '<strong>Some Title</strong>',
        format      : 'html',
    });

    hipchat.info("Popup gray message",true);
    hipchat.success("Background green message",false);
    hipchat.warn("Popup yellow message",true);
    hipchat.error("Background red message");


## Methods
### .info( message:String, notify:boolean )
Display gray information message

### .warn( message:String, notify:boolean )
Display yellow warning message

### .success( message:String, notify:boolean )
Display green warning message

### .error( message:String, notify:boolean )
Display red error message

### .message( message:String, config:Object, notify:boolean )
Display red error message

### .notify( config:Object )
Display red error message


## Config Options
### auth_token [required]
Hipchat Authentication Token

### room_id [required]
The name or id of the room where you want to display your message

### from [required]
Max 15 character from-field text

### title
Optional Title to be displayed before the rest of the message

### format [required]
Should be `html`

### color { yellow, green, purple, red, gray }
The message color

### notify { 0, 1 }
**0** will indicate a background message  
**1** will indicate a notification is required



