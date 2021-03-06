(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession, appList) {
            this.base(place, pageConfig, paySession, appList);

            this._txnId = '';
            if (!this.paySession.payInfo.hasOwnProperty('time')) {
                var _z = function (s) {
                    return (s.toString().length == 1) ? '0' + s : s.toString();
                }
                var date = new Date();
                this.paySession.payInfo.time = [_z(date.getDate()), '.', _z(date.getMonth() + 1), '.', date.getFullYear(), ' ', _z(date.getHours()), ':', _z(date.getMinutes()), ':', _z(date.getSeconds())].join('');
            }
        },

        paint: function () {
            maratl.one('GetCurrentPaymentData', (function (s, e) {
                this._txnId = e.value;
                statistics.sendData({
                    trm_txn_id: e.value
                });
            }).bind(this));
            maratl.set('GetCurrentPaymentData');
            this.base();
            $('payInfo').html([
                this.paySession.payInfo.sum.enrolled, ' руб. на счет ', this.paySession.payInfo.faccount, ' ', this.paySession.payInfo.config.name,
                ((this.paySession.sessionInfo.hasOwnProperty('fiscal') && !this.paySession.sessionInfo.fiscal) ? 
                [
                    '<br />',
                    '<br />',
                    '<div id="container">',
                        '<div id="alert" class="f_l"></div>',
                        '<div id="text" class="f_l">',
                            '<p>По техническим причинам печать кассового чека терминалом в настоящий момент невозможна.</p>',
                            '<p>Кассовый чек распечатан контрольно-кассовой машиной в составе Терминала.</p>',
                            '<p>Для его получения обратитесь к владельцу Терминала.</p>',
                            '<p>Контакты указаны на квитанции или в разделе <span class="help">Помощь</span>.</p>',
                        '</div>',
                    '</div>'
                ].join('') : '')
            ].join(''));
            this.pageControls.bottomMenu.paint([
                { name: 'home' }
            ]);
            this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));
            $.find('.help').forEach(delegate(this, function (e) {
                e.on('click', delegate(this, function () { this._navigateClick(null, 'help'); }));
            }));

            if (!this.paySession.payInfo.config.isCellular()) {
                $('payCheck').css({ display: 'none' });
                $('payStatus').css({ left: '357px' });
            }

            $('payStatus').click((function () {
                statistics.clickAction({ button: 'status' });
                this.next('fake_status');
            }).bind(this));

            $('payCheck').click(this._sendCheck.bind(this));

            if (this.paySession.sessionInfo.hasOwnProperty('fiscal') && !this.paySession.sessionInfo.fiscal) {
                $('payCheck').hide();
                $('payStatus').hide();
            }

            this.appRender();
        },

        _sendCheck: function () {
            var check = [
                'Терминал: ', this.paySession.sessionInfo.terminal,
                '\n',
                'Дата: ', this.paySession.payInfo.time,
                '\n',
                'Код операции: ', this._txnId,
                '\n\n',
                'Поставщик: ', this.paySession.payInfo.config.name,
                '\n',
                'Номер телефона/счета: ', this.paySession.payInfo.account,
                '\n',
                'Принято: ', this.paySession.payInfo.sum.made.toString(), ' руб.',
                '\n',
                'Зачислено: ', this.paySession.payInfo.sum.enrolled.toString(), ' руб.',
                '\n',
                'Комиссия: ', this.paySession.payInfo.sum.commiss.toString(), ' руб.'
            ];
            storage.put('ident_adv_counter', JSON.stringify({
                account: this.paySession.payInfo.account,
                eCheck: check.join(''),
                transactionCode: this._txnId
            }));
            this.exitToCustomPage('./core/index.html?ereceipt:sendmail');
        },

        _navigateClick: function (s, e) {
            switch (e) {
                case 'help':
                    this.next('help');
                    break;
                case 'home':
                    this.exit();
                    break;
            }
        }
    });
});