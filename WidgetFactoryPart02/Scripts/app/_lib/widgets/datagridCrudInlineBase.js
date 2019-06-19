// ----------------------------------------------------------
// Скрипт: Виджет базовой редактируемый DataGrid
// ----------------------------------------------------------

(function ($) {

    $.widget('custom.datagridCrudInlineBase', $.custom.datagridCrudBase, {


        // Инициализация грида (override)
        _createGrid: function () {

            this._super();

            var that = this;

            var onSelect = this._grid.datagrid('options').onSelect;
            var onLoadSuccess = this._grid.datagrid('options').onLoadSuccess;

            this._grid.datagrid({
                onLoadSuccess: function (data) {

                    that._setMode('view');

                    onLoadSuccess(data);

                },
                onBeforeSelect: function () {
                    return that._mode == 'view';
                },
            });

        },

        // Инициализация панели инструментов (override)
        _createToolbar: function () {

            that = this;

            this._super();

            // Кнопка "Подтвердить"
            this.btnOk = $('.btnOk', this.element);
            this.btnOk.linkbutton({
                text: 'OK',
                plain: true,
                onClick: function () {
                    that._btnOkClick();
                }
            });

            // Кнопка "Отменить"
            this.btnCancel = $('.btnCancel', this.element);
            this.btnCancel.linkbutton({
                text: 'Отменить',
                plain: true,
                onClick: function () {
                    that._btnCancelClick();
                }
            });
        },

        // Изменение режима
        _setMode: function (val) {

            this._mode = val;

            this._processToolbar();
        },

        // Обработка панели инструментов
        _processToolbar: function () {            
            this.btnRefresh.linkbutton('disable');
            this.btnCreate.linkbutton('disable');
            this.btnEdit.linkbutton('disable');
            this.btnDelete.linkbutton('disable');
            this.btnOk.linkbutton('disable');
            this.btnCancel.linkbutton('disable');

            if (this._mode == 'view') {
                this.btnRefresh.linkbutton('enable');
                this.btnCreate.linkbutton('enable');
                this.btnEdit.linkbutton('enable');
                this.btnDelete.linkbutton('enable');
            }
            else if (this._mode == 'create' || this._mode == 'edit') {
                this.btnOk.linkbutton('enable');
                this.btnCancel.linkbutton('enable');
            }
        },

        // Создание записи
        _doCreate: function () {            

            var that = this;

            var url = this._getCreateUrl();

            if (url == null) return;

            that._grid.datagrid('clearSelections');

            that._grid.datagrid('loading');

            $.ajax({
                url: url,
                type: 'get'
            }).done(function (data) {

                var result = JSON.parse(data);

                that._grid.datagrid('loaded');

                that._editIndex = 0;

                that._grid.datagrid('insertRow', {
                    index: that._editIndex,
                    row: result.model
                });

                that._grid.datagrid('beginEdit', that._editIndex);

                that._setMode('create');

            }).error(function (jqXHR, textStatus, errorThrown) {
                $.messager.alert({
                    title: 'Ошибка',
                    icon: 'error',
                    msg: 'Ошибка при создании записи. Статус: ' + jqXHR.status + ' (' + textStatus + ')',
                });
                that._grid.datagrid('loaded');
            });
        },

        // Изменение записи
        _doEdit: function (row) {

            var that = this;

            var url = this._getEditUrl(row);

            if (url == null) return;

            that._grid.datagrid('loading');

            $.ajax({
                url: url,
                type: 'get'
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

                that._grid.datagrid('loaded');

                that._editIndex = that._grid.datagrid('getRowIndex', row);

                $.extend(row, result.model);

                that._grid.datagrid('updateRow', {
                    index: that._editIndex,
                    row: row
                });

                that._grid.datagrid('beginEdit', that._editIndex);

                that._setMode('edit');

            }).error(function (jqXHR, textStatus, errorThrown) {
                $.messager.alert({
                    title: 'Ошибка',
                    icon: 'error',
                    msg: 'Ошибка при создании записи. Статус: ' + jqXHR.status + ' (' + textStatus + ')',
                });
                that._grid.datagrid('loaded');
            });
        },

        // Кнопка "OK"
        _btnOkClick: function () {

            var that = this;

            if (!that._grid.datagrid('validateRow', that._editIndex)) return;

            switch (that._mode) {
                case 'create':
                    that._createPost();
                    break;
                case 'edit':
                    that._editPost();
                    break;
                default:
                    break;
            }
        },

        // Кнопка "Отмена"
        _btnCancelClick: function () {

            this._grid.datagrid('rejectChanges');

            if (this._mode == 'create') {

                this._grid.datagrid('deleteRow', this._editIndex);
            }
        },

        // Отправка модели для создания
        _createPost: function () {
            
            var that = this;

            var url = that._getCreateUrl();

            if (url == null) return;

            var formData = that._getFormData();

            that._grid.datagrid('loading');

            $.ajax({
                url: url,
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
            }).done(function (data) {

                var result = JSON.parse(data);

                // Если ошибка
                if (!result.success) {

                    $.messager.alert({
                        title: 'Ошибка',
                        msg: result.erMessage,
                        icon: 'error'
                    });

                    that._grid.datagrid('loaded');

                    return;
                }

                that._lastSelected = result.id;
                
                that._grid.datagrid('reload');

            }).error(function (jqXHR, textStatus, errorThrown) {
                $.messager.alert({
                    title: 'Ошибка',
                    icon: 'error',
                    msg: 'Ошибка при создании записи. Статус: ' + jqXHR.status + ' (' + textStatus + ')',
                });
                that._grid.datagrid('loaded');
            });

        },

        // Отправка модели для изменения
        _editPost: function () {

            var that = this;

            var row = that._grid.datagrid('getData').rows[that._editIndex];

            var url = that._getEditUrl(row);

            if (url == null) return;

            var formData = that._getFormData();

            that._grid.datagrid('loading');

            $.ajax({
                url: url,
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
            }).done(function (data) {

                var result = JSON.parse(data);

                // Если ошибка
                if (!result.success) {

                    $.messager.alert({
                        title: 'Ошибка',
                        msg: result.erMessage,
                        icon: 'error'
                    });

                    that._grid.datagrid('loaded');

                    return;
                }

                that._grid.datagrid('reload');

            }).error(function (jqXHR, textStatus, errorThrown) {
                $.messager.alert({
                    title: 'Ошибка',
                    icon: 'error',
                    msg: 'Ошибка при создании записи. Статус: ' + jqXHR.status + ' (' + textStatus + ')',
                });
                that._grid.datagrid('loaded');
            });

        },

        // Получение данных формы
        _getFormData: function () {

            var that = this;

            var fields = that._grid.datagrid('getColumnFields');

            var formData = new FormData();

            $.each(fields, function (i, field) {

                var options = that._grid.datagrid('getColumnOption', field);

                var editor = that._grid.datagrid('getEditor', {
                    index: that._editIndex,
                    field: field
                });

                if (editor == null) return;

                var value = $(editor.target)[options.editor.type]('getValue');

                formData.append(field, value);

            });

            return formData;
        },

    });

})(jQuery);