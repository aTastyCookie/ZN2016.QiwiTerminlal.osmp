(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession) {
            this.base(place, pageConfig, paySession);
            this.count = null;
            this.oferType = 0;
        },

        paint: function () {
            this.base();

            this.oferType = this.interfaceConfig.get('params:info:offer-type', '0');
            var fName = './pages/resourses/' + this.oferType + '.html';
            UI.loadFile.html(fName, delegate(this, function (err, text) {
                if (err) return this.error({ type: 'cantLoadFile', additional: { fileName: fName }});

                this.count = $('counter');

                this.pageControls.textScroll = new crequire.controls.textScroll.script('textScroll', this._preparation(text));
                this.pageControls.textScroll.on('change', delegate(this, this._paintCounter));
                this.pageControls.textScroll.paint();
            }));

            this.pageControls.bottomMenu.paint([
                { name: 'back' },
                { name: 'home' }
            ]);
            this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));
        },

        _preparation: function (text) {
            var t = text;

            t = t.replace('#aof-name', this.interfaceConfig.get('params:info:aof-name', '')).
                replace('#aof-addr', this.interfaceConfig.get('params:info:aof-addr', '')).
                replace('#aof-contact-phone', this.interfaceConfig.get('params:info:aof-contact-phone', '')).
                replace('#aof-gendir-fio', this.interfaceConfig.get('params:info:aof-gendir-fio', ''));

            if (this.oferType.toString() === '0') {
                t = t.replace('#aof-bank-acc', this.interfaceConfig.get('params:info:aof-bank-acc', ''));
            }
            else {
                var str = this.interfaceConfig.get('params:info:agent-lic', '');
                if (str.length) str += ', ';
                str += this.interfaceConfig.get('params:info:aof-bank-acc', '');
                t = t.replace('#aof-bank-acc', str);
            }
            
            return t.replace(/\n/g, '<br />');
        },

        _paintCounter: function (s, e) {
            this.count.html(e.current + '-я из ' + e.max + ' страниц');
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