// ----------------------------------------------------------
// Скрипт: Виджет базовой DataGrid
// ----------------------------------------------------------

(function ($) {

    $.widget('custom.datagridCrudDialogBase', $.custom.datagridCrudBase, {

        _create: function () {

            this._super();
            this._createDialog();

        },

        // Метод для получения имени виджета диалога ведения
        _dialogWidgetName: function () { },
        

        // Создание диалога ведения
        _createDialog: function () {

            var dialog = $('.dialog', this.element);
            var widgetname = this._dialogWidgetName();

            dialog[widgetname]();

            this.dialog = dialog;
        },


        _doCreate: function () {

            var that = this;

            var url = that._getCreateUrl();

            if (url == null) return;

            var widgetname = that._dialogWidgetName();

            that._grid.datagrid('loading');

            that.dialog.dialog('setTitle', 'Создать');
            that.dialog[widgetname]('loadUrl', url);
            that.dialog[widgetname]('submitUrl', url);
            that.dialog[widgetname]('onSubmitSuccess', function (data) {
                that._lastSelected = data.id;
                that._grid.datagrid('reload');
            });
            that.dialog[widgetname]('load', {
                onSuccess: function (data) {
                    that.dialog.dialog('open');
                    that._grid.datagrid('loaded');
                },
                onError: function () {
                    that._grid.datagrid('loaded');
                }
            });
        },

        _doEdit: function (row) {

            var that = this;

            var row = that._grid.datagrid('getSelected');

            var url = that._getEditUrl(row);

            if (url == null) return;

            var widgetname = that._dialogWidgetName();

            that._grid.datagrid('loading');

            that.dialog.dialog('setTitle', 'Изменить');
            that.dialog[widgetname]('loadUrl', url);
            that.dialog[widgetname]('submitUrl', url);
            that.dialog[widgetname]('onSubmitSuccess', function (data) {
                that._grid.datagrid('reload');
            });
            that.dialog[widgetname]('load', {
                onSuccess: function (data) {
                    that.dialog.dialog('open');
                    that._grid.datagrid('loaded');
                },
                onError: function () {
                    that._grid.datagrid('loaded');
                }
            });
        },

    });

})(jQuery);