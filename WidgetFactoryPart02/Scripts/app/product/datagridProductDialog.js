// ----------------------------------------------------------
// Скрипт: Виджет DataGrid для Товара
// ----------------------------------------------------------

(function ($) {

    $.widget('custom.datagridProductDialog', $.custom.datagridCrudBase, {

        _createGrid: function () {

            this._super();

            this._grid.datagrid({
                url: '/Product/List/',
                columns: [[
                    { field: 'code', title: 'Код' },
                    { field: 'name', title: 'Название' },
                    { field: 'typeName', title: 'Тип' },
                    { field: 'categoryName', title: 'Категория' },
                    {
                        field: 'withDiscount', title: 'Со скидкой', align: 'center',
                        formatter: function (value, row, index) {
                            return '<input type="checkbox" disabled' + (value === true ? ' checked' : '') + '>';
                        }
                    }
                ]],
            });
        },

        _dialogWidgetName: function () { return "dialogProduct" },

        _getCreateUrl: function () { return '/Product/Create/'; },

        _getEditUrl: function (row) { return '/Product/Edit/' + row.id; },

        _getDeleteUrl: function (row) { return '/Product/Delete/' + row.id; }

    });

})(jQuery);
