var HipChat = require('./index');

var hipchat = new HipChat({
    'auth_token': '8a9cf80b45445999c5fef17c8c8615',
    'room_id'   : 'TEST',
    'from'      : 'hipchat-message',
    title       : '<strong>Javascript Unit Tests</strong>',
    format      : 'html',
});

hipchat.info("this should be a different test message",true);