// ----------------------------------------------------------
// Скрипт: Виджет DataGrid для Категории продукции
// ----------------------------------------------------------

(function ($) {

    $.widget('custom.datagridCategoryDialog', $.custom.datagridCrudDialogBase, {

        _createGrid: function () {

            this._super();

            this._grid.datagrid({
                url: '/Category/List/',
                columns: [[
                    {
                        field: 'code', title: 'Код', width: 50,
                    },
                    {
                        field: 'name', title: 'Название', width: 430
                    },
                ]]
            });
        },

        _dialogWidgetName: function () { return 'dialogCategory'; },

        _getCreateUrl: function () { return '/Category/Create/'; },

        _getEditUrl: function (row) { return '/Category/Edit/' + row.id; },

        _getDeleteUrl: function (row) { return '/Category/Delete/' + row.id; }

    });

})(jQuery);