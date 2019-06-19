// ----------------------------------------------------------
// Скрипт:
// ----------------------------------------------------------

(function ($) {

    $.widget('custom.datagridProductInline', $.custom.datagridCrudInlineBase, {

        _createGrid: function () {

            this._super();

            var that = this;

            this._grid.datagrid({
                url: '/Product/List/',
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
                    },
                    {
                        field: 'categoryId', title: 'Категория', width: 430,
                        formatter: function (value, row, index) {
                            return row.categoryName;
                        },
                        editor: {
                            type: 'combogrid',
                            options: {
                                required: true,
                                url: '/DropDown/Category/',
                                idField: 'id',
                                textField: 'name',
                                title: 'Категории',
                                columns: [[
                                    { field: 'code', title: 'Код' },
                                    { field: 'name', title: 'Название' },
                                ]]
                            }
                        },
                    },

                ]],
                onBeginEdit: function (index, row) {

                    var editor = that._grid.datagrid('getEditor', {
                        index: index,
                        field: 'categoryId'
                    });

                    $(editor.target).combogrid('setValue', {
                        id: row.categoryId,
                        name: row.categoryName
                    });
                }
            });
        },

        _getCreateUrl: function () { return '/Product/Create/'; },

        _getEditUrl: function (row) { return '/Product/Edit/' + row.id; },

        _getDeleteUrl: function (row) { return '/Product/Delete/' + row.id; }

    });

})(jQuery);