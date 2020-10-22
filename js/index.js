
var listMsg = [];

function checkEnter(event) {
    if (event.keyCode === 13)
        sendMessage();
}

function sendMessage() {
    var $fieldMessage = $('[name="fieldMessage"]');
    var message = $fieldMessage.val();

    if (message !== '') {
        var date = new Date();
        var time = date.toLocaleTimeString();

        addMyMsg(message, time);

        saveMsg(message, time);
        botParrot(message);
    }

    $fieldMessage.val('');
    
}

function addMyMsg(message, time) {
    var $messages = $('.messages');
        $messages.append(`
        <div class="message-wraper right">
            <div class="message-my">
                <span> ${message} </span>
                <span class="message-time">  ${time} </span>
                <i class="fa fa-check message-view" aria-hidden="true"></i>
            </div>
        </div>
        `);
}

function toggleAttachments() {
    var $attachments = $('.attachments');
    $attachments.toggleClass('show');
}

function retryMessage(message) {
    var date = new Date();
    var time = date.toLocaleTimeString();

    addBotMsg(message, time);

    saveMsg(message, time);
}

function addBotMsg(message, time) {
    var $messages = $('.messages');
    $messages.append(`
        <div class="message-wraper  left">
            <div class="message-contact">
                <span> ${message} </span>
                <span class="message-time"> ${time} </span>
                <i class="fa fa-check message-view" aria-hidden="true"></i>
            </div>
        </div>
    `);
}

function botParrot(question) {
    var reply = 'voce disse: ' + question;
    retryMessage(reply);
}   

function saveMsg(message, time) {   
    var objMsg = {
        message: message,
        time: time
    };

    listMsg.push(objMsg);
    
    var json = JSON.stringify(listMsg);
    localStorage.setItem('messages', json);
}

function loadMsg() {
    var json = localStorage.getItem('messages');
    listMsg = JSON.parse(json);

    if (listMsg === null) {
        listMsg = [];
    }
}

function showMsg() {
    for (var m = 0, b = 1; m < listMsg.length; m = m + 2, b = b + 2) {
        addMyMsg(listMsg[m].message, listMsg[m].time); //0,2,4
        addBotMsg(listMsg[b].message, listMsg[b].time); //1,3,5
    }
}

loadMsg();
showMsg();