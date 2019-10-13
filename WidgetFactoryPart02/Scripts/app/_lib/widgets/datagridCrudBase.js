// ----------------------------------------------------------
// Скрипт: Виджет базовой редактируемый DataGrid
// ----------------------------------------------------------

(function ($) {

    $.widget('custom.datagridCrudBase', {

        // Конструктор
        _create: function () {

            this._createToolbar();
            this._createGrid();
            this._createDialog();

        },

        // Метод: Формирование Url для создания записи
        _getCreateUrl: function () { return null; },

        // Метод: Формирование Url для изменения записи
        _getEditUrl: function (row) { return null; },

        // Метод: Формирование Url для удаления записи
        _getDeleteUrl: function (row) { return null; },

        // Метод: Получение имени виджета формы
        _dialogWidgetName: function () { },

        // Метод: Инициализация панели инструментов
        _createToolbar: function () {

            var that = this;

            // Кнопка Обновить
            this.btnRefresh = $('#btnRefresh', this.element);
            this.btnRefresh.linkbutton({
                text: 'Обновить',
                plain: true,
                onClick: function () {
                    that._btnRefreshClick();
                }
            });

            // Кнопка Добавить
            this.btnCreate = $('#btnCreate', this.element);
            this.btnCreate.linkbutton({
                text: 'Создать',
                plain: true,
                onClick: function () {
                    that._btnCreateClick();
                }
            });

            // Кнопка Изменить
            this.btnEdit = $('#btnEdit', this.element);
            this.btnEdit.linkbutton({
                text: 'Изменить',
                plain: true,
                onClick: function () {
                    that._btnEditClick();
                }
            });

            // Кнопка Удалить
            this.btnDelete = $('#btnDelete', this.element);
            this.btnDelete.linkbutton({
                text: 'Удалить',
                plain: true,
                onClick: function () {
                    that._btnDeleteClick();
                }
            });
        },

        // Метод: Инициализация грида
        _createGrid: function () {

            var that = this;

            this._grid = $('#grid', this.element);
            this._grid.datagrid({
                toolbar: $('#tbar', this.element),
                idField: 'id',
                rownumbers: true,
                singleSelect: true,
                striped: true,
                pagination: true,
                onLoadSuccess: function (data) {

                    if (that._lastSelected) {
                        that._grid.datagrid("selectRecord", that._lastSelected);
                    }
                },
                onSelect: function (index, row) {
                    that._lastSelected = row.id;
                }
            });
        },

        // Метод: Создание диалога ведения
        _createDialog: function () {

            var dialog = $('#dialog', this.element);
            var widgetname = this._dialogWidgetName();

            dialog[widgetname]();

            this.dialog = dialog;
        },

        // Событие: клик по кнопке "Обновить"
        _btnRefreshClick: function () {

            this._grid.datagrid('reload');
        },

        // Событие: клик по кнопке  "Добавить"
        _btnCreateClick: function () {
            this._doCreate();
        },

        // Событие: клик по кнопке  "Изменить"
        _btnEditClick: function () {

            var row = this._grid.datagrid('getSelected');

            if (row == null) {
                $.messager.alert({
                    title: 'Ошибка',
                    icon: 'error',
                    msg: 'Выберите запись для редактирования!'
                });
                return;
            }

            this._doEdit(row);
        },

        // Событие: клик по кнопке "Удалить"
        _btnDeleteClick: function () {

            var that = this;

            var row = that._grid.datagrid('getSelected');

            if (!row) {
                $.messager.alert({
                    title: 'Ошибка',
                    icon: 'error',
                    msg: 'Выберите запись'
                });
                return;
            }

            $.messager.confirm({
                title: 'Подтверждение',
                msg: 'Вы действиетльно хотите удалить запись?',
                fn: function (r) {
                    if (r) {
                        that._doDelete(row);
                    }
                }
            });
        },

        // Метод: Создание записи
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

        // Метод:  Изменение записи
        _doEdit: function (row) {

            var that = this;

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

        // Метод: Удаление записи
        _doDelete: function (row) {

            var that = this;

            var url = that._getDeleteUrl(row);

            that._grid.datagrid('loading');

            $.ajax({
                url: url,
                type: 'post'
            }).done(function (data) {

                var result = JSON.parse(data);

                if (!result.success) {
                    $.messager.alert({
                        title: 'Ошибка',
                        icon: 'error',
                        msg: result.erMessage
                    });
                    that._grid.datagrid('loaded');
                    return;
                }

                that._grid.datagrid('reload');

            }).error(function (jqXHR, textStatus, errorThrown) {
                $.messager.alert({
                    title: 'Ошибка',
                    icon: 'error',
                    msg: 'Ошибка при удалении записи'
                });
                that._grid.datagrid('loaded');
            });
        },

    });

})(jQuery);
