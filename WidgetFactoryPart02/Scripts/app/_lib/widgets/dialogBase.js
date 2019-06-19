// ----------------------------------------------------------
// Скрипт: Виджет базового окна диалога
// ----------------------------------------------------------

(function ($) {

    $.widget('custom.dialogBase', {

        options: {
            loadUrl: null,
            submitUrl: null,
            onSubmitSuccess: function (data) { }
        },

        // Конструктор
        _create: function () {

            this._createFooter();
            this._createControls();
            this._createDialog();

        },

        _createFooter: function () {

            var that = this;

            var footer = $('.footer', that.element);
            var footerBtns = {};

            footerBtns.btnOk = $('.btnOk', footer);
            footerBtns.btnOk.linkbutton({
                text: 'OK',
                width: 90,
                onClick: function () {
                    that._btnOkClick();
                }
            });

            footerBtns.btnCancel = $('.btnCancel', footer);
            footerBtns.btnCancel.linkbutton({
                text: 'Отмена',
                width: 90,
                onClick: function () {
                    that.element.form('clear');
                    that.element.dialog('close');
                }
            });

            that.footerBtns = footerBtns;
            that.footer = footer;

        },

        _createControls: function () {

            this.ctrls = {};
        },

        _createDialog: function () {

            this.element.dialog({
                buttons: this.footer,
                modal: true,
                closed: true,
                onOpen: function () {
                    $(this).window('window');
                }
            });

        },

        _onLoadSuccess: function (data) { },

        submit: function () {

            var that = this;

            if (that.options.submitUrl == null) return;

            that.element.attr('method', 'post');

            that.element.form('submit', {
                url: that.options.submitUrl,
                onSubmit: function () {

                    if (!$(this).form('validate')) {

                        $.messager.alert({
                            title: 'Ошибка',
                            icon: 'error',
                            msg: 'Ошибка валидации'
                        });

                        return false;
                    }

                },
                success: function (data) {

                    var result = JSON.parse(data);

                    if (!result.success) {
                        $.messager.alert({
                            title: 'Ошибка',
                            icon: 'error',
                            msg: result.erMessage
                        });
                        return;
                    }

                    that.element.form('clear');
                    that.element.dialog('close');

                    if (that.options.onSubmitSuccess) {
                        that.options.onSubmitSuccess(result);
                    }
                }
            });

        },

        _btnOkClick: function () {

            this.submit();
        },

        load: function (params) {

            var that = this;

            if (this.options.loadUrl == null) return;

            $.ajax({
                url: this.options.loadUrl,
                type: 'get'
            }).done(function (data) {

                var result = JSON.parse(data);

                that.element.form('load', result.model);

                that._onLoadSuccess(result);

                if (params != undefined && params.onSuccess) {
                    params.onSuccess();
                }
            }).error(function (jqXHR, textStatus, errorThrown) {

                $.messager.alert({
                    title: 'Ошибка',
                    icon: 'error',
                    msg: 'Ошибка загрузки данных формы'
                });

                if (params != undefined && params.onError) {
                    params.onError(jqXHR, textStatus, errorThrown);
                }

            });
        },

        // Url для загрузки данных
        loadUrl: function (val) {
            if (val === undefined) return this.options.loadUrl;
            this.options.loadUrl = val;
        },

        // Url для отправки данных
        submitUrl: function (val) {
            if (val === undefined) return this.options.submitUrl;
            this.options.submitUrl = val;
        },

        onSubmitSuccess: function (val) {
            if (val === undefined) return this.options.onSubmitSuccess;
            this.options.onSubmitSuccess = val;
        }

    });

})(jQuery);