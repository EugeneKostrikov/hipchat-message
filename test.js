var HipChat = require('./index');

var hipchat = new HipChat({
    'auth_token': '<your auth token>',
    'room_id'   : 'TEST',
    'from'      : 'hipchat-message',
    title       : '<strong>Javascript Unit Tests</strong>',
    format      : 'html',
});

hipchat.info("this should be a different test message",true);