(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession) {
            this.base(place, pageConfig, paySession);
        },

        paint: function () {
            this.base();

            $('version-show-span').text(this.interfaceConfig.get('version'));

            this.pageControls.bottomMenu.paint([
                { name: 'back' },
                { name: 'home' }
            ]);
            this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));
        },

        _buttonClick: function (s, e) {
            for (var i = 0; i < this.buttons.length; i++) {
                this.pageControls['button_' + i].clear();
            }
            if (e.indexOf('.html') === -1) {
                this.next(e);
            }
            else {
                this.exitToCustomPage(e);
            }
        },

        _navigateClick: function (s, e) {
            switch (e) {
                case 'back':
                    this.back();
                    break;
                case 'home':
                    this.exit();
                    break;
            }
        }
    });
});