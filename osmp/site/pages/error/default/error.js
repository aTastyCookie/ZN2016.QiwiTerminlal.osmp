(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession) {
            this.base(place, pageConfig, paySession);
            setTimeout(function () {
                window.location = 'index.html';
            }, 7000);
        },

        paint: function () {
            this.base();
            var errorInfo = this.paySession.sessionInfo.errorInfo || {};
            $('errorText').text(errorInfo.userText || 'Извините, сервис временно недоступен.');
            this.pageControls.bottomMenu.paint([
                { name: 'home' }
            ]);
            this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));
        },

        _navigateClick: function (s, e) {
            switch (e) {
                case 'home':
                    window.location = 'index.html';
                    break;
            }
        }
    });
});