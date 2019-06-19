// ----------------------------------------------------------
// Скрипт: Виджет базовой редактируемый DataGrid
// ----------------------------------------------------------

(function ($) {

    $.widget('custom.datagridCrudBase', {

        // Конструктор
        _create: function () {

            this._createToolbar();
            this._createGrid();

        },

        // Инициализация грида
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

        // Инициализация панели инструментов 
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
                text: 'Добавить',
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

        // Обновить
        _btnRefreshClick: function () {

            this._grid.datagrid('reload');
        },

        // Кнопка "Добавить"
        _btnCreateClick: function () {

            this._doCreate();
        },

        // Кнопка "Изменить"
        _btnEditClick: function () {

            var selected = this._grid.datagrid('getSelections');

            if (selected.length == 0) {
                $.messager.alert({
                    title: 'Ошибка',
                    icon: 'error',
                    msg: 'Выберите запись для редактирования!'
                });
                return;
            }

            if (selected.length > 1) {
                $.messager.alert({
                    title: 'Ошибка',
                    icon: 'error',
                    msg: 'Выберите только одну запись для редактирования!'
                });
                return;
            }

            this._doEdit(selected[0]);
        },

        // Кнопка "Удалить"
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

        // Создание записи
        _doCreate: function () {
        },

        // Изменение записи
        _doEdit: function (row) {
        },

        _btnOkClick: function () {

        },

        _btnCancelClick: function () {

        },

        // Удаление записи
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

        _getCreateUrl: function () { return null; },

        _getEditUrl: function (row) { return null; },

        _getDeleteUrl: function (row) { return null; }

    });

})(jQuery);