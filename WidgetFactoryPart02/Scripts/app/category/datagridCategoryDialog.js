// ----------------------------------------------------------
// Скрипт: Виджет DataGrid для Категории
// ----------------------------------------------------------

(function ($) {

    $.widget('custom.datagridCategoryDialog', $.custom.datagridCrudBase, {

        _createGrid: function () {

            this._super();

            this._grid.datagrid({
                url: '/Category/List/',
                columns: [[
                    {
                        field: 'code', title: 'Code',
                    },
                    {
                        field: 'name', title: 'Name',
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
