// ----------------------------------------------------------
// Скрипт: Виджет базового окна диалога
// ----------------------------------------------------------

function ($) {

    $.widget('custom.dialogBase', {

        options: {
            // url для загрузки данных в форму GET запросом
            loadUrl: null,
            // url для отправки данных формы POST запросом
            submitUrl: null,
            // Событие успешной отправки формы
            onSubmitSuccess: function (data) { }
        },

        // Свойство: url для загрузки данных
        loadUrl: function (val) {
            if (val === undefined) return this.options.loadUrl;
            this.options.loadUrl = val;
        },

        // Свойство: url для отправки данных
        submitUrl: function (val) {
            if (val === undefined) return this.options.submitUrl;
            this.options.submitUrl = val;
        },

        // Свойство: Событие успешной отправки формы
        onSubmitSuccess: function (val) {
            if (val === undefined) return this.options.onSubmitSuccess;
            this.options.onSubmitSuccess = val;
        },

        // Конструктор
        _create: function () {

            this._createFooter();
            this._createControls();
            this._createDialog();

        },

        // Создание панели с кнопками диалога
        _createFooter: function () {

            var that = this;

            var footer = $('#footer', that.element);
            var footerBtns = {};

            footerBtns.btnOk = $('#btnOk', footer);
            footerBtns.btnOk.linkbutton({
                text: 'OK',
                width: 90,
                onClick: function () {
                    that.submit();
                }
            });

            footerBtns.btnCancel = $('#btnCancel', footer);
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

        // Метод: Создание элементов управления
        _createControls: function () {

            this.ctrls = {};
        },

        // Метод: Создание диалога
        _createDialog: function () {

            this.element.dialog({
                buttons: this.footer,
                modal: true,
                closed: true,
            });

        },

        // Метод: Загрузка данных формы
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

        // Метод: Отправка данных формы
        submit: function () {

            var that = this;

            var url = that.options.submitUrl;

            if (url == null) return;

            that.element.attr('method', 'post');

            that.element.form('submit', {
                url: url,
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

                        if (result.updateConcurrency) {

                            $.messager.alert({
                                title: 'Предупреждение',
                                icon: 'warning',
                                msg: result.erMessage
                            });

                            that.element.form('load', result.model);

                            that._onLoadSuccess(result);

                            return;

                        }
                        else {
                            $.messager.alert({
                                title: 'Ошибка',
                                icon: 'error',
                                msg: result.erMessage
                            });

                            return;
                        }
                    }

                    that.element.form('clear');
                    that.element.dialog('close');

                    if (that.options.onSubmitSuccess) {
                        that.options.onSubmitSuccess(result);
                    }
                }
            });

        },

        // Событие: Успешной загрузки данных формы
        _onLoadSuccess: function (data) { },

    });

})(jQuery);
