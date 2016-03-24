
(function () {
    document.domain = 'changemyworldnow.com';

    var QuitGame = window.QuitGame;
    window.QuitGame = function () {
        var event = new Event('game-event', {bubbles: true, cancelable: false});
        //_.defaults(event, {type: 'game-event', name: 'exit'});
        event.type = 'game-event';
        event.name = 'exit';
        window.parent.dispatchEvent(event);
        QuitGame.apply(this, arguments);
    };

})();

