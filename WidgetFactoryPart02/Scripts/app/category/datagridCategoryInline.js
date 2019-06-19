// ----------------------------------------------------------
// Скрипт: Виджет DataGrid для Категории продукции
// ----------------------------------------------------------

(function ($) {

    $.widget('custom.datagridCategoryInline', $.custom.datagridCrudInlineBase, {

        _createGrid: function () {

            this._super();

            this._grid.datagrid({
                url: '/Category/List/',
                columns: [[                    
                    {
                        field: 'code', title: 'Код', width: 50,
                        editor: {
                            type: 'textbox',
                            options: {
                                required: true
                            }
                        },
                    },
                    {
                        field: 'name', title: 'Название', width: 430,
                        editor: {
                            type: 'textbox',
                            options: {
                                required: true
                            }
                        },
                    }
                ]]
            });
        },

        _getCreateUrl: function () { return '/Category/Create/'; },

        _getEditUrl: function (row) { return '/Category/Edit/' + row.id; },

        _getDeleteUrl: function (row) { return '/Category/Delete/' + row.id; }

    });

})(jQuery);